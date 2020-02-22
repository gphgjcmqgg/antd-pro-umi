import React from 'react';
import './index.less';
import ABSNews, { ABSNewsData } from './ABSNews';

export interface IABSNewsValueListProps {
  list: Array<ABSNewsData>;
}
 
export interface IABSNewsValueListState {
  
}
 
class ABSNewsValueList extends React.Component<IABSNewsValueListProps, IABSNewsValueListState> {
  renderList() {
    const { list } = this.props;
    return list.map((item) => (
      <ABSNews item={item} />
    ));
  }

  render() { 
    return (
        <div className="abs-news-div">
            {this.renderList()}
        </div>
    );
  }
}
 
export default ABSNewsValueList;