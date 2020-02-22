import React from 'react';
import './ABSTimeDot.less';
import moment from 'moment';

export interface IABSTimeDotProps {
  content: any;
}
 
export interface IABSTimeDotState {
  
}
 
class ABSTimeDot extends React.Component<IABSTimeDotProps, IABSTimeDotState> {
  render() {
    const { content } = this.props;
    return (
      <div className="abs-time-dot">
        <div className="abs-dot-date" >
          <div className="abs-dot-date-title">{moment(content).format('MM-DD')}</div>
          <div className="abs-dot-date-subtitle">{moment(content).format('YYYY')}</div>
        </div>
        <div className="abs-time-inner-dot" />
      </div>
    );
  }
}
 
export default ABSTimeDot;