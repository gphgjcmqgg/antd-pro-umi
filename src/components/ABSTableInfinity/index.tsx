import React from 'react';
import { connect } from 'dva';
import { InfinityTable as Table } from './table';
import './index.less';
import shallowEqual from 'shallowequal';
import ABSLoading from '../ABSLoading';
import { FILTER_TABLE_NO_CONTENT_MESSAGE } from '../../utils/constant';
import classNames from 'classnames';

export interface IABSTableInfinityProps {
  className?: string;
  columnsData?: any;
  onRow?: (record: any, index: number) => any;
  onScroll?: (res: any) => void;
  onChange?: any;
  selectable?: boolean;
  filterQueryList?: any;
  model: any;
  effects: string;
  attribute?: any;
  hasLoadData?: boolean;
  emptyText?: string;
  scrollX?: number | true | string;

  dispatch?: any;
  hasMore?: boolean; 
  loading?: boolean;
  contentData?: any;
  datas?: any;
}
interface IABSTableInfinityState {
  recordIndex: number;
  currentPage: number;
}

class ABSTableInfinity extends React.Component<IABSTableInfinityProps, IABSTableInfinityState> {
  static defaultProps = {
    contentData: [],
    loading: true,
    emptyText: FILTER_TABLE_NO_CONTENT_MESSAGE,
    hasMore: false,
    scrollX: true,
    selectable: false,
  };

  constructor(props: any) {
    super(props);
    this.state = { recordIndex: 0, currentPage: 1 };
  }

  componentDidMount() {
    const { hasLoadData } = this.props;
    if (hasLoadData) {
      return;
    }
    const { filterQueryList } = this.props;
    this.updataList(filterQueryList, false, true);
  }

  componentDidUpdate(prevProps: any) {
    const { filterQueryList } = prevProps;
    if (JSON.stringify(this.props.filterQueryList) !== JSON.stringify(filterQueryList)) {
      this.setState({
        currentPage: 1,
      });
      const { hasLoadData } = this.props;
      if (hasLoadData) {
        return;
      } else {
        this.updataList(this.props.filterQueryList, true, true);
      }
    }
  }

  loadMoreContent() {
    return <div className="message-loading"><ABSLoading color="blue" /></div>;
  }

  onLoadMore = (e) => {
    const { filterQueryList, datas, hasMore } = this.props;
    const { currentPage } = this.state;
    const contenHeight = e.target.scrollTop + e.target.clientHeight;
    if (contenHeight < e.target.scrollHeight - 1) {
      return;
    }
    if (!datas.items || datas.items.length <= 0) {
      return;
    }
    if (!hasMore) {
      return;
    }
    if (currentPage !== datas.current_page) {
      return;
    }

    this.setState({
      currentPage: datas.current_page + 1,
    });
    this.updataList(filterQueryList);
  }

  updataList(filterQueryList: any, state?: boolean, changeClickId?: boolean) {
    const { dispatch, effects, onScroll } = this.props;
    const { currentPage } = this.state;
    const payload = {
      ...filterQueryList,
      page_index: currentPage
    };
    dispatch({
      type: effects,
      payload: payload
    }).then((res) => {
      if (res) {
        if (state) {
          const domList = document.getElementsByClassName('ant-table-body')[0] || {};
          domList.scrollTop = 0;
        }

        if (onScroll && changeClickId) { onScroll(res); }
      }
      return;
    });
  }

  render() {
    const {
      className,
      columnsData,
      contentData,
      loading,
      hasMore,
      scrollX,
      onChange,
      emptyText,
      // payload,
      ...rest
    } = this.props;
    const clazz = classNames('abs-table-infinity', { className, 'abs-nodata-body-scroll': !(contentData && contentData.length > 0) });
    
    this.renderFixedWidth();

    return (
      <div className={clazz}>
        <div className="abs-table">
          <Table
            {...rest}
            pageSize={contentData.length}
            onScroll={this.onLoadMore}
            columns={columnsData}
            scroll={{ x: scrollX, y: this.renderScrollHeight() }}
            dataSource={contentData}
            locale={{ emptyText: loading ? '数据加载中...' : emptyText}}
            hasMore={hasMore}
            onRow={(record, index) => this.onClickRow(record, index)}
            onChange={onChange}
            rowClassName={(record, index) => this.getRowClassName(record, index)}
            forwardedRef={this.refs}
        />
        </div>
        <div>
        {
          loading ? this.loadMoreContent() : ''
        }
        </div>
      </div>
    );
  }
  renderScrollHeight = () => {
    const scrollDom = document.getElementsByClassName('abs-table')[0] as HTMLElement;
    const scrollHeight = scrollDom ? (scrollDom.clientHeight - 36) : 0;
    return scrollHeight;
  }
  renderFixedWidth = () => {
    const fixedDom = document.getElementsByClassName('ant-table-fixed-left')[0] as HTMLElement;
    const tbodyFirstDom = document.getElementsByClassName('ant-table-fixed-columns-in-body')[0] as HTMLElement;
    if (fixedDom) {
      fixedDom.style.width = tbodyFirstDom ? (tbodyFirstDom.offsetWidth + 'px') : (0 + 'px');
    }
  }

  onClickRow = (record: any, index: number) => {
    const { onRow } = this.props;
    if (onRow) {
      const { onClick } = onRow(record, index);
      return {
        onClick: () => {
          if (onClick) {
            onClick();
          }
          this.setState({
            recordIndex: index,
          });
        },
      };
    }
    return null;
  }

  getRowClassName = (record: any, index: number) => {
    const { selectable } = this.props;
    if (!selectable) { return ''; }
    return shallowEqual(index, this.state.recordIndex) ? 'abs-table-click' : '';
  }

  renderTopContent = () => {
    const { contentData, hasMore } = this.props;
    if (contentData  && contentData.length > 0 && !hasMore) {
      return (
        <div className="top-content" style={{position: 'absolute', bottom: '12px'}}>
          已加载全部
        </div>
      );
    }
    return '';
  }
}

function getData(state: any, model: any) {
  const keys = Object.keys(model);
  const datas = state[model[keys[0]]] || {};
  const contentData = datas.items || [];
  const hasMore = state.hasMore !== undefined ? state.hasMore : datas.hasMore;
  return { datas, contentData, hasMore };
}

function mapStateToProps(state: any, { namespace, model, attribute, effects, hasLoadData, customLoad }: any) {
  const stateOfNamespace = state[namespace];
  const loading = state.loading.effects[effects];
  // customLoad ? stateOfNamespace[customLoad] : 
  
  if (model) {
    const { datas, contentData, hasMore } = getData(stateOfNamespace, model);
    return { datas, contentData, hasMore, loading, attribute, hasLoadData };
  }
  return { datas: {}, contentData: [], hasMore: false, loading: false, attribute, hasLoadData };
}

export default connect(mapStateToProps)(ABSTableInfinity);