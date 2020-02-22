import React from 'react';
import ABSListView from '../ABSList/ABSListView';
import ABSDescriptionContentTitle from '../ABSDescriptionContentTitle';
import { getDefaultColumnsData } from './util';

export interface IABSAPIDescriptionProps {
  columnsData?: any[];
  contentData: any[];
  title: string;
}
 
export interface IABSAPIDescriptionState {
  
}

class ABSAPIDescription extends React.Component<IABSAPIDescriptionProps, IABSAPIDescriptionState> {
  get columnsData() {
    const { columnsData } = this.props;
    if (columnsData) {
      return columnsData;
    }
    return getDefaultColumnsData();
  }

  get contentData() {
    const { contentData } = this.props;
    if (Array.isArray(contentData)) {
      return contentData.map((row, index) => {
        row.key = `${index}`;
        return row;
      });
    }
    return contentData;
  }

  get description() {
    const { title } = this.props;
    return `${title}的api说明`;
  }

  render() { 
    const { contentData } = this.props;
    return (
      <ABSDescriptionContentTitle description={this.description} className="abs-api-description">
        <ABSListView 
          columnsData={this.columnsData}
          contentData={contentData}
          loading={false}
          bordered={true}
        />
      </ABSDescriptionContentTitle>
    );
  }
}
 
export default ABSAPIDescription;