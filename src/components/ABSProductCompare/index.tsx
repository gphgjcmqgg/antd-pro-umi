import React from 'react';
import './index.less';
import ABSListView from '../ABSList/ABSListView';

export interface IABSProductCompareProps {
  columnsData?: any[];
  contentData?: any[];
  securityColumnsData?: any[];
  securityContentData?: any[];
  ratingColumnsData?: any[];
  ratingContentData?: any[];
  loading?: boolean;
}

export interface IABSProductCompareState {

}

class ABSProductCompare extends React.Component<IABSProductCompareProps, IABSProductCompareState> {
  render() {
    const { columnsData, contentData, loading, securityColumnsData, securityContentData, ratingColumnsData, ratingContentData } = this.props;
    return (
      <div className="abs-product-compare">
        <div className="abs-deal">
          <ABSListView
            columnsData={columnsData}
            contentData={contentData}
            loading={loading}
            bordered={true}
            removeBorder={true}
          />
        </div>
        <div className="abs-security">
          <ABSListView
            columnsData={securityColumnsData}
            contentData={securityContentData}
            loading={loading}
            bordered={true}
            removeBorder={true}
          />
        </div>
        <div className="abs-rating">
          <ABSListView
            columnsData={ratingColumnsData}
            contentData={ratingContentData}
            loading={loading}
            bordered={true}
            removeBorder={true}
          />
        </div>
      </div>
    );
  }
}

export default ABSProductCompare;