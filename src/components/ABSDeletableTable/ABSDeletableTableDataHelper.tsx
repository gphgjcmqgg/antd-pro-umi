import React from 'react';
import { generateRandomKey } from '../../abs/views/absui/ABSProductCompare/util';

export interface IABSDeletableTableDataHelperProps {
  
}
 
export interface IABSDeletableTableDataHelperState {
  
}
 
class ABSDeletableTableDataHelper extends React.Component<IABSDeletableTableDataHelperProps, IABSDeletableTableDataHelperState> {
  static formatColumnsData(columnsData: any[], renderTitle: (column: any) => React.ReactNode) {
    if (Array.isArray(columnsData)) {
      return columnsData.map((column) => {
        if (!column.isFixed) {
          column.title = renderTitle(column);
        }
        return column;
      });
    }
    return [];
  }

  static formatTableDataSource(item: any, columnsData: any[], contentData: any[]) {
    const key: string = generateRandomKey(5);
    columnsData.push({
      title: item.title,
      dataIndex: key,
      key: key,
      width: 200,
    });

    contentData = contentData.map((row, index) => {
      const value = `随机内容key：${key}`;
      row[key] = value;
      return row;
    });
    return { columnsData, contentData };
  }
}
 
export default ABSDeletableTableDataHelper;