import React from 'react';
import './index.less';
import { ABSButton } from '../ABSButton';
import ABSPageTitle from '../ABSPageTitle';
import { connect } from 'dva';

export interface IHeaderProps {
  style?: React.CSSProperties;
  title: string;
  actionType: any;
  payload: any; 
  dispatch: ({ }: any) => void;
}

const mapStateToProps = (state) => {
  return {};
};
@connect(mapStateToProps)
class ABSDownloadHeader extends React.Component<any> {
  downloadButton = (e) => {
    const { actionType, payload, dispatch } = this.props;
    dispatch({
      type: actionType,
      payload: payload,
    });
  }

  renderDownloadButton() {
    return <ABSButton absIcon="cloud-download" onClick={this.downloadButton}>下载</ABSButton>;
  }

  render() {
    const { style, title } = this.props;
    return (
      <ABSPageTitle title={title} style={style} renderRight={this.renderDownloadButton()}/>
    );
  }
}

export default ABSDownloadHeader;