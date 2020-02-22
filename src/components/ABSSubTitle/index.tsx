import React, { Component } from 'react';
import './index.less';
import classnames from 'classnames';
import { ABSButton } from '../ABSButton';

interface IABSSubTitleProps {
  className?: string;
  title: string;
  renderRight?: React.ReactNode | null;
  buttonIcon?: string;
  buttonType?: 'primary' | 'default' | 'danger';
  buttonTitle?: string;
  buttonClick?: React.MouseEventHandler<HTMLButtonElement>; // 改为 onClick
  removePadding?: 'top' | 'bottom' | 'both';
}

class ABSSubTitle extends Component<IABSSubTitleProps> {

  renderRight() {
    const { renderRight, buttonIcon, buttonType, buttonTitle, buttonClick } = this.props;
    if (renderRight || renderRight === null) {
      return renderRight;
    }
    return (
      <ABSButton icon={buttonIcon} type={buttonType} onClick={buttonClick}>{buttonTitle}</ABSButton>
    );
  }

  render() {
    const { className, title, removePadding } = this.props;
    const clazs = classnames('abs-sub-title', 
    { 'abs-sub-title-no-top' : removePadding === 'top' || removePadding === 'both'}, 
    { 'abs-sub-title-no-bottom' : removePadding === 'bottom' || removePadding ===  'both'}, 
    className);
    return (
      <div className={clazs}>
        <p className="abs-sub-title-left">{title}</p>
        {this.renderRight()}
      </div>
    );
  }
}

export default ABSSubTitle;