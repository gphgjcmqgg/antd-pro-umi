import React from 'react';
import { connect } from 'dva';
import './index.less';
import { ABSButton } from '../ABSButton';
import commonUtils from '../../utils/commonUtils';
import { ABSModal } from '../ABSModal';
import ABSNormalModal, { IABSNormalModalResult } from '../ABSNormalModal';
import _ from 'lodash';
import ABSLink from '../ABSLink';
import { ABSTag } from '../ABSTag';
import classNames from 'classnames';
import ABSMessage from '../ABSMessage';
import VoteButton from '../../ABSComponents/Vote';
import { ISubtitleProps, IPorductTags } from './util';
import ABSHeaderSubTitle from '../ABSHeaderSubTitle';
import RouteConfig from '../../abs/config/routeConfig';
import { chartColors } from '../../components/ABSChart/chartTheme';
import { DownloadConfigs } from '../../ABSComponents/Download/config';
import Download, { DownloadType } from '../../ABSComponents/Download';
import { VoteConfigs } from '../../ABSComponents/Vote/config';

export interface IABSProductPageTitleProps {
  fullname: string;
  shortname: string;
  subtitleList: ISubtitleProps;
  porductTags: IPorductTags[];
  // buttons?: Array<React.ReactNode>;
  style?: React.CSSProperties;

  dispatch: any;
  product: any;

  dealID: number;
  isFollow: boolean;
  hasDownloadButton: boolean;
  hasDownloadCloudmodelButton: boolean;
  originatorId: number;
}

