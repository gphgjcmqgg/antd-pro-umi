import React from 'react';
import { ABSInput } from '../../../components/ABSInput/index';
import './index.less';

export interface IHeaderSearchProps {
  onPressEnter?: () => void;
}
 
export interface IHeaderSearchState {
  keyword: string;
}
 
class HeaderSearch extends React.Component<IHeaderSearchProps, IHeaderSearchState> {
  constructor(props: any) {
    super(props);
    this.state = {
      keyword: '',
    };
  }

  onChange = (keyword) => {
    this.setState({ keyword: keyword });
  }

  onPressEnter = (keyword) => {
      const { onPressEnter } = this.props;
      if (onPressEnter) {
        onPressEnter();
      }
  }

  extraValue() {
    const { keyword } = this.state;
    return {
      keyword: keyword,
    };
  }

  initDefaultValue() {
    this.setState({ keyword: '' });
  }

  render() { 
    const { keyword } = this.state;
    return (
      <div className="abs-header-search-panel">
        <div className="abs-header-search-panel-description">关键词搜索</div>
        <ABSInput
          className="abs-header-search-panel-content"
          placeholder="搜索产品、证券、机构"
          onChange={this.onChange}
          onPressEnter={this.onPressEnter}
          value={keyword}
        />
      </div>
    );
  }
}
 
export default HeaderSearch;