import React from 'react';
import ABSAvatar from '../../ABSAvatar';
import './SearchItem.less';

export interface ISearchItem {
  id: string;
  avatarUrl: string;
  name: string;
  company: string;
}
export interface ISearchItemProps {
  item: ISearchItem;
}

export interface ISearchItemState {}

class SearchItem extends React.Component<ISearchItemProps, ISearchItemState> {
  render() {
    const { item } = this.props;
    return (
      <div className="search-item">
        <ABSAvatar imageUrl={item.avatarUrl} size="default" />

        <div className="search-item-right">
          <p className="search-item-right-name">{item.name}</p>
          <p className="search-item-right-company">{item.company}</p>
        </div>
      </div>
    );
  }
}

export default SearchItem;