class ABSProductPageTitle extends React.Component<IABSProductPageTitleProps> {
  state = {
    visible: false,
    dealId: 0,
  };
  private modal: ABSModal | null;
  private normalModal: ABSNormalModal | null;
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'product/initParams',
    });

    const dealID = this.getDealID();
    this.props.dispatch({ type: 'product/getDealInfo', payload: { deal_id: dealID } }).then((res) => {
      if (!this.state.visible) {
        setTimeout(() => {
          this.setState({ visible: true });
        }, 100);
      }
      if (res) {
        this.setState({ dealId: res.deal_id });
      }
    });
  }

  getDealID() {
    const { deal_id = null } = commonUtils.getParams();
    return deal_id;
  }

  handleFeedback = () => {
    if (this.modal) {
      this.modal.setState({ visible: true });
    }
  }

  handleFollow = () => {
    const { dispatch, isFollow } = this.props;
    const dealID = this.getDealID();
    dispatch({
      type: 'product/followDeal',
      payload: { dealID }
    }).then((response) => {
      if (!response) {
        return;
      }
      if (!isFollow) {
        ABSMessage.success('关注产品成功');
      } else {
        ABSMessage.success('取消关注产品成功');
      }
    });
  }

  onSuccessCallback = () => {
    const { dispatch, dealID } = this.props;
    if (this.normalModal) {
      const result: IABSNormalModalResult = this.normalModal.getModalResult();

      dispatch({
        type: 'product/dealPerfect',
        payload: {
          deal_id: dealID,
          content: result.content,
          attachment: result.attachment
        }
      }).then((response) => {
        const message = _.get(response, 'fail_msg', '我们已经收到您的反馈，感谢您的支持!');
        const isSuccess = _.get(response, 'is_success');
        if (isSuccess) {
          ABSMessage.success(message);
        } else {
          ABSMessage.error(message);
        }
      });
    }
  }

  renderFollowButton() {
    const { isFollow } = this.props;
    let buttonType = isFollow ? 'default' : 'primary';
    const followTitle = isFollow ? '取关' : '关注';
    const clazz = classNames({ 'abs-hidden': !this.state.visible });
    return <ABSButton className={clazz} absIcon="star-o" onClick={this.handleFollow} style={{ marginRight: 8 }} type={buttonType as 'primary' | 'default'}>{followTitle}</ABSButton>;
  }

  renderDownloadButton() {
    const { hasDownloadButton } = this.props;
    const dealID = this.getDealID();
    if (hasDownloadButton) {
      const config = DownloadConfigs.basicInfoDownload;
      config.payload = { deal_id: dealID };
      return <Download type={DownloadType.button} config={config} />;
    }
    return null;
  }

  renderDownloadCloudmodelButton() {
    const { dispatch, hasDownloadCloudmodelButton } = this.props;
    const dealID = this.getDealID();
    if (hasDownloadCloudmodelButton) {
      return <ABSButton onClick={() => dispatch({ type: 'product/downloadDealCloudmodel', payload: { dealID } })} style={{ marginRight: 8 }}>下载模型</ABSButton>;
    }
    return null;
  }

  renderFeedbackButton() {
    return <ABSButton type="danger" onClick={this.handleFeedback} style={{ marginRight: 8 }}>数据完善</ABSButton>;
  }

  renderModalContent() {
    return (
      <ABSNormalModal
        subTitle="请把您想要完善的数据详情告诉我们"
        placeholder="请输入您想要完善的数据详情，或直接联系我们：电话：021-31156258 邮箱：feedback@cn-abs.com"
        ref={view => this.normalModal = view}
      />);
  }

  getData(title: string, content: string | React.ReactNode, contentStyle?: React.CSSProperties) {
    return [{
      title,
      content,
      contentStyle,
    }];
  }

  renderSubTitle() {
    const { shortname, originatorId } = this.props;
    const subtitleList = _.get(this.props, 'subtitleList', {});
    const { productType, currentStatus } = subtitleList;
    const subTitlelist = [
      (<ABSLink to={`${RouteConfig.organizationDetail + originatorId}`}>{shortname}</ABSLink>),
      (<p>{productType}</p>),
      (commonUtils.formatContent(currentStatus)),
    ];
    return (
      <ABSHeaderSubTitle subTitlelist={subTitlelist} />
    );
  }

  toProductList = (subType, key) => {
    window.location.href = RouteConfig.productList + `?filter_query_list[0][key]=${subType}&filter_query_list[0][value][0]=${key}`;
  }

  renderTags = () => {
    const { porductTags } = this.props;
    if (!Array.isArray(porductTags)) { return null; }
    return porductTags.map((item, index) => {
      return (
        <div className="abs-product-page-content-title-tag" onClick={() => this.toProductList(item.sub_type, item.key)} key={index}>
          <ABSTag content={item.value} color={chartColors[index]} visible={true} />
        </div>
      );
    });
  }

  renderVoteButton() {
    const { dealId } = this.state;
    if (!dealId) { return; }
    const expertVote = _.cloneDeep(VoteConfigs.dealVote);
    expertVote.payload.related_id = dealId;
    return (
      <div className="abs-product-page-content-title-vote"><VoteButton config={expertVote} style={{ marginRight: 8 }} /></div>
    );
  }

  render() {
    const { fullname, style, hasDownloadCloudmodelButton, hasDownloadButton } = this.props;
    const dynamicButtonClass = classNames('abs-product-page-buttons',
      { 'abs-product-page-buttons-less-padding': hasDownloadCloudmodelButton && hasDownloadButton });
    return (
      <div className="abs-product-page-title" style={style}>
        <div className="abs-product-page-content">
          <div className="abs-product-page-content-title">
            <div className="abs-product-page-content-title-name">{fullname}</div>
            {this.renderTags()}
            {this.renderVoteButton()}
            <div className={dynamicButtonClass}>
              {this.renderFeedbackButton()}
              {this.renderFollowButton()}
              {this.renderDownloadButton()}
              {this.renderDownloadCloudmodelButton()}
            </div>
          </div>
          {this.renderSubTitle()}
        </div>

        <ABSModal
          content={this.renderModalContent()}
          title="数据完善"
          className="abs-product-normal-modal"
          width={800}
          onSuccessCallback={this.onSuccessCallback}
          destroyOnClose={true}
          ref={view => this.modal = view}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ product, global }) => ({
  isFollow: product.isFollow,
  hasDownloadButton: product.hasDownloadButton,
  hasDownloadCloudmodelButton: product.hasDownloadCloudmodelButton,
  originatorId: product.originatorId,
  fullname: product.fullname,
  shortname: product.shortname,
  dealID: product.dealID,
  porductTags: product.porductTags,
  subtitleList: product.subtitleList
});
export default connect(mapStateToProps)(ABSProductPageTitle);