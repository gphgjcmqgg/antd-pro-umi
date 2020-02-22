import React from 'react';
import classNames from 'classnames';
import ABSAvatar from '../ABSAvatar';
import { Icon } from 'antd';
import { Tooltip } from 'antd';
import './ABSExpert.less';
import '../../components/ABSBubble/index.less';
import { ABSTag } from '../ABSTag';
import ABSIconText from '../ABSIconText';
import routeConfig from '../../abs/config/routeConfig';
import ABSIcon from '../ABSIcon';
import authService, { IUser } from '../../abs/services/auth/authService';
import ABSIconTooltip from '../ABSIconTooltip';
import ABSComment from '../ABSComment';
import ABSParagraph from '../ABSParagraph';
// import ABSLink from '../../components/ABSLink';

// tslint:disable-next-line:interface-name
export interface ABSExpertData {
  imageUrl: string;
  name: string;
  dynamic?: any;
  content?: string;
  isDynamic?: boolean;
  company?: string;
  department?: string;
  position?: string;
  id: string;
  // 是否关注
  isFollow?: boolean;
  // 是否被该专家关注
  isFollowed?: boolean;
  isVerified?: boolean;
  update_type?: 1 | 2; // 专家动态：1表示工作经历等变更，2表示被关注的动态
  count?: number; // 首页站内信卡片未读消息数 
}

export interface IABSExpertProps {
  expert: ABSExpertData;
  className?: string;
  size?: 'large' | 'middle' | 'small';
  onClick?: (id: string, updateType?: number) => void;
  // 是否互相关注
  isFollowingEachOther?: boolean;
  // 点击关注按钮
  onClickFollowButton?: any;
  // 是否显示关注按钮
  onClickBefore?: (id: string, updateType?: number) => void;
  // 跳转前操作
  showAllButtons?: boolean;
  // 是否显示认证
  showAttestation?: boolean;
  onSendMessage?: (expert: ABSExpertData) => void;
  // 隐藏关注按钮
  hideFollowButton?: boolean;
  // 是否是我的关注中进来的
  isMyAttention?: boolean;
  isShowNextAction?: boolean;
  onNextClick?: (e: any) => void;
  isHasMessage?: boolean;
}

export interface IABSExpertState {
  // 第一次进来的时候是否关注
  initialFollowIsFollow: boolean;
  showActionButtons: boolean;
}

class ABSExpert extends React.Component<IABSExpertProps, IABSExpertState> {
  static defaultProps = {
    showFollowButton: false,
    showAttestation: false,
    isMyAttention: false
  };

  formModalContainer;

  constructor(props: IABSExpertProps) {
    super(props);
    this.state = {
      showActionButtons: false,
      initialFollowIsFollow: props.expert.isFollow!
    };
  }

  onClickFollowButton = e => {
    const { expert, onClickFollowButton } = this.props;
    e.stopPropagation();
    if (onClickFollowButton) {
      onClickFollowButton(expert, () => {
        this.setState({ showActionButtons: true }); // 修改关注按钮鼠标hover不刷新bug
      });
    }
  };

  onSendMessage = e => {
    const { onSendMessage, expert } = this.props;
    e.stopPropagation();
    if (onSendMessage) {
      onSendMessage(expert);
    }
  };

  renderButtons(showContactButton: boolean, showFollowButton: boolean) {
    const { showActionButtons } = this.state;
    const { expert, showAllButtons } = this.props;
    const user = authService.getCurrentUser() as IUser;
    if (user && user.id === expert.id) {
      // 当前用户为自己
      return null;
    }
    if (!showActionButtons) {
      return null;
    }
    if (showAllButtons) {
      const containerClassName = classNames('abs-expert-action-button', {
        'abs-expert-cancel-follow-button': expert.isFollow,
        'abs-expert-follow-button': !expert.isFollow
      });

      const followText = expert.isFollow ? '取关' : '关注';

      return (
        <div className="abs-expert-action-buttons-container">
          {showContactButton ? (
            <ABSIconText
              containerClassName="abs-expert-action-button"
              icon="send"
              isAnt={false}
              text="私信"
              onClick={this.onSendMessage}
            />
          ) : null}
          {showFollowButton ? (
            <ABSIconText
              containerClassName={containerClassName}
              icon="star-o"
              isAnt={false}
              text={followText}
              onClick={this.onClickFollowButton}
            />
          ) : null}
        </div>
      );
    }
    return null;
  }

  renderDepartment() {
    const { expert } = this.props;
    if (expert && expert.department) {
      return <span>{expert.department}</span>;
    }
    return null;
  }

  renderSplitLine() {
    const { expert } = this.props;
    if (expert && expert.department && expert.position) {
      return <span> - </span>;
    }
    return null;
  }

  renderPosition() {
    const { expert } = this.props;
    if (expert && expert.position) {
      return <span>{expert.position}</span>;
    }
    return null;
  }

