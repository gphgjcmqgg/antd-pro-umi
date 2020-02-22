import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export interface IABSHrefProps {
  to: string;
  children: any;
  className?: string;
  target?: '_blank' | '_self';
  title?: string;
  // 是否阻止事件冒泡
  stopPropagation?: boolean;
  onClick?: () => void;
}

export default class ABSLink extends React.Component<IABSHrefProps> {

  onClick = (e) => {
    // e.preventDefault();
    // 阻止冒泡
    const { stopPropagation, onClick } = this.props;
    if (stopPropagation) {
      e.stopPropagation();
    }
    // 传了回调函数则阻止默认行为（跳转）并执行回调函数
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  }

  render() {
    const { children, className, target, title, onClick } = this.props;
    let { to } = this.props;
    const classes = classNames('abs-href', className);
    let newTarget;
    const clickProps = onClick ? { onClick : this.onClick } : {};
    if (to == null) {
      to = '#';
      if (typeof children === 'string') {
        console.error(`${children}的ABSLink to属性不能传空`);
      }
    }

    if (target) {
      newTarget = target;
    } else if (to.indexOf('http') > -1) {
      newTarget = '_blank';
    } else {
      newTarget = '_self';
    }

    return (
      to.indexOf('html') < 0 && to.indexOf('http') < 0 ?
        <Link to={to} className={classes} title={title} {...clickProps}>{children}</Link>
        :
        <a className={classes} href={to} target={newTarget} title={title} {...clickProps}>{children}</a>
    );
  }
}
