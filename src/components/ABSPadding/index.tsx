import React from 'react';
import './index.less';

export interface IABSPaddingProps {
  className?: string;
}
 
export interface IABSPaddingState {
  
}
 
/**
 * 适用于仅需要添加`Padding`的情况。
 */
class ABSPadding extends React.Component<IABSPaddingProps, IABSPaddingState> {
  render() {
    const { children, className } = this.props;
    const clazzName = `abs-padding ${className}`;
    return (
      <div className={clazzName}>
        {children}
      </div>
    );
  }
}
 
export default ABSPadding;