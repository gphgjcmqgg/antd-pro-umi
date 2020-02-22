import React from 'react';
import classNames from 'classnames';
import './index.less';
// import ABSAvatar from '../ABSAvatar';
import ABSIconText from '../ABSIconText';

export interface IABSAddCardProps {
  onClick?: () => void;
  className?: string;
  icon: string;
  text: string;
}
 
export interface IABSAddCardState {
  
}

// const defaultAvatar = require('../../assets/images/default-avatar.png');
 
class ABSAddCard extends React.Component<IABSAddCardProps, IABSAddCardState> {
  render() { 
    const { onClick, className, icon, text } = this.props;
    const classs = classNames('abs-add-card', className);
    return ( 
      <div className={classs} onClick={onClick}>
        {/* <ABSAvatar imageUrl={defaultAvatar} /> */}
        <ABSIconText icon={icon} text={text} />
      </div>
     );
  }
}
 
export default ABSAddCard;