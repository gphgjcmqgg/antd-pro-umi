import React from 'react';
import { connect } from 'dva';
import './index.less';
import User from './User';
import { ABSModal } from '../../ABSModal';

export interface IABSImproveUserProps {
  isShowCompleteProfile: boolean;
}

export interface IABSImproveUserState {
}

class ABSImproveUser extends React.Component<IABSImproveUserProps, IABSImproveUserState> {

  private userModal;

  componentWillReceiveProps(nextProps: IABSImproveUserProps) {
    const { isShowCompleteProfile } = nextProps;
    // 显示完善用户信息的Modal
    if (isShowCompleteProfile && this.userModal) {
      this.userModal.setState({ visible: true });
    }
  }

  render() {
    return (
      <ABSModal
        keyboard={false}
        wrapClassName="abs-user-info-tooltip-modal"
        content={<User />}
        width={460}
        footer={null}
        maskClosable={false}
        closable={false}
        ref={view => this.userModal = view}
      />
    );
  }
}

function mapStateToProps({ global }: any) {
  const { isShowCompleteProfile } = global;
  return { isShowCompleteProfile };
}

export default connect(mapStateToProps)(ABSImproveUser);