import React from 'react';
import { Timeline } from 'antd';
import ABSTimeDot from './ABSTimeDot';
import ABSTimeLineBox from './ABSTimeLineBox';
import './index.less';
import { ITimelineItem } from './unit';

export interface IABSTimeLineProps {
  timelineItems: Array<ITimelineItem>;
}
 
class ABSTimeLine extends React.Component<IABSTimeLineProps> {
  renderTimelineItem(timelineItem: ITimelineItem, index: number) {
    const { title, date, content, level } = timelineItem;

    return (
      <Timeline.Item
        className="timeline"
        key={index}
        dot={<ABSTimeDot content={date} />}
      >
        <ABSTimeLineBox 
          content={content} 
          title={title} 
          level={level}
        />
      </Timeline.Item>
    );
  }

  renderList() {
    const { timelineItems } = this.props;
    if (timelineItems && timelineItems.length > 0) {
      return timelineItems.map((timelineItem, index) => {
        return this.renderTimelineItem(timelineItem, index);
      });
    }

    return null;
  }

  render() {
    return (
      <div className="abs-timeline">
        <Timeline >
          {this.renderList()}
        </Timeline>
      </div>
    );
  }
}
 
export default ABSTimeLine;