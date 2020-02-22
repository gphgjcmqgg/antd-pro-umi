import React from 'react';
import { Progress } from 'antd';
import './index.less';
import classNames from 'classnames';

export interface IABSProgressBarLineProps {
  percent?: number;
  status?: 'success' | 'exception' | 'active';
  type?: 'line' | 'circle' | 'dashboard';
  className?: string;
  size?: 'default' | 'small';
  width?: number | string;
  displayType?: 'line-feed' | 'line' | 'line-single';
  text?: string;
}

class ABSProgressBarLine extends React.Component<IABSProgressBarLineProps> {
  static defaultProps = {
    percent: 0,
    displayType: 'line',
    text: '完善度',
  };

  renserText() {
    const { displayType, percent, text } = this.props;
    if (displayType === 'line-feed') {
      return (
        <div className="abs-progress-bar-line-text">
          <div>
            <span className="abs-progress-bar-line-text-percent">{percent}</span>
            <span>%</span>
          </div>
          <div className="abs-progress-bar-line-text-info">{text}</div>
        </div>
      );
    } else if (displayType === 'line-single') {
      return '';
    } else {
      return (
        <div className="abs-progress-bar-line-text">
          <span className="abs-progress-bar-line-text-info">{text}</span>
          <span className="abs-progress-bar-line-text-percent">{percent}</span>
          <span>%</span>
        </div>
      );
    }
  }

  render() {
    const { percent, status, type, className, size, width, displayType } = this.props;
    const classes = classNames('abs-progress-bar-line', `abs-progress-bar-${displayType}`, className);
    return (
      <div className={classes}>
        <Progress
          percent={percent}
          status={status}
          type={type}
          size={size}
          // width={width}
          showInfo={false}
          style={{ width: width}}
        />
        {this.renserText()}
      </div>
      
    );
  }
}

export default ABSProgressBarLine;