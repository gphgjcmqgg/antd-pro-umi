import React, { Component } from 'react';
import './index.less';
import ABSIconTooltip from '../ABSIconTooltip';
import ABSLink from '../ABSLink';
import RouteConfig from '../../abs/config/routeConfig';
export interface IABSHotRecommendItemProps {
  followData?: any;
  emptyText?: React.ReactNode | string;
}

class HotRecommendItem extends Component<IABSHotRecommendItemProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentKey: 1,
      datalength: 0,
    };
  }

  componentWillReceiveProps(nextProps: any) {
    if (this.props.followData !== nextProps.followData) {
      const { followData } = nextProps;
      const datalength = followData ? followData.length : 0;
      this.setState({ datalength: datalength });
    }
  }

  onNextClick = () => {
    let { currentKey } = this.state;   
    this.setState({ currentKey : currentKey + 1});
  };

  renderPayDay = (nextPaymentday: number) => {
    if (!nextPaymentday || nextPaymentday > 7) { return null; }
    return (
      <>
        将在<span className="abs-follow-product-bottom-pay-day">{nextPaymentday}</span>个工作日内兑付
      </>
    );
  };

  render() { 
    const { followData, emptyText } = this.props;
    const { currentKey , datalength } = this.state;
    if (!followData || followData.length === 0 || (datalength !== 0 && currentKey > datalength )) {
      return (
        <div className="abs-follow-product-no-content">{emptyText}</div>
      );
    }
    const data = followData.filter(item => item.key === currentKey)[0];
    return (
      <div className="abs-follow-product">
        <div className="abs-follow-product-top">
          <div className="abs-follow-product-top-name">
            <ABSLink target="_blank" to={`${RouteConfig.productDealInfo}?deal_id=${data.deal_id}`}>
              {data.deal_name}
            </ABSLink>
          </div>
          <div className="abs-follow-product-top-next" onClick={() => this.onNextClick()}>
            <ABSIconTooltip type="next-one-arrow" details="下一条" placement="bottomRight"/>
          </div>
        </div>
        <div className="abs-follow-product-bottom">
          <div className="abs-follow-product-bottom-category">产品</div>
          <div className="abs-follow-product-bottom-pay">
            {this.renderPayDay(data.next_paymentday_diff)}
          </div>
        </div>
      </div>
    );
  }
}

export default HotRecommendItem; 
