import React from 'react';
import './InvitationCard.less';
import ABSImage from '../../ABSImage';
import ABSFormCard from '../../ABSFormCard';
import { IFootBtn } from '../../ABSFormCard/util';

export interface IInvitationCardProps {
  children?: React.ReactNode;
  headerImg: string;
  headerTitle: string;
  title?: string | React.ReactNode;
  content?: React.ReactNode;
  footBtn: IFootBtn;
}
 
export interface IInvitationCardState {
  
}
 
class InvitationCard extends React.Component<IInvitationCardProps, IInvitationCardState> {
  render() { 
    const { title, headerImg, headerTitle, content, footBtn } = this.props;
    return ( 
      <div className="abs-invitation-card">
        <div className="abs-invitation-card-header">
          <ABSImage logo={headerImg} width={48} height={48} />
          <div className="abs-invitation-card-header-title">{headerTitle}</div>
        </div>
        <ABSFormCard
          title={title}
          content={content}
          footBtn={footBtn}
        />
      </div>
     );
  }
}
 
export default InvitationCard;