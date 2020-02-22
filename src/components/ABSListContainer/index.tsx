import React, { ReactNode } from 'react';
import ABSPagination from '../ABSPagination';
import ABSPanel from '../ABSPanel';
import ABSContainer from '../ABSContainer';
import ABSList from '../ABSList';
import ABSPerfectScrollBar from '../ABSPerfectScrollBar';
import './index.less';

export interface IABSListContainerProps {
  columnsData?: any;
  title: string;
  comment?: ReactNode | string;
  actionButton?: ReactNode;
  actionType: string;
  payload: object;
  model: string;
  scroll?: any;
  pageStyle?: any;
  emptyText?: string;
  removePerfectScrollBar?: boolean;
  onRow?: (record: any, index: number) => any;
  bordered?: boolean;
  onChange?: any;
  selectable?: boolean;
  removePadding?: boolean;
  expandedRowRender?: (record: any, index: number, indent: number, expanded: boolean) => React.ReactNode;
}

interface IABSListContainerState {
  isNoData: boolean;
}

class ABSListContainer extends React.PureComponent<IABSListContainerProps, IABSListContainerState> {
  private absList;
  private absPagination;

  static defaultProps() {
    return {
      removePerfectScrollBar: false,
      removePadding: false,
      bordered: false,
    };
  }

  constructor(props: any) {
    super(props);
    this.state = {
      isNoData: false,
    };
  }

  resetPageIndex() {
    this.absPagination.getWrappedInstance().setPageIndex(1);
  }

  componentWillReceiveProps(nextProps: IABSListContainerProps) {
    this.showScrollBar();
  }

  showScrollBar() {
    const container = document.querySelectorAll('.abs-list-container .scrollbar-container')[0] as HTMLElement;
    if (container) {
      setTimeout(() => {
        container.scrollLeft = 1;
      }, 1500);
    }
  }

  public dispatchAction() {
    this.absList.getWrappedInstance().dispatchAction();
  }

  render() {
    const { removePadding, selectable, pageStyle, 
      columnsData, title, comment, actionType, 
      payload, model, scroll, emptyText, onRow, 
      removePerfectScrollBar, bordered, onChange, 
      expandedRowRender, actionButton
    } = this.props;
    const { isNoData } = this.state;
    return (
      <div className={!isNoData ? 'abs-list-container' : 'abs-list-container-no-data'} >
        <ABSContainer removePerfectScrollBar={removePerfectScrollBar} removePadding={removePadding}>
          <ABSPanel title={title} comment={comment} actionButton={actionButton} removePadding={true} hasBorder={true}>
            <ABSPerfectScrollBar>
              <ABSList
                selectable={selectable}
                actionType={actionType}
                payload={payload}
                columnsData={columnsData}
                model={model}
                scroll={scroll}
                emptyText={emptyText}
                onRow={onRow}
                bordered={bordered}
                ref={view => this.absList = view}
                expandedRowRender={expandedRowRender}
                removeBorder={true}
              />
            </ABSPerfectScrollBar>
          </ABSPanel>
        </ABSContainer>
        <div className={!isNoData ? 'abs-list-container-footer' : 'abs-list-container-footer-no-data'} style={pageStyle}>
          <ABSPagination
            className="abs-deal-list-pagination"
            actionType={actionType}
            payload={payload}
            model={model}
            onChange={onChange}
            onLoadWithNoData={this.onLoadWithNoData}
            ref={view => this.absPagination = view}
          />
        </div>
      </div>
    );
  }

  onLoadWithNoData = (flag: boolean) => {
    this.setState({ isNoData: flag });
  }
}

export default ABSListContainer;