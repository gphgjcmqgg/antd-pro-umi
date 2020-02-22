import React from 'react';
import ABSExpertList from '../ABSExpertList';
import { ABSExpertData } from '../ABSExpertList/ABSExpert';
import { connect } from 'dva';
import ABSMessage from '../ABSMessage';

interface IABSExpertListContainerProps {
  experts: ABSExpertData[];
  className?: string;
  expertClassName?: string;
  size?: 'small' | 'middle' | 'large';
  onClick?: (id: string, updateType?: number) => void;
  emptyText?: string;
  showAllButtons?: boolean; // 是否显示全部的按钮
  onClickFollowButton?: (expert: ABSExpertData) => void; // 点击关注触发的回调
  showAttestation?: boolean; // 是否显示已认证
  onClickBefore?: (id: string, updateType?: number) => void; // 跳转前操作
  hideFollowButton?: boolean; // 隐藏关注按钮
  isMyAttention?: boolean; // 是否是我的关注中进来的
  addResumeBtnData?: any; // 添加至我的履历按钮 数据
  dispatch?: any;
}

const mapStateToProps = ({ account }) => {
  return { account };
};

@connect(mapStateToProps)
export default class ABSExpertListContainer extends React.Component<
  IABSExpertListContainerProps
> {
  static defaultProps = {
    showAttestation: false
  };

  onClickFollowButton = (
    expert: ABSExpertData,
    successCallback?: () => void
  ) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'account/followExpert',
      payload: {
        user_id: expert.id,
        is_follow: !expert.isFollow
      }
    }).then(res => {
      if (res) {
        if (!expert.isFollow) {
          ABSMessage.success('关注专家成功');
        } else {
          ABSMessage.success('取消关注专家成功');
        }
        expert.isFollow = !expert.isFollow;
        if (successCallback) {
          successCallback();
        }
      }
    });
  };

  render() {
    const {
      experts,
      className,
      expertClassName,
      size,
      showAllButtons,
      showAttestation,
      isMyAttention,
      onClick,
      emptyText,
      addResumeBtnData
    } = this.props;
    return (
      <ABSExpertList
        experts={experts}
        className={className}
        expertClassName={expertClassName}
        size={size}
        showAllButtons={showAllButtons}
        onClickFollowButton={this.onClickFollowButton}
        showAttestation={showAttestation!}
        onClick={onClick}
        isMyAttention={isMyAttention}
        emptyText={emptyText}
        addResumeBtnData={addResumeBtnData}
      />
    );
  }
}
