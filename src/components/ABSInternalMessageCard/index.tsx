import React from 'react';
import './index.less';
import ABSAvatar from '../ABSAvatar';
import { ItemData, timeFomat } from './data';

export interface IABSInternalMessageCardProps {
  className?: string; 
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  buttonContent?: any;
  data: ItemData;
  status?: string; 
}

class ABSInternalMessageCard extends React.Component<IABSInternalMessageCardProps> {

  render() {
    const { onMouseEnter, onMouseLeave, onClick, className, buttonContent, data, status } = this.props;
    return (
      <div className={status === 'Read' ? `abs-notice-list abs-message-read ${className}` : `abs-notice-list ${className}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        <div className="abs-notice-avatar-box" >
          {status === 'Read' ? '' : <span className="abs-message-count" />}
          <ABSAvatar size="default" alt="头像" imageUrl={data.user.avatar ? data.user.avatar : ''} className="abs-notice-avatar" />
        </div>
        <div className="abs-notice-detail">
          <div className="abs-notice-content">
            <div className="abs-notice-name select-none">{data.user.name}</div>
            <div className={status === 'Read' ? 'abs-notice-title select-none' : 'abs-notice-title abs-notice-title-unread select-none'}>
              {data.message.title}
            </div>
            <span className="abs-notice-date select-none">{timeFomat(data.message.datetime)}</span>
          </div>
        </div>
        {buttonContent}
      </div>
    );
  }
}

export default ABSInternalMessageCard;