import React from 'react';
import { Timeline } from 'antd';
import { Link } from 'dva/router';
import './index.less';
import ABSDotIcon from './ABSDot';

export interface ITimelineItem {
  title: string;
  href: string;
  active?: boolean;
}

export interface IABSExpertAnchorPointProps {
  timelineItems: Array<ITimelineItem>;
  onClick: (e: any, index: number) => void;
}

export interface IABSExpertAnchorPointState {
  href: string;
}

class ABSExpertAnchorPoint extends React.Component<IABSExpertAnchorPointProps, IABSExpertAnchorPointState > {

  renderActiveTimelineItem(timelineItem: ITimelineItem, index: number) {
    const { onClick } = this.props;
    const { href, title } = timelineItem;

    return (
      <Timeline.Item
        className="timeline"
        key={`${href}${title}`} 
        dot={<ABSDotIcon />}
      >
        <Link className="link-timeline-check" to={href} onClick={(e: any) => onClick(e, index)}>{title}</Link >
      </Timeline.Item>
    );
  }

  renderNormalTimelineItem(timelineItem: ITimelineItem, index: number) {
    const { onClick } = this.props;
    const { href, title } = timelineItem;
    return (
      <Timeline.Item key={`${href}${title}`} className="timeline">
        <Link 
          to={href} 
          className="link-timeline"
          onClick={(e: any) => onClick(e, index)}
        >
          {timelineItem.title}
        </Link >
      </Timeline.Item>
    );
  }

  renderList() {
    const { timelineItems } = this.props;
    // const { href } = this.state;
    if (timelineItems && timelineItems.length > 0) {
      return timelineItems.map((timelineItem, index) => {
        if (timelineItem.active) {
          return this.renderActiveTimelineItem(timelineItem, index);
        }
        return this.renderNormalTimelineItem(timelineItem, index);
      });
    }
    
    return null;
  }

  render() {
    return (
      <div className="abs-expert-anchor-point">
        <Timeline >
          {this.renderList()}
        </Timeline>
      </div>
    );
  }
}

export default ABSExpertAnchorPoint;  