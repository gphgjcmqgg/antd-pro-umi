import React from 'react';
import { ABSInput } from '../../ABSInput';
import Copy from 'copy-to-clipboard';
import ABSMessage from '../../ABSMessage';
import RouteConfig from '../../../abs/config/routeConfig';
import InvitationCard from './InvitationCard';
import { defaultLinkContent, LinkInvitationHeaderImg, CopySuccessMessage } from './util';
import authService from '../../../abs/services/auth/authService';

export interface ILinkInvitationProps {
  className?: string;
}
 
export interface ILinkInvitationState {
  content: string;
}

const user = authService.getCurrentUser();
const url = `${window.location.origin}${RouteConfig.home}`;
const defaultUrl = `${url}?invitationId=${user ? user.id : ''}`;
 
class LinkInvitation extends React.Component<ILinkInvitationProps, ILinkInvitationState> {
  constructor(props: any) {
    super(props);
    this.state = {
      content: defaultLinkContent + defaultUrl
    };
  }
  renderInputContent() {
    const { content } = this.state;
    return (
      <ABSInput className="abs-invitation-content-input" onChange={(text) => this.setState({ content: text })}
        style={{ height: 180 }} autosize={true} value={content} />
    );
  }
  
  onCopy = (content: string) => {
    if (!content) {
      return;
    }
    Copy(content);
    ABSMessage.success(CopySuccessMessage);
  }

  render() {
    const { content } = this.state;
    const footBtn = {
      title: '复制链接',
      icon: 'binding',
      onClick: () => this.onCopy(content),
    };
    return ( 
      <InvitationCard 
        headerImg={LinkInvitationHeaderImg} 
        headerTitle="链接邀请"
        title="复制以下文字发送给好友，邀请他们来CNABS" 
        content={this.renderInputContent()}
        footBtn={footBtn}
      />
     );
  }
}
 
export default LinkInvitation;