import React from 'react';
import './NotFound.less';

export interface ISearchExpertNotFoundProps {}

export interface ISearchExpertNotFoundState {}

class SearchExpertNotFound extends React.Component<
  ISearchExpertNotFoundProps,
  ISearchExpertNotFoundState
> {
  render() {
    return (
      <div className="search-expert-not-found">
        <p className="search-expert-not-found-content">找不到相关的人员信息</p>
      </div>
    );
  }
}

export default SearchExpertNotFound;
