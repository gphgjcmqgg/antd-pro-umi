import React from 'react';
import './index.less';
import classNames from 'classnames';
import ABSDot from '../ABSDot';
import ABSProgressItemLine from '../ABSProgressItemLine';
import IProgressNode from '../entities/IProgressNode';
import ITimeService from '../services/ITimeService';

export interface IABSProgressItemProps {
  prev: IProgressNode | null;
  current: IProgressNode;
  next: IProgressNode | null;
  timeService: ITimeService;
}

export interface IABSProgressItemState {

}

class ABSProgressItem extends React.Component<IABSProgressItemProps, IABSProgressItemState> {
  progressItemBubbleLine;
  /**
   * time service
   */
  private timeService: ITimeService;

  constructor(props: IABSProgressItemProps) {
    super(props);
    const { timeService } = props;
    this.timeService = timeService;
  }

  render() {
    const { current } = this.props;
    if (!current) { return null; }
    const { date } = current;
    const currentTime = current && current.time ? current.time : 0;
    const active = currentTime > Date.now();
    const content = this.renderContent();
    const triangleStyle = classNames('progress-item-middle-triangle-left', active ? 'progress-item-middle-triangle-left-active' : 'progress-item-middle-triangle-left-inactive');
    const progressItemRightStyle = classNames('progress-item-right-bubble', active ? 'progress-item-right-bubble-active' : 'progress-item-right-bubble-inactive');
    const progressItemDateStyle = classNames('progress-item-right-bubble-date', active ? 'progress-item-right-bubble-date-active' : 'progress-item-right-bubble-date-inactive');
    return (
      <div className="progress-item">
        {this.renderLine(active)}
        <div className="progress-item-middle">
          <div className={triangleStyle} />
        </div>
        <div className={progressItemRightStyle}>
          <div className={this.progressItemBubbleLine} />
          <div className="progress-item-right-bubble-content">
            <p className={progressItemDateStyle}>{date}</p>
            {content}
          </div>
        </div>
      </div>
    );
  }

  renderContent() {
    const { current } = this.props;
    const { tagNames } = current;
    if (!Array.isArray(tagNames) || tagNames.length < 0) { return null; }
    let TagTipState = false;
    return tagNames.map((name, index) => {
      if (!TagTipState) {
        this.progressItemBubbleLine = classNames('progress-item-right-bubble-line', name.TagTip ?
          (name.TagTip === 1 ? 'progress-item-right-bubble-line-green' : 'progress-item-right-bubble-line-red') 
          : 
          '');
        TagTipState = name.TagTip === 1 ? true : false;
      }
      
      return (
        <p key={index} className="progress-item-right-bubble-title">{name.TagName}</p>
      );
    });
  }

  renderLine(active: boolean) {
    return (
      <div className="progress-item-left">
        {this.renderTopLine()}
        <ABSDot active={active} />
        {this.renderBottomLine()}
      </div>
    );
  }

  renderTopLine() {
    const { prev, current } = this.props;
    let hide = !prev;
    const currentTime = current.time;
    const prevTime = prev ? prev.time : 0;
    const inactiveRatio = this.timeService.getTopInactiveRatio(currentTime, prevTime);
    return <ABSProgressItemLine hide={hide} inactiveRatio={inactiveRatio} />;
  }

  renderBottomLine() {
    const { next, current } = this.props;
    let hide = !next;
    const currentTime = current.time;
    const nextTime = next ? next.time : 0;
    const inactiveRatio = this.timeService.getBottomInactiveRatio(currentTime, nextTime);
    return <ABSProgressItemLine hide={hide} inactiveRatio={inactiveRatio} />;
  }
}

export default ABSProgressItem;