import React from 'react';
import ABSPanel from '../ABSPanel';
import ABSContainer from '../ABSContainer';
import ABSListView from '../ABSList/ABSListView';
import ABSPaginationView from '../ABSPagination/ABSPaginationView';
import './index.less';
import ABSPerfectScrollBar from '../ABSPerfectScrollBar';

export interface IABSListContainerProps {
  columnsData?: any;
  contentData?: any;
  title: string;
  comment?: string;

  pageStyle?: any;
  // emptyText?: string;
  removePerfectScrollBar?: boolean;
  loading?: boolean;

  current?: number;
  pageSize?: number;
  total?: number;
  onChange?: any;
  removePadding?: boolean;
  bordered?: boolean;
  onRow?: (record: any, index: number) => any;
  selectable?: boolean;
  isNewOffer?: boolean;
  newOfferClick?: () => void;
  rowClassName?: (record: any, index: number) => any;
  scroll?: any;
}

class ABSListContainerView extends React.Component<IABSListContainerProps> {

  static defaultProps() {
    return {
      removePerfectScrollBar: false,
      bordered: false,
      removePadding: false,
    };
  }

  renderNewOffer = () => {
    const { newOfferClick } = this.props;
    return (
      <div className="abs-new-offer" onClick={newOfferClick}>出现新报价</div>
    );
  }

  render() {
    const {
      columnsData, contentData, title, comment, removePerfectScrollBar, pageStyle, loading,
      current, pageSize, total, onChange, removePadding, bordered, onRow, selectable, isNewOffer,
      rowClassName, scroll
    } = this.props;
    return (
      <div className="abs-list-container-view">
        <ABSContainer removePadding={removePadding} removePerfectScrollBar={removePerfectScrollBar}>
          <ABSPanel title={title} comment={comment} removePadding={true} hasBorder={true}>
            {removePerfectScrollBar ?
              <ABSListView
              columnsData={columnsData}
              contentData={contentData}
              loading={loading}
              removeBorder={true}
              bordered={bordered}
              onRow={onRow}
              selectable={selectable}
              rowClassName={rowClassName}
              scroll={scroll}/>
            :            
              <ABSPerfectScrollBar>
                <ABSListView
                  columnsData={columnsData}
                  contentData={contentData}
                  loading={loading}
                  removeBorder={true}
                  bordered={bordered}
                  onRow={onRow}
                  selectable={selectable}
                  rowClassName={rowClassName}
                  scroll={scroll}
                />
              </ABSPerfectScrollBar> 
            }
            {isNewOffer ? this.renderNewOffer() : ''}
          </ABSPanel>
        </ABSContainer>

        <div className="abs-list-container-footer" style={pageStyle}>
          <ABSPaginationView
            className="abs-deal-list-pagination"
            current={current}
            pageSize={pageSize}
            total={total}
            onChange={onChange}
          />
        </div>
      </div>
    );
  }
}

export default ABSListContainerView;