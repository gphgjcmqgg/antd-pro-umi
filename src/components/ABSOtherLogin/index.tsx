import React from 'react';
import './index.less';
import { ABSModal } from '../ABSModal';
import Wechat from '../../utils/wechat';
const wechatlogo = require('../../assets/images/icon-wechat@2x.png');
const abslinklogo = require('../../assets/images/icon-app@2x.png');
const abslinkQrcode = require('../../assets/images/abslink-qrcode.png');

export interface IABSOtherLoginProps {
}

class ABSOtherLogin extends React.Component<IABSOtherLoginProps> {
  wechatModal;
  abslinkModal;

  onWechatLogin = () => {
    this.wechatModal.setState({ visible: true });
  }

  onAbsLinkDownload = () => {
    this.abslinkModal.setState({ visible: true });
  }

  render() {
    const wechatContent = (
      <div className="modal-otherway">
        <div className="modal-otherway-title">微信登录</div>
        <iframe className="modal-otherway-iframe"
          frameBorder="0"
          sandbox="allow-scripts allow-same-origin allow-top-navigation"
          scrolling="no"
          src={Wechat.getLoginUrl()} />
      </div>
    );

    const absLinkContent = (
      <div className="modal-otherway">
        <div className="modal-otherway-title">扫码下载App</div>
        <img src={abslinkQrcode} />
        <div className="modal-otherway-description">手机扫描二维码下载CNABS移动端</div>
      </div>
    );

    return (
      <div className="abs-login-content-otherway">
        <div className="abs-login-content-otherway-logo" onClick={this.onWechatLogin}>
          <img src={wechatlogo} />
          <span className="abs-login-content-otherway-logo-title">微信登录</span>
        </div>
        <div className="abs-login-content-otherway-logo abs-login-content-otherway-abslink" onClick={this.onAbsLinkDownload}>
          <img src={abslinklogo} />
          <span className="abs-login-content-otherway-logo-title">扫码下载App</span>
        </div>

        <ABSModal
          content={wechatContent}
          width={420}
          footer={null}
          ref={view => this.wechatModal = view}
          wrapClassName="wechat-modal"
        />
        <ABSModal
          content={absLinkContent}
          width={420}
          footer={null}
          ref={view => this.abslinkModal = view}
          wrapClassName="abslink-modal"
        />
      </div>
    );
  }
}

export default ABSOtherLogin;