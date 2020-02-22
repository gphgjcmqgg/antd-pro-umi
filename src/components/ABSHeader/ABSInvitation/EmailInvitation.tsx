import React from 'react';
import { connect } from 'dva';
import InvitationCard from './InvitationCard';
import { ABSInput } from '../../ABSInput';
import { EmailInvitationHeaderImg, EmailInvitationPlaceholder, setEmailList } from './util';
import ABSMessage from '../../ABSMessage';
// import { isString } from 'util';

export interface IEmailInvitationProps {
  dispatch?: any;
}
 
export interface IEmailInvitationState {
  content: string;
}

class EmailInvitation extends React.Component<IEmailInvitationProps, IEmailInvitationState> {
  constructor(props: any) {
    super(props);
    this.state = {
      content: ''
    };
  }
  renderInputContent() {
    const { content } = this.state;
    return (
      <ABSInput 
        className="abs-invitation-content-input" 
        onChange={(text) => this.setState({ content: text })}
        style={{ height: 180 }} 
        autosize={true} 
        value={content} 
        placeholder={EmailInvitationPlaceholder}
      />
    );
  }

  onInvitationClick = () => {
    const { content } = this.state;
    if (content) {
      const emailList = setEmailList(content);
      // if (!isString(emailList)) {
      this.props.dispatch({
        type: 'global/emailInvitation',
        payload: {
          emails: emailList
        },
      }).then((res) => {
        if (res) {
          if (res.success_count) {
            ABSMessage.success('邀请发送成功，好友注册成功即可获得积分');
          }
          let errorDetail = (res.wrong_emails).join(',');
          this.setState({ content: errorDetail });
          if (res.wrong_emails.length) {
            ABSMessage.error('部分邮箱发送失败，请检查邮箱地址是否正确');
          }
        }
      });
      // } else {
      //   ABSMessage.error('邮箱有误：' + emailList);
      // }
      
    } else {
      ABSMessage.warning('请输入邮箱地址');
    }
  }

  render() { 
    const footBtn = {
      title: '发送邀请',
      icon: 'send',
      onClick: () => this.onInvitationClick(),
    };
    return (
      <InvitationCard
        headerImg={EmailInvitationHeaderImg}
        headerTitle="邮件邀请"
        title="直接邀请邮箱联系人加入CNABS"
        content={this.renderInputContent()}
        footBtn={footBtn}
      />
     );
  }
}

function mapStateToProps(state: any) {
  return { ...state.global };
}

export default connect(mapStateToProps)(EmailInvitation);