import React from 'react';
import ABSExpert, { ABSExpertData } from './ABSExpert';
import './index.less';
import ABSFormModalContainer from '../ABSFormModalContainer';
import ABSExpertListDataHelper from './ABSExpertListDataHelper';
import ABSAddCard from '../ABSAddCard';

export interface IABSExpertListProps {
  experts: Array<ABSExpertData>;
  className?: string;
  expertClassName?: string;
  size?: 'small' | 'middle' | 'large';
  onClick?: (id: string, updateType?: number) => void;
  emptyText?: React.ReactNode | string;
  showAllButtons?: boolean; // 是否显示全部的按钮
  onClickFollowButton?: (expert: ABSExpertData) => void; // 点击关注触发的回调
  showAttestation?: boolean; // 是否显示已认证
  onClickBefore?: (id: string, updateType?: number) => void; // 跳转前操作
  hideFollowButton?: boolean; // 隐藏关注按钮
  isMyAttention?: boolean;  // 是否是我的关注中进来的
  addResumeBtnData?: any; // 添加至我的履历按钮 数据
  isShowNextAction?: boolean;
  isHasMessage?: boolean; // 是否为站内信消息卡片（用于首页动态）
}

export interface IABSExpertListState {
  expert: ABSExpertData;
  currentKey: number;
  datalength: number;
}

class ABSExpertList extends React.Component<
  IABSExpertListProps,
  IABSExpertListState
> {
  static defaultProps = {
    size: 'small',
    hideFollowButton: false,
    emptyText: '暂无专家数据',
  };

  formModalContainer;

  state = {
    expert: { id: '', name: '' } as ABSExpertData,
    currentKey: 1,
    datalength: 0,
  };

  onSendMessage = (expert: ABSExpertData) => {
    this.setState({ expert });
    this.formModalContainer.openModal();
  };

  renderAddResumeBtn(experts: any) {
    const { addResumeBtnData } = this.props;
    if (addResumeBtnData) {
      return (<><ABSAddCard text={addResumeBtnData.text} icon={addResumeBtnData.icon} onClick={addResumeBtnData.onClick} />{experts}</>);
    }
    return experts;
  }

  componentWillReceiveProps(nextProps: any) {
    if (this.props.experts !== nextProps.experts) {
      const { experts } = nextProps;
      const datalength = experts ? experts.length : 0;
      this.setState({ datalength: datalength });
    }
  }

  onNextClick = e => {
    e.stopPropagation();
    let { currentKey } = this.state;
    this.setState({ currentKey : currentKey + 1 });
  };
  
  renderExperts() {
    const {
      experts,
      expertClassName,
      size,
      onClick,
      emptyText,
      showAllButtons,
      onClickFollowButton,
      showAttestation,
      onClickBefore,
      hideFollowButton,
      isMyAttention,
      addResumeBtnData,
      isShowNextAction,
      isHasMessage,
    } = this.props;
    const { currentKey, datalength } = this.state;
    if (!Array.isArray(experts) || experts.length <= 0  || (datalength !== 0 && currentKey > datalength )) {
      return (
        <div className="abs-expert-empty">
          {addResumeBtnData ? 
            <ABSAddCard text={addResumeBtnData.text} icon={addResumeBtnData.icon} onClick={addResumeBtnData.onClick} />
            : 
            <span className="abs-expert-empty-text">{emptyText}</span>
          }
        </div>
      );
    }

    let expertsNew: any = [];
    if (isShowNextAction) {
      const expertsFilterData = experts.filter((expert, index) => {
        if (index + 1 === currentKey) {
          return (
            <ABSExpert
              expert={expert}
              key={index} // 专家动态可能出现同一个人两条动态，key不可用id或者name
              className={expertClassName}
              size={size}
              onClick={onClick}
              showAllButtons={showAllButtons}
              hideFollowButton={hideFollowButton}
              onClickFollowButton={onClickFollowButton}
              showAttestation={showAttestation}
              onClickBefore={onClickBefore}
              onSendMessage={this.onSendMessage}
              isMyAttention={isMyAttention}
              isShowNextAction={isShowNextAction}
              onNextClick={this.onNextClick}
              isHasMessage={isHasMessage}
            />
          );
        } else {
          return null;
        }
      });
      if (expertsFilterData && expertsFilterData.length > 0) {
        expertsNew = expertsFilterData.map((expert, index) => (
          <ABSExpert
            expert={expert}
            key={index} // 专家动态可能出现同一个人两条动态，key不可用id或者name
            className={expertClassName}
            size={size}
            onClick={onClick}
            showAllButtons={showAllButtons}
            hideFollowButton={hideFollowButton}
            onClickFollowButton={onClickFollowButton}
            showAttestation={showAttestation}
            onClickBefore={onClickBefore}
            onSendMessage={this.onSendMessage}
            isMyAttention={isMyAttention}
            isShowNextAction={isShowNextAction}
            onNextClick={this.onNextClick}
            isHasMessage={isHasMessage}
          />
        ));
      }
    } else {
      expertsNew = experts.map((expert, index) => (
        <ABSExpert
          expert={expert}
          key={index} // 专家动态可能出现同一个人两条动态，key不可用id或者name
          className={expertClassName}
          size={size}
          onClick={onClick}
          showAllButtons={showAllButtons}
          hideFollowButton={hideFollowButton}
          onClickFollowButton={onClickFollowButton}
          showAttestation={showAttestation}
          onClickBefore={onClickBefore}
          onSendMessage={this.onSendMessage}
          isMyAttention={isMyAttention}
          isShowNextAction={isShowNextAction}
          onNextClick={this.onNextClick}
        />
      ));
    }
    const expertsList = this.renderAddResumeBtn(expertsNew);
    return expertsList;
  }

  renderFormModalContainer() {
    const { expert } = this.state;
    return (
      <ABSFormModalContainer
        controls={ABSExpertListDataHelper.getControls({
          key: expert.id,
          label: expert.name
        })}
        title="私信TA"
        ref={view => (this.formModalContainer = view)}
      />
    );
  }

  render() {
    const { className } = this.props;
    return (
      <div className={`abs-expert-list ${className}`}>
        {this.renderExperts()}
        {this.renderFormModalContainer()}
      </div>
    );
  }
}

export default ABSExpertList;
