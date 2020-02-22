import React from 'react';
import { Progress } from 'antd';
import './index.less';

export interface IABSProgressBarProps {
  percent: number;
  status?: 'success' | 'exception' | 'active';
  type?: 'line' | 'circle' | 'dashboard';
  className?: string;
  size?: 'default' | 'small';
  width?: number;
}

export interface IABSProgressBarState {

}

class ABSProgressBar extends React.Component<IABSProgressBarProps, IABSProgressBarState> {
  render() {
    const { percent, status, type, className, size, width } = this.props;
    const clazzName = `abs-progress-bar ${className}`;
    return (
      <Progress
        percent={percent}
        status={status}
        strokeColor="#FC9023"
        className={clazzName}
        type={type}
        size={size}
        width={width}
      />
    );
  }
}

export default ABSProgressBar;