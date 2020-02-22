import React from 'react';
import { Col } from 'antd';
import ABSLabelValueList from '../ABSLabelValueList';
import './index.less';

interface IABSDataStatisticItem {
  title: string;
  content: React.ReactNode;
}

export interface IABSDataStatisticProps {
  list: IABSDataStatisticItem[];
}
 
export interface IABSDataStatisticState {
  
}
 
class ABSDataStatistic extends React.Component<IABSDataStatisticProps, IABSDataStatisticState> {
  renderContent() {
    const { list } = this.props;
    if (Array.isArray(list) && list.length > 0) {
      return list.map((item) => {
        return (
          <Col span={8} key={item.title}>
            <ABSLabelValueList list={[item]} />
          </Col>
        );
      });
    }
    return null;
  }

  render() { 
    return (
      <div className="abs-data-statistic">
        {this.renderContent()}      
      </div>
    );
  }
}
 
export default ABSDataStatistic;