import React from 'react';
import { connect } from 'dva';
import './index.less';
import shallowEqual from 'shallowequal';
import ABSListView from './ABSListView';

export interface IABSListProps {
  actionType?: string;
  tableWidth?: string;
  bordered?: boolean; // td边框
  columnsData?: any;
  contentData?: any;
  onChange?: any;
  loading?: boolean;
  payload?: object;
  footer?: any;
  onRow?: (record: any, index: number) => any;
  // 给定一些默认参数
  paginationData?: {
    current?: number;
    defaultCurrent?: number;
    defaultPageSize?: number;
    hideOnSinglePage?: boolean;
    total?: number;
    pageSize?: number;
  };
  showHeader?: boolean;
  dispatch?: any;
  model?: string;
  total?: number;
  current?: number;
  scroll?: any;
  emptyText?: string;
  selectable?: boolean;
  expandedRowRender?: (
    record: any,
    index: number,
    indent: number,
    expanded: boolean
  ) => React.ReactNode;
  removeBorder?: boolean; // table边框
}

interface IListData {
  items?: Array<any>;
  current_page?: number;
  total_items?: number;
}
// const PAGE_SIZE = 10;

interface IABSListState {
  recordIndex: number;
}

class ABSList extends React.Component<IABSListProps, IABSListState> {
  public static defaultProps = {
    current: 1,
    defaultCurrent: 1,
    defaultPageSize: 10,
    hideOnSinglePage: false,
    total: 10,
    pageSize: 5,
    bordered: false,
    selectable: false
  };

  constructor(props: any) {
    super(props);
    this.state = { recordIndex: 0 };
  }

  componentWillReceiveProps(nextProps: any) {
    const { dispatch, actionType, payload } = nextProps;
    if (
      !shallowEqual(this.props.actionType, actionType) ||
      !shallowEqual(this.props.payload, payload)
    ) {
      dispatch({
        type: actionType,
        payload
      });
      // 当请求参数变化的时候 高亮菜单index重置为0
      this.setState({ recordIndex: 0 });
    }
  }

  componentDidMount() {
    const { dispatch, actionType, payload } = this.props;
    if (actionType && actionType.length > 0) {
      dispatch({
        type: actionType,
        payload: {
          ...payload,
          page_index: 1
        }
      });
    }
  }

  dispatchAction() {
    const { dispatch, actionType, payload } = this.props;
    if (actionType && actionType.length > 0) {
      dispatch({
        type: actionType,
        payload: {
          ...payload
        }
      });
    }
  }

  render() {
    const {
      footer,
      showHeader,
      columnsData,
      contentData,
      loading,
      scroll,
      emptyText,
      bordered,
      tableWidth,
      expandedRowRender,
      removeBorder
    } = this.props;
    return (
      <ABSListView
        type="default"
        footer={footer}
        showHeader={showHeader}
        tableWidth={tableWidth ? tableWidth : '100%'}
        bordered={bordered}
        columnsData={columnsData}
        contentData={contentData}
        paginationData={false}
        loading={loading}
        scroll={scroll}
        emptyText={emptyText}
        onRow={(record, index) => this.onClickRow(record, index)}
        rowClassName={(record, index) => this.getRowClassName(record, index)}
        expandedRowRender={expandedRowRender}
        removeBorder={removeBorder}
      />
    );
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
            recordIndex: index
          });
        }
      };
    }
    return null;
  };

  getRowClassName = (record: any, index: number) => {
    const { selectable } = this.props;
    if (!selectable) {
      return '';
    }
    return shallowEqual(index, this.state.recordIndex) ? 'abs-table-click' : '';
  };
}

function getData(state: any, model: any): Array<any> | IListData {
  const modelPropsArray = model.split('.');
  let data = state[modelPropsArray[0]];

  for (const props of modelPropsArray.slice(1)) {
    if (data[props]) {
      data = data[props];
    }
  }

  return data;
}

const mapStateToProps = (state, { model, contentData, actionType }) => {
  if (model && model.length > 0) {
    const data: Array<any> | IListData = getData(state, model);

    // 不带分页的列表
    if (data && Array.isArray(data)) {
      return {
        contentData: data,
        total: data.length,
        current: 1,
        loading: state.loading.effects[actionType]
      };
    } else {
      // 带分页的列表
      const { items, current_page, total_items } = data;
      return {
        contentData: items,
        total: total_items,
        current: current_page,
        loading: state.loading.effects[actionType]
      };
    }
  }

  if (!model && contentData && contentData.length > 0) {
    return { contentData, total: contentData.length, current: 1 };
  }
  return { contentData: [] };
};

export default connect(
  mapStateToProps,
  null,
  null,
  { withRef: true }
)(ABSList);
