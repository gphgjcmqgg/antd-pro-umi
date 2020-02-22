import React from 'react';
import classNames from 'classnames';
import './index.less';

export interface IABSProgressItemLineProps {
  inactiveRatio: number;
  hide?: boolean;
}
 
export interface IABSProgressItemLineState {
  
}
 
class ABSProgressItemLine extends React.Component<IABSProgressItemLineProps, IABSProgressItemLineState> {
  render() { 
    const { inactiveRatio, hide } = this.props;
    const backgroundStyle = classNames('abs-progress-item-line', { 'abs-progress-item-line-transparent': hide });
    const lineStyle = classNames('abs-progress-item-line-inactive', { 'abs-progress-item-line-transparent': hide });
    return (
      <div className={backgroundStyle}>
        <div className={lineStyle} style={{ flexGrow: inactiveRatio, msFlexPositive: inactiveRatio }} />
      </div>
    );
  }
}
 
export default ABSProgressItemLine;