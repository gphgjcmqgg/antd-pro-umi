import React from 'react';
import './index.less';
import { ABSTab } from '../ABSTab';

export interface IABSTabFlexContainerProps {
  panesList: any;
  activeKey?: string;
  defaultActiveKey?: string;
  type?: 'full' | 'product' | 'card';
  onChange?: (activeKey: string) => void;
  className?: string;
  tabClassName?: string;
  animated?: boolean;
}

export default class ABSTabFlexContainer extends React.Component<IABSTabFlexContainerProps> {
  render() {
    const { className, panesList, activeKey, defaultActiveKey, type, onChange, animated, tabClassName, children } = this.props;
    const classs = `abs-tab-flex-container ${className || ''}`;
    const tabClasss = `abs-tab-flex-container-tab ${tabClassName || ''}`;
    return (
      <div className={classs}>
        <div className="abs-tab-flex-container-content">{children}</div>
        <ABSTab
          activeKey={activeKey}
          defaultActiveKey={defaultActiveKey}
          panesList={panesList}
          onChange={onChange}
          type={type}
          animated={animated}
          className={tabClasss}
        />
      </div>
    );
  }
}
