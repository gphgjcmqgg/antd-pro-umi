import React from 'react';
import ABSAvatar from '../ABSAvatar';
import ABSIconTextConnect from '../ABSIconTextConnect';
import RouteConfig from '../../abs/config/routeConfig';
import './index.less';
export interface IABSNewsDetailsProps {
  title?: any;
  publishDate?: any;
  source?: string;
  avatar?: any;
  isRead?: boolean;
  onRead?: () => void;
  onDelete?: () => void;
  onReply?: () => void;
  isSource?: boolean;
  isShowBtn?: boolean;
  showReadStatus?: boolean;
  userId?: string;
}

export interface IABSNewsDetailsState {
}

class ABSFileHeader extends React.Component<IABSNewsDetailsProps, IABSNewsDetailsState> {
  static defaultProps = {
    isRead: true,
    isSource: true,
    isShowBtn: true,
    showReadStatus: false,
  };

  renderReadStates() {
    const { onRead, isRead } = this.props;
    const iconText = {
      icon: isRead ? 'eyes-closed' : 'eyes-open',
      text: isRead ? '设为未读' : '设为已读',
      onClick: onRead
    };
    return iconText;
  }

  renderRightBtns() {
    const { showReadStatus, onDelete, isShowBtn, onReply } = this.props;
    // 收件箱
    const iconTextList = [
      {
        icon: 'reply',
        text: '回复',
        onClick: onReply,
        containerClassName: 'abs-reply'
      },
      this.renderReadStates(),
      {
        icon: 'delete',
        text: '删除',
        onClick: onDelete,
        containerClassName: 'abs-delete'
      }
    ];
    // 已发送
    const iconTextListNoStates = [ 
      {
        icon: 'reply',
        text: '回复',
        onClick: onReply,
        containerClassName: 'abs-reply'
      },
      {
        icon: 'delete',
        text: '删除',
        onClick: onDelete,
        containerClassName: 'abs-delete'
      }
    ];

    if (isShowBtn) {
      return (
        <div className="hearder-text-right">
          <ABSIconTextConnect iconTextList={showReadStatus ? iconTextList : iconTextListNoStates} />
        </div>
      );
    }
    return '';
  }

  getAvatar() {
    const { avatar, userId } = this.props;
    if (avatar === undefined) {
      return null;
    }
    if (userId === undefined) {
      return (
        <div className="header-avatar" >
          <ABSAvatar size="small" alt="" imageUrl={avatar} className="abs-nolink-avatar"/>
        </div>
      );
    }
    return (
      <div className="header-avatar" >
        <ABSAvatar size="small" alt="" imageUrl={avatar} onClick={this.clickAvatar}/>
      </div>
    );
  }
  clickAvatar = () => {
    const { userId } = this.props;
    if (!userId) { return; }
    window.open(`${RouteConfig.expertPreview}?id=${userId}`);
  }

  render() {
    const { publishDate, title, source, isSource } = this.props;
    return (
      <div className="all-view">
        <div className="hearder-view">
          <p className="hearder-text-left">{title}</p>

          {this.renderRightBtns()}
        </div>
        <div className="adress-time">
          {this.getAvatar()}
          <span>{!isSource ? `${source} | ${publishDate}` : `来源 ：${source} | ${publishDate}`}</span>
        </div>
      </div>
    );
  }
}

export default (ABSFileHeader);