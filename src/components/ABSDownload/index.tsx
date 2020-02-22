import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

export interface IABSDownloadProps {
  dispatch?: any;
  url: string;
  params: Object;
  isFileCode?: boolean;
  className?: string;
}
 
export interface IABSDownloadState {
  
}
 
class ABSDownload extends React.Component<IABSDownloadProps, IABSDownloadState> {
  static defaultProps = {
    isFileCode: false,
  };

  onDownload = (e: any) => {
    const { url, dispatch, isFileCode, params } = this.props;
    dispatch({ type: 'global/globalDownload', payload: { isFileCode, url, params } });
  }

  render() {
    const { children, className } = this.props;
    return (
      <div className={classNames(className)} onClick={this.onDownload}>
        {children}
      </div>
    );
  }
}
 
const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(ABSDownload);