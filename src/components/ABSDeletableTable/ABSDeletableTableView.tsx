import React from 'react';
import ABSListView from '../ABSList/ABSListView';
import ABSIcon from '../ABSIcon';
import ABSDeletableTableDataHelper from './ABSDeletableTableDataHelper';

export interface IABSDeletableTableProps {
  columnsData: any[];
  contentData: any[];
  loading?: boolean;
  onDeleteColumn: (column: any) => void;
}
 
export interface IABSDeletableTableState {
}
 
class ABSDeletableTableView extends React.Component<IABSDeletableTableProps, IABSDeletableTableState> {

  onDeleteColumn(column: any) {
    const { onDeleteColumn } = this.props;
    if (onDeleteColumn) {
      onDeleteColumn(column);
    }
  }

  renderClosableTitle = (column: any) => {
    return (
      <div className="product-compare-title-button">
        <span>{column.title}</span>
        <ABSIcon
          type="close"
          onClick={() => this.onDeleteColumn(column)}
        />
      </div>
    );
  }

  render() {
    const { columnsData, contentData, loading } = this.props;
    const columns = ABSDeletableTableDataHelper.formatColumnsData(columnsData, this.renderClosableTitle);
    return (
      <div className="abs-product-compare">
        <div className="abs-deal">
          <ABSListView
            columnsData={columns}
            contentData={contentData}
            loading={loading}
            bordered={true}
            removeBorder={true}
          />
        </div>
      </div>
    );
  }
}
 
export default ABSDeletableTableView;