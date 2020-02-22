import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import ABSLoading from '../ABSLoading';
import './index.less';
import classNames from 'classnames';

export interface IABSInfiniteScrollProps {
  hasMore?: boolean;
  onLoadMore: () => void;
  className?: string;
  getScrollParent?: any;
}
 
export interface IABSInfiniteScrollState {
  
}
 
class ABSInfiniteScroll extends React.Component<IABSInfiniteScrollProps, IABSInfiniteScrollState> {
  renderLoader() {
    return (
      <div className="abs-infinite-scroll-loading">
        <ABSLoading color="blue" size="small" />
        <span>正在加载</span>
      </div>
    );
  }

  render() { 
    const { onLoadMore, hasMore, children, className, getScrollParent } = this.props;
    const classs = classNames('abs-infinite-scroll', className);
    return ( 
      <InfiniteScroll
        pageStart={0}
        loadMore={onLoadMore}
        hasMore={hasMore}
        loader={hasMore ? this.renderLoader() : ''}
        useWindow={false}
        className={classs}
        getScrollParent={() => getScrollParent}
      >
        {children}
        {/* <div>{this.state.isShowGoTop ? this.renderTopContent() : ''}</div> */}
      </InfiniteScroll>
     );
  }
}
 
export default ABSInfiniteScroll;