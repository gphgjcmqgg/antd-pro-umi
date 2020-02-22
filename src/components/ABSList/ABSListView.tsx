import React from 'react';
import { Table } from 'antd';
import './index.less';
import ABSLoading from '../../components/ABSLoading';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';

export interface IABSListProps {
  type?: string;
  tableWidth?: string;
  bordered?: boolean;
  columnsData?: any;
  contentData?: any;
  onChange?: any;
  loading?: boolean;
  showHeader?: boolean;
  footer?: any;
  scroll?: any;
  emptyText?: string;
  onRow?: (record: any, index: number) => any;
  // 给定一些默认参数
  paginationData?:
    | {
        current?: number;
        defaultCurrent?: number;
        defaultPageSize?: number;
        hideOnSinglePage?: boolean;
        total?: number;
        pageSize?: number;
      }
    | false;
  expandedRowKeys?: any[];
  onExpand?: (expanded: any, record: any) => any;
  rowClassName?: (record: any, index: number) => any;
  expandedRowRender?: (
    record: any,
    index: number,
    indent: number,
    expanded: boolean
  ) => React.ReactNode;
  removeBorder?: boolean;
  tableHeight?: string;
  selectable?: boolean;
}

export interface IABSListStates {
  recordIndex: number;
}

export default class ABSListView extends React.Component<IABSListProps, any> {
  public static defaultProps = {
    current: 1,
    defaultCurrent: 1,
    defaultPageSize: 10,
    hideOnSinglePage: false,
    total: 10,
    pageSize: 5,
    emptyText: '暂无数据',
    expandedRowKeys: [],
    selectable: false
  };

  state = {
    recordIndex: -1
  };

  getRowClassName = (record: any, index: number) => {
    const { selectable } = this.props;
    if (!selectable) {
      return '';
    }
    return shallowEqual(index, this.state.recordIndex) ? 'abs-table-click' : '';
  };

  onRowClick = (record: any, index: number) => {
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

  render() {
    const {
      footer,
      showHeader,
      scroll,
      type,
      tableWidth,
      tableHeight,
      bordered,
      columnsData,
      contentData,
      paginationData,
      onChange,
      loading,
      emptyText,
      onRow,
      rowClassName,
      expandedRowRender,
      expandedRowKeys,
      onExpand,
      removeBorder,
      selectable
    } = this.props;
    const tableStyle = {
      width: tableWidth,
      height: tableHeight ? tableHeight : 'auto'
    };

    // 判断是否有传递 来决定是否显示页数选择器
    const pagination = paginationData ? paginationData : false;
    const classes = classNames('abs-table', {
      [`abs-table-${type}`]: type,
      'abs-table-no-wrapper-border': removeBorder
    });

    let extraProps = {};
    if (expandedRowKeys && expandedRowKeys.length > 0) {
      extraProps = { expandedRowKeys: expandedRowKeys };
    }

    return (
      <div className={classes} style={tableStyle}>
        <Table
          showHeader={showHeader}
          footer={footer}
          bordered={bordered}
          columns={columnsData}
          dataSource={contentData}
          pagination={pagination}
          onChange={onChange}
          scroll={scroll}
          loading={{
            indicator: <ABSLoading color="blue" />,
            spinning: loading
          }}
          locale={{ emptyText }}
          onRow={!selectable ? onRow : this.onRowClick}
          onExpand={onExpand}
          rowClassName={rowClassName}
          expandedRowRender={expandedRowRender}
          {...extraProps}
        />
      </div>
    );
  }
}
