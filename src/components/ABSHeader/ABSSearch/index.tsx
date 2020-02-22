import * as React from 'react';
import { connect } from 'dva';
import './index.less';
import ABSSearchBar from '../../ABSSearchBar';
import ABSMessage from '../../ABSMessage';
import routeConfig from '../../../abs/config/routeConfig';

class ABSSearch extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  // 跳转搜索结果页面
  onGoMore = (keyword) => {
    if (keyword === '') {
      ABSMessage.warning('请输入要查询的内容！');
      return;
    }
    window.location.href = `${routeConfig.search}?keyword=${keyword}`;
  }

  render() {
    return (
      <ABSSearchBar
        onKeyDown={this.onGoMore}
        className="abs-header-search"
        size="small"
        placeholder="证券、产品、机构、专家..."
      />
    );
  }
}

function mapStateToProps(state: any) {
  return { ...state.global };
}

export default connect(mapStateToProps)(ABSSearch);