import React from 'react';
import { connect } from 'dva';
import InvitationCard from './InvitationCard';
import ABSIconTooltip from '../../ABSIconTooltip';
import ABSUpload from '../../ABSUpload';
import ABSComment from '../../ABSComment';
import ABSLabelValueList from '../../ABSLabelValueList';
import { InstructionsList, AddressBookInvitationHeaderImg } from './util';
import ABSMessage from '../../ABSMessage';

export interface IAddressBookInvitationProps {
  dispatch?: any;
}
 
export interface IAddressBookInvitationState {
}

class AddressBookInvitation extends React.Component<IAddressBookInvitationProps, IAddressBookInvitationState> {
  upload;

  renderInstructions() {
    const details = (
      <div className="abs-invitation-header-title-instructions">
        <ABSLabelValueList list={InstructionsList} />
        <ABSComment>将导出的文件内容按照上述文件格式进行修改，即可导入通讯录</ABSComment>
      </div>
    ); 
    return (<ABSIconTooltip type="info" details={details} overlayClassName="abs-invitation-header-title-info"  />);
  }
  renderInputContent() {
    return (
      <div className="abs-invitation-content-input">
        <ABSUpload 
          desc="文件格式.csv或.vcf" 
          isSingle={true}
          limitType={['csv', 'vcf']}
          ref={view => this.upload = view}
        />
      </div>
    );
  }
  
  onInvitationClick = () => {
    const uploadfile = this.upload ? this.upload.onGetResult() : [];
    const formData = new FormData();
    uploadfile.forEach((file) => {
      formData.append('file', file);
    });
    if (uploadfile.length) {
      this.props.dispatch({
        type: 'global/addressBookInvitation',
        payload: formData
      }).then((res) => {
        if (res) {
          if (res.wrong_emails.length) {
            let errorDetail = (res.wrong_emails).join(', ');
            ABSMessage.error('上传的通讯录中，以下邮箱地址有误：' + errorDetail);
          } else {
            ABSMessage.success('邀请发送成功，好友注册成功即可获得积分');
          }
        }
      });
    } else {
      ABSMessage.warning('请添加附件');
    }
  }

  render() { 
    const footBtn = {
      title: '发送邀请',
      icon: 'send',
      onClick: () => this.onInvitationClick(),
    };
    const title = (<>上传通讯录批量邀请好友，如何导出通讯录{this.renderInstructions()}</>);
    return (
      <InvitationCard
        headerImg={AddressBookInvitationHeaderImg}
        headerTitle="通讯录邀请"
        title={title}
        content={this.renderInputContent()}
        footBtn={footBtn}
      />
    );
  }
}

function mapStateToProps(state: any) {
  return { ...state.global };
}

export default connect(mapStateToProps)(AddressBookInvitation);