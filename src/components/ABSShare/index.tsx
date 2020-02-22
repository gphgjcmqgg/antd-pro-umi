import './index.less';
import React, { Component } from 'react';
import { ABSModal } from '../ABSModal';
import ShareContent from './ShareContent';
import authService from '../../abs/services/auth/authService';
import ABSTooltip from '../ABSBubble';
import { shareHtmlType } from './util';

const links = require('../../assets/images/share_links.png');
const moments = require('../../assets/images/share_moments.png');
const wechat = require('../../assets/images/share_wechat.png');

export const TYPE = {
  links: 1,
  moments: 2,
  wechat: 3,
};

export interface IABSShareProps {
  url?: string;
  content?: string;
  className?: string;
  type?: 'vertical';
  htmlType?: any;
}

export interface IABSShareState {
  content: any;
}

export default class ABSShare extends Component<IABSShareProps, IABSShareState> {

  shareModal;
  TooltipPlacement;

  constructor(props: any) {
    super(props);
    this.state = {
      content: {},
    };
    this.TooltipPlacement = this.props.type ? 'left' : 'bottom';
  }

  renderLinkShare() {
    const target = (
      <img
        className="abs-share-image"
        src={links}
        width={30}
        height={30}
        onClick={(e) => this.onToogle(e, TYPE.links)}
      />
    );
    return (
      <ABSTooltip 
        placement={this.TooltipPlacement} 
        details={<span className="abs-share-tooltip">{'分享链接'}</span>} 
        target={target}
      />
    );
  }
  renderWeChatShare() {
    const target = (
      <img
        className="abs-share-image"
        src={wechat}
        width={30}
        height={30}
        onClick={(e) => this.onToogle(e, TYPE.wechat)}
      />
    );
    return (
      <ABSTooltip
        placement={this.TooltipPlacement}
        details={<span className="abs-share-tooltip">{'分享到微信'}</span>}
        target={target}
      />
    );
  }
  renderMomentsShare() {
    const target = (
      <img
        className="abs-share-image"
        src={moments}
        width={30}
        height={30}
        onClick={(e) => this.onToogle(e, TYPE.moments)}
      />
    );
    return (
      <ABSTooltip
        placement={this.TooltipPlacement}
        details={<span className="abs-share-tooltip">{'分享到朋友圈'}</span>}
        target={target}
      />
    );
  }
  renderShareModal() {
    return (
      <ABSModal
        content={this.state.content}
        width={420}
        footer={null}
        ref={view => (this.shareModal = view)}
      />
    );
  }

  render() {
    const { className, type } = this.props;
    return (
      <div className={className}>
        {
          type ?
            <div className="abs-share abs-share-vertical" onClick={(e) => this.fatherBoxClick(e)}>
              {this.renderLinkShare()}
              {this.renderWeChatShare()}
              {this.renderShareModal()}
            </div>
            :
            <div className="abs-share">
              <span className="abs-share-text">{'分享到'}</span>
              {this.renderLinkShare()}
              {this.renderWeChatShare()}
              {this.renderMomentsShare()}
              {this.renderShareModal()}
            </div>
        }
      </div>
    );
  }

  // 在ABSBackTop中 阻止父级冒泡
  fatherBoxClick = (e) => {
    e.stopPropagation();
    return false;
  }

  onToogle = (e, flag) => {
    e.stopPropagation();
    let { url = '', content = '', htmlType = shareHtmlType.dailyReport } = this.props;
    if (!url) {
      url = window.location.href;
    }
    const user = authService.getCurrentUser();
    const symbols = url && url.indexOf('?') >= 0 ? '&' : '?';
    url = `${url}${symbols}key=${user ? user.id : ''}`;
    const urlQR = `${url}&type=web`;
    let shareContent;
    switch (flag) {
      case TYPE.links:
        shareContent = <ShareContent type={TYPE.links} title="分享链接" url={url} content={`${content}${url}`} htmlType={htmlType} />;
        break;
      case TYPE.wechat:
        shareContent = <ShareContent type={TYPE.wechat} title="分享到微信" url={urlQR} htmlType={htmlType} />;
        break;
      case TYPE.moments:
        shareContent = <ShareContent type={TYPE.moments} title="分享到朋友圈" url={urlQR} htmlType={htmlType} />;
        break;
      default: break;
    }
    this.setState({ content: shareContent });
    this.shareModal.setState((prveState) => {
      return {
        visible: !prveState.prveState,
      };
    });
  };
}
