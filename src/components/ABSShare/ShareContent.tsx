import './ShareContent.less';
import React, { Component } from 'react';
import { connect } from 'dva';
import { TYPE } from './index';
import { ABSInput } from '../ABSInput';
import { ABSButton } from '../ABSButton';
import QRCode from 'qrcode.react';
import ABSMessage from '../ABSMessage/index';
import Copy from 'copy-to-clipboard';
import { momentsMessage, wechatMessage, linkShareContent, wechatMessageNoLogin, momentsMessageNoLogin } from './util';
import { QRShareAddPoint } from '../../abs/views/market/DailyReport/utils';
import authService from '../../abs/services/auth/authService';
import { COPY_SUCCESS_MESSAGE, COPY_SUCCESS_MESSAGE_NOLOGIN } from '../../utils/constant';

export interface IShareContentProps {
  type: number;
  title?: string;
  url?: string;
  content?: string;
  dispatch?: any;
  htmlType: any;
}

export interface IShareContentState {
  content?: string;
}

class ShareContent extends Component<IShareContentProps, IShareContentState> {
  addPointNum = 0; 
  constructor(props: any) {
    super(props);
    this.state = {
      content: this.props.content,
    };
  }

  componentWillReceiveProps(nextProps: IShareContentProps) {
    const { content } = this.state;
    if (content !== nextProps.content) {
      this.setState({ content: nextProps.content });
    }
  }

  renderContent() {
    const { type, url = '' } = this.props;
    const { content = '' } = this.state;
    const isLogin = authService.checkIsLogin();
    const wechatMessageNew = isLogin ? wechatMessage : wechatMessageNoLogin;
    const momentsMessageNew = isLogin ? momentsMessage : momentsMessageNoLogin;
    
    switch (type) {
      case TYPE.links:
        return this.renderLinks(url, content);
      case TYPE.wechat:
        return this.renderQRCode(url, wechatMessageNew);
      case TYPE.moments:
        return this.renderQRCode(url, momentsMessageNew);
      default: return null;
    }
  }

  renderLinks(url: string, content: string) {
    return (
      <div className="abs-share-content">
        <span className="abs-share-content-desc">{linkShareContent}</span>
        <ABSInput 
          id="abs-share-content-input"
          className="abs-share-content-input" 
          onChange={(text) => this.setState({ content: text })}
          style={{ height: 120 }} 
          autosize={true} 
          value={content} 
          onCopy={this.onInputCopy}
        />
        <ABSButton className="abs-share-content-button"
          style={{ height: 48 }} absIcon="binding" children="复制文字" onClick={() => this.onCopy(content)} />
      </div>
    );
  }

  renderQRCode(url: string, text: string) {
    return (
      <div className="abs-share-content-img">
        <div className="abs-share-content-img-qrcode">
          <QRCode className="abs-share-content-img-qrcode-content" value={url} />
        </div>
        <span className="abs-share-content-img-desc">{text}</span>
      </div>
    );
  }

  render() {
    const { title } = this.props;
    return (
      <div className="abs-share-content">
        <span className="abs-share-content-title">{title}</span>
        {this.renderContent()}
      </div>
    );
  }

  addPoint() { 
    if (this.addPointNum) { return; }
    QRShareAddPoint(this.props.dispatch, this.props.htmlType);
    this.addPointNum++;
  }
  // 复制添加积分
  onInputCopy = () => {
    const isLogin = authService.checkIsLogin();
    if (isLogin) { 
      ABSMessage.success(COPY_SUCCESS_MESSAGE);
      this.addPoint();
    } else {
      ABSMessage.success(COPY_SUCCESS_MESSAGE_NOLOGIN);
    }
  }

  onCopy = (content: string) => {
    if (!content) {
      return;
    }
    Copy(content);
    this.onInputCopy();
  }
}

function mapStateToProps(state: any) {
  return { ...state.global };
}

export default connect(mapStateToProps)(ShareContent);