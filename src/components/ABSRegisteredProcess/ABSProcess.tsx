import React from 'react';
import './process.less';
import ABSLi from './ABSLi';
import ABSIconTooltip from '../../components/ABSIconTooltip';

export interface IABSProcessProps {
  title: string;
  description: string;
  className?: string;
  icon?: string;
}

export interface IABSProcessState {

}

class ABSProcess extends React.Component<IABSProcessProps, IABSProcessState> {
  render() {
    const { title, description, className, icon } = this.props;
    const details = this.renderInfoIcon();
    return (
      <div className={`abs-process ${className}`}>
        {icon ?
          <ABSIconTooltip
            text={title}
            details={details}
          /> : <span className="abs-process-title">{title}</span>
        }
        <br />
        <span className="abs-process-description">{description}</span>
      </div>
    );
  }

  renderInfoIcon() {
    const tooltipTitle = (
      <div className="abs-overseas-tooltip">
        <div className="abs-overseas-tooltip-title">
          名片必须包含以下信息：
        </div>
        <div className="abs-overseas-tooltip-content">
          <div className="abs-overseas-tooltip-content-item">
            <ABSLi text={'姓名'} />
            <ABSLi text={'单位'} />
          </div>
          <div className="abs-overseas-tooltip-content-item">
            <ABSLi text={'邮箱'} />
            <ABSLi text={'电话'} />
          </div>
        </div>
      </div>
    );
    return tooltipTitle;
  }
}

export default ABSProcess;