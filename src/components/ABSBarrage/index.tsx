import React from 'react';
import './index.less';
import ABSAvatar from '../ABSAvatar';
import RouterConfig from '../../abs/config/routeConfig';
import ABSLink from '../ABSLink';

export interface IBarrage {
  name: string;
  avatar: string;
  apply_time: string;
  user_id: string;
}

export interface IABSBarrageProps {
  barrage: IBarrage;
}
 
export interface IABSBarrageState {
  
}
 
class ABSBarrage extends React.Component<IABSBarrageProps, IABSBarrageState> {

  render() { 
    const { barrage } = this.props;
    return (
      <ABSLink to={`${RouterConfig.expertPreview}?id=${barrage.user_id}`} target="_blank" className="abs-barrage">
        <ABSAvatar imageUrl={barrage.avatar} alt={barrage.name} size="small" className="abs-barrage-avatar" />
        <span className="abs-barrage-name">{barrage.name}</span>
        <span className="abs-barrage-description">{barrage.apply_time}报名了该会议</span>
      </ABSLink>
    );
  }
}
 
export default ABSBarrage;