  renderDescription() {
    const { expert } = this.props;
    if (expert.isDynamic) {
      return (
        <>
          <p className="abs-expert-dynamic">{expert.dynamic}</p>
          <p className="abs-expert-content">{expert.content}</p>
        </>
      );
    } else {
      return (
        <>
          <p className="abs-expert-company">{expert.company}</p>
          <p className="abs-expert-content">
            {this.renderDepartment()}
            {this.renderSplitLine()}
            {this.renderPosition()}
          </p>
        </>
      );
    }
  }

  renderMessageDescription() {
    const { expert } = this.props;
    return (
      <>
        <ABSParagraph className="abs-expert-content">{expert.dynamic}</ABSParagraph>
        <ABSParagraph className="abs-expert-dynamic">{expert.content}</ABSParagraph>
      </>
    );
  }

  renderExpertInfo() {
    const { expert, showAttestation } = this.props;

    return (
      <div className="abs-expert-info">
        <h3 className="abs-expert-name">{expert.name}</h3>

        {showAttestation && (
          <ABSTag
            size="small"
            color="#EE3636"
            content="已认证"
            visible={expert.isVerified}
          />
        )}
      </div>
    );
  }

  renderMessageInfo() {
    const { expert } = this.props;

    return (
      <div className="abs-message-info">From: {expert.name}</div>
    );
  }

  renderMessageCount() {
    const { expert } = this.props;

    return (
      <div className="abs-message-count-info">
        共有<ABSComment>{expert.count}</ABSComment>条未读消息
      </div>
    );
  }

  onClick = e => {
    const { onClick, expert } = this.props;
    const { id, update_type } = expert;
    e.stopPropagation();

    if (onClick) {
      onClick(id, update_type);
    }
  };

  onClickAvatar = () => {
    const { expert, onClickBefore, isHasMessage } = this.props;
    if (isHasMessage) {
      window.open(`${routeConfig.internalMessage}?id=${expert.id}`, '_blank');
      return;
    }
    if (onClickBefore) {
      onClickBefore(expert.id, expert.update_type);
    }
    window.open(`${routeConfig.expertPreview}?id=${expert.id}`, '_blank');
  };

  onMouseOver = () => {
    this.setState({ showActionButtons: true });
  };

  onMouseLeave = () => {
    this.setState({ showActionButtons: false });
  };

  renderStatusComponent(showFollowEachOtherComponent: boolean) {
    if (showFollowEachOtherComponent) {
      return <ABSIcon type="star-m" className="expert-icon-follow-icon" />;
    }
    return null;
  }

  renderIsDynamicButton = () => {
    const { isShowNextAction, onNextClick, expert } = this.props;
    if (isShowNextAction) {
      return (
        <div className="abs-expert-next-button" onClick={onNextClick}>
          <ABSIconTooltip type="next-one-arrow" details="下一条" placement="bottomRight"/>
        </div>
      );
    }
    if (expert.isDynamic) {
      return (
        <div className="abs-expert-remove-button">
          <Tooltip
            title="忽略此条"
            placement="bottomRight"
            arrowPointAtCenter={true}
          >
            <Icon type="close" onClick={this.onClick} />
          </Tooltip>
        </div>
        );
    } else {
      return null;
    }
  }
  render() {
    const {
      expert,
      className,
      size,
      hideFollowButton,
      isMyAttention,
      isHasMessage,
    } = this.props;
    const { initialFollowIsFollow, showActionButtons } = this.state;
    const classes = classNames(
      'abs-expert',
      {
        'abs-expert-middle': size === 'middle',
        'abs-expert-large': size === 'large'
      },
      {
        'abs-expert-card-hover-bg': showActionButtons
      },
      className
    );
    const typeClasses = classNames({
      'abs-dynamic': expert.isDynamic,
      'abs-card': !expert.isDynamic,
      'abs-message-card': isHasMessage
    });

    const showContactButton = !expert.isDynamic;
    const showFollowButton = isMyAttention
      ? !expert.isDynamic && !hideFollowButton
      : !initialFollowIsFollow && !expert.isDynamic && !hideFollowButton;
    const showFollowEachOtherComponent = expert.isFollow! && expert.isFollowed!;
    return (
      <div
        className={classes}
        onClick={this.onClickAvatar}
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}
      >
        <ABSAvatar
          alt={expert.name}
          imageUrl={expert.imageUrl}
          statusComponent={this.renderStatusComponent(
            showFollowEachOtherComponent
          )}
        />
        {isHasMessage ? 
          <div className={typeClasses}>
            <div className="abs-expert-description">
              {this.renderMessageInfo()}
              {this.renderMessageDescription()}
              {this.renderMessageCount()}
            </div>
            {this.renderIsDynamicButton()}
          </div>
           : 
          <div className={typeClasses}>
            <div className="abs-expert-description">
              {this.renderExpertInfo()}
              {this.renderDescription()}
            </div>
            {this.renderIsDynamicButton()}
          </div>
        }
        {this.renderButtons(showContactButton, showFollowButton)}
      </div>
    );
  }
}

export default ABSExpert;
