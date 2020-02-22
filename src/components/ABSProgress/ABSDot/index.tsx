import React from 'react';
import './index.less';
import classNames from 'classnames';

export interface IABSDotProps {
  active: boolean;
}
 
export interface IABSDotState {
  
}
 
class ABSDot extends React.Component<IABSDotProps, IABSDotState> {
  render() { 
    const { active } = this.props;
    const dotStyle = classNames('abs-progress-dot', active ? 'abs-progress-dot-active' : 'abs-progress-dot-inactive');
    return <div className={dotStyle} />;
  }
}
 
export default ABSDot;