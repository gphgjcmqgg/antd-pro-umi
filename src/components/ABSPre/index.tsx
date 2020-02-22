import React from 'react';
import classNames from 'classnames';
import './index.less';

export interface IABSPreProps {
  className?: string;
  children: React.ReactNode | string;
  style?: React.CSSProperties;
}

class ABSPre extends React.Component<IABSPreProps> {
  render() {
    const { className, children, style } = this.props;
    const classes = classNames('abs-pre', className);
    return (
      <pre className={classes} style={style}>{children}</pre>
    );
  }
}

export default ABSPre;