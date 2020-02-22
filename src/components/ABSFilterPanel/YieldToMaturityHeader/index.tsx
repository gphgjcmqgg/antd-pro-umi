import React from 'react';
import '../Label/index.less';
import ABSIcon from '../../ABSIcon';
import SampleInput from '../SampleInput';

export interface IYieldToMaturityHeaderProps {
  title?: string;
}

export interface IYieldToMaturityHeaderState {
  bidIconStatus: boolean;
  ofrIconStatus: boolean;
  bidValue: string;
  ofrValue: string;
}

class YieldToMaturityHeader extends React.Component<IYieldToMaturityHeaderProps, IYieldToMaturityHeaderState> {
  static defaultProps = {
    title: '到期收益率(%)',
  };

  state = {
    bidIconStatus: false,
    ofrIconStatus: false,
    bidValue: '',
    ofrValue: '',
  };

  public bidValue() {
    const { bidValue } = this.state;
    return bidValue;
  }

  public bidIconStatus() {
    const { bidIconStatus } = this.state;
    return bidIconStatus;
  }

  public ofrValue() {
    const { ofrValue } = this.state;
    return ofrValue;
  }

  public ofrIconStatus() {
    const { ofrIconStatus } = this.state;
    return ofrIconStatus;
  }

  changeBidIcon = () => {
    const { bidIconStatus } = this.state;
    this.setState({
      bidIconStatus: !bidIconStatus,
    });
  }

  changeOfrIcon = () => {
    const { ofrIconStatus } = this.state;
    this.setState({
      ofrIconStatus: !ofrIconStatus,
    });
  }

  extraValue() {
    const { bidValue, ofrValue } = this.state;
    return {
      yield_to_maturity: {
        bidValue: bidValue,
        ofrValue: ofrValue,
      },
    };
  }

  render() {
    const { title } = this.props;
    const { bidIconStatus, ofrIconStatus, bidValue, ofrValue } = this.state;

    return (
      <div className="abs-filter-trading-circle">
        <div className="abs-filter-label">{title}</div>
        <span className="abs-filter-trading-circle-sub-title">bid</span>
        <span className="abs-filter-trading-circle-symbol" onClick={this.changeBidIcon}>
          {bidIconStatus ? <ABSIcon type="greater-e" /> : <ABSIcon type="less-e" />}
        </span>
        <SampleInput
          title=""
          onTextChange={this.onBidValueChange}
          inputValue={bidValue}
          placeholder=""
        />
        <span className="abs-filter-trading-circle-sub-title abs-filter-trading-circle-sub-title-ofr">ofr</span>
        <span className="abs-filter-trading-circle-symbol" onClick={this.changeOfrIcon}>
          {ofrIconStatus ? <ABSIcon type="greater-e" /> : <ABSIcon type="less-e" />}
        </span>
        <SampleInput
          title=""
          onTextChange={this.onOfrValueChange}
          inputValue={ofrValue}
          placeholder=""
        />
      </div>
    );
  }

  private onBidValueChange = (value: string) => {
    this.setState({ bidValue: value });
  }
  private onOfrValueChange = (value: string) => {
    this.setState({ ofrValue: value });
  }
}

export default YieldToMaturityHeader;