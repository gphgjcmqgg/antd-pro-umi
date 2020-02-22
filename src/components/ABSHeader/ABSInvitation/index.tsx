import React from 'react';
import { connect } from 'dva';
import './index.less';
import ABSIconTooltip from '../../ABSIconTooltip';
import { ABSModal } from '../../ABSModal';
import LinkInvitation from './LinkInvitation';
import EmailInvitation from './EmailInvitation';
import AddressBookInvitation from './AddressBookInvitation';
import ABSImage from '../../ABSImage';
import { Row, Col } from 'antd';
import authService from '../../../abs/services/auth/authService';
import RouteConfig from '../../../abs/config/routeConfig';
import emitter, { EVENT_NAME } from './util';
import { ABSConfirm } from '../../ABSConfirm';
import ABSParagraph from '../../ABSParagraph';
import ABSLink from '../../ABSLink';

export interface IABSInvitationProps {
  dispatch: any;
}

export interface IABSInvitationState {
  totalPoint: number;
  loginPoint: number;
}

const banner = require('../../../assets/images/InvitationModalbanner.png');

class ABSInvitation extends React.Component<IABSInvitationProps, IABSInvitationState> {
  private modal;
  private loginModal;

  constructor(props: any) {
    super(props);
    this.state = {
      totalPoint: 0,
      loginPoint: 1
    };
  }

  componentDidMount() {
    const isLogin = authService.checkIsLogin();
    if (isLogin) {
      let user = authService.getCurrentUser();
      if (user && user.isNew === true) {
        this.props.dispatch({
          type: 'global/inviteShowStatus',
        });
        return;
      }
      this.props.dispatch({
        type: 'global/inviteShowStatus',
      }).then((res) => {
        if (!res) {
          return;
        }
        // 显示完善用户信息的弹窗
        if (res.is_show_complete_profile) {
          return;
        }
        // 显示邀请弹框
        if (res.is_show_invite) {
          setTimeout(() => {
            document.getElementById('abs-invitation')!.click();
            const modalLeft = document.getElementById('abs-invitation-modal')!.offsetLeft;
            const bodyWidth = document.body.offsetWidth;
            const cha = (bodyWidth - 720) / 2;
            const modalDom = document.getElementsByClassName('abs-invitation-modal')[0] as HTMLElement;
            modalDom.style.transformOrigin = `${modalLeft - cha}px -72px`;
          }, 500);
          return;
        }
        // 显示每日首次登录提醒弹框
        if (this.loginModal && res.is_show_today_point) {
          const totalPoint = res.total_point ? res.total_point : 0;
          const loginPoint = res.today_login_point ? res.today_login_point : 1;
          this.setState({ totalPoint: totalPoint, loginPoint: loginPoint });
          this.loginModal.setState({ visible: true });
        }
      });
    }
    emitter.addListener(EVENT_NAME.GET_REGISTER, this.onOpenInvitationModal);
  }

  componentWillUnmount() {
    emitter.removeListener(EVENT_NAME.GET_REGISTER, this.onOpenInvitationModal);
  }

  // 关闭弹框时，icon按钮跳动一下
  onCancel = () => {
    document.getElementById('abs-invitation-modal')!.style.lineHeight = '50px';
    setTimeout(() => {
      document.getElementById('abs-invitation-modal')!.style.lineHeight = '60px';
    }, 150);
  }

  randerModalContent() {
    return (
      <>
        <ABSImage logo={banner} width={718} height={114} />
        <Row style={{ paddingLeft: 10, paddingRight: 10 }}>
          <Col span={8}>
            <LinkInvitation />
          </Col>
          <Col span={8}>
            <EmailInvitation />
          </Col>
          <Col span={8}>
            <AddressBookInvitation />
          </Col>
        </Row>
      </>
    );
  }

  onOpenInvitationModal = () => {
    const isLogin = authService.checkIsLogin();
    if (isLogin) {
      this.modal.setState({ visible: true });
      return;
    }
    location.href = RouteConfig.login + '?return_url=' + window.location.href.replace('?', '*').replace(/&/g, '@');
  }

  renderLoginModal() {
    const { totalPoint, loginPoint } = this.state;
    return (
      <ABSParagraph>
        今日首次登录获得{loginPoint}分，您的总积分：{totalPoint}分。<br />
        您可到<ABSLink to={RouteConfig.pointCenter} target="_blank">{'积分中心'}</ABSLink>了解更多。
      </ABSParagraph>
    );
  }

  onSuccessCallback = () => {
    // 要不关闭弹窗时 返回true
    return false;
  };

  render() {
    return (
      <div className="abs-invitation" id="abs-invitation-modal">
        <div className="abs-invitation-icon" id="abs-invitation" ref="invitation" onClick={() => this.onOpenInvitationModal()}>
          <ABSIconTooltip type="contract-add" details="邀请好友，一起来了解ABS资讯" />
        </div>
        {/* 邀请弹框 */}
        <ABSModal
          content={this.randerModalContent()}
          width={720}
          footer={null}
          ref={view => this.modal = view}
          className="abs-invitation-modal"
          getContainer={() => document.getElementById('abs-invitation-modal') as HTMLElement}
          onCancel={this.onCancel}
        />
        {/* 每日首次登录弹框 */}
        <ABSConfirm
          content={this.renderLoginModal()}
          title="登录提醒"
          width={380}
          onSuccessCallback={this.onSuccessCallback}
          ref={view => (this.loginModal = view)}
        />
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return { ...state.global };
}

export default connect(mapStateToProps)(ABSInvitation);