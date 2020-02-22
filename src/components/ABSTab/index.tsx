import React from 'react';
import { Tabs } from 'antd';
import './index.less';

const TabPane = Tabs.TabPane;

export interface IABSTabProps {
  panesList: any;
  activeKey?: string;
  defaultActiveKey?: string;
  type?: 'full' | 'product' | 'card';
  onChange?: (activeKey: string) => void;
  className?: string;
  animated?: boolean;
}

export class ABSTab extends React.Component<IABSTabProps> {
  static defaultProps = {
    type: null,
    defaultActiveKey: '1',
    animated: true,
  };

  render() {
    const {
      panesList,
      defaultActiveKey,
      activeKey,
      type,
      onChange,
      className,
      animated,
    } = this.props;
    const classNames = type ? `abs-tab-${type}` : `abs-tab`;
    const extraProps = activeKey ? { activeKey } : {};
    
    return (
      <div className={classNames}>
        <Tabs
          defaultActiveKey={defaultActiveKey}
          onChange={onChange}
          className={className}
          animated={animated}
          {...extraProps}
        >
          {
            panesList.map(pane =>
              <TabPane tab={pane.title} key={pane.key}>
                {pane.content}
              </TabPane>
            )
          }
        </Tabs>
      </div>
    );
  }
}