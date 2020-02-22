import React from 'react';
import { IFootBtn } from './util';
import { ABSButton } from '../ABSButton';
import './index.less';

export interface IABSFormCardProps {
  title?: string | React.ReactNode;
  content?: React.ReactNode;
  footBtn: IFootBtn;
}
 
export interface IABSFormCardState {
  
}
 
class ABSFormCard extends React.Component<IABSFormCardProps, IABSFormCardState> {
  render() { 
    const { title, content, footBtn } = this.props;
    return ( 
      <div className="abs-form-card">
        <div className="abs-form-card-title">{title}</div>
        <div className="abs-form-card-content">{content}</div>
        <ABSButton 
          absIcon={footBtn.icon} 
          onClick={footBtn.onClick} 
          type={footBtn.type}
          block={true}
        >
          {footBtn.title}
        </ABSButton>
      </div>
     );
  }
}
 
export default ABSFormCard;