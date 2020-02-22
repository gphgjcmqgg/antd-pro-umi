import React from 'react';
import classNames from 'classnames';
import './index.less';

export interface ILabelFormItem {
  label: string;
  formItem: React.ReactNode;
  formItemWidth?: number;
  className?: string;
}
export interface IABSLabelListProps {
  content: ILabelFormItem[];
  labelWidth?: number;
}

export interface IABSLabelListState {
}

export default class ABSLabelList extends React.Component<IABSLabelListProps, IABSLabelListState> {
  constructor(props: IABSLabelListProps) {
    super(props);
  }
  renderContent = () => {
    const { content, labelWidth } = this.props;
    if (!Array.isArray(content)) {
      return 'ABSLabelList组件需要输入数组';
    }
    const labelList = content.map((item, index) => {
      const { className } = item; 
      const clazz = classNames('abs-label-form-item', className);
      return (
      <div className={clazz} key={`${item.label}${index}`}>
        <span className="abs-label" style={{width: labelWidth ? labelWidth : 68 }}>{item.label}</span>
        <span className="abs-form-item" style={{width: item.formItemWidth ? item.formItemWidth : '' }}>{item.formItem}</span>
      </div>
      );
    });
    return labelList;
  }
  public render() {
    return (
      <div className="abs-label-list-container">
        {this.renderContent()}
      </div>
    );
  }
}
