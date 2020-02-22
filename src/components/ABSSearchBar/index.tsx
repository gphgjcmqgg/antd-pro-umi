import React from 'react';
import { connect } from 'dva';
import { Input, AutoComplete } from 'antd';
import ABSIcon from '../ABSIcon';
import SerachHelper, { ISearchResult } from './serachHelper';
import { ABSAntIcon } from '../ABSAntIcon';
import routeConfig from '../../abs/config/routeConfig';
import ABSMessage from '../ABSMessage';
import commonUtils from '../../utils/commonUtils';
import classnames from 'classnames';
import ABSAvatar from '../ABSAvatar';
import './index.less';

const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;

export interface IABSSearchBarProps {
  placeholder?: string;
  value?: string;
  size: 'small' | 'large';
  onSearch?: (keyword: string) => void;
  onKeyDown?: (keyword: string) => void;
  dispatch: any;
  className?: string;
  isSearch?: boolean; // 是否进行搜索，（默认true）
  isKeyDown?: boolean; // 是否触发键盘Enter事件, (默认false)
}

export interface IABSSearchBarState {
  loading: boolean;
  keyword: string;
  isOpen: boolean;
  isSelect: boolean;
  results: Array<ISearchResult>;
}

class ABSSearchBar extends React.Component<IABSSearchBarProps, IABSSearchBarState> {
  time; // 定时器
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      isOpen: false,
      isSelect: false,
      keyword: '',
      results: []
    };
  }

  componentDidMount() {
    document.addEventListener('click', (e: any) => {
      this.clearState();
    });

    const keyword = commonUtils.getParams().keyword;
    if (keyword) {
      this.setState({ keyword });
    }
  }

  clearState = () => {
    this.setState({
      loading: false,
      isOpen: false,
      isSelect: false,
      results: []
    });
  }

  handleKeyDown = (e) => {
    const code = e.charCode || e.keyCode;
    if (code === 13) {
      const { isSelect, keyword } = this.state;
      // 键盘Enter事件时跳转搜索结果页（选中弹窗中的条目和搜索框没有Focus时不触发）
      if (isSelect === false) {
        const { onKeyDown } = this.props;
        if (onKeyDown) {
          clearTimeout(this.time);
          this.setState({ isOpen: false });
          onKeyDown(keyword);
        }
      }
    }
  }

  onFocus = (e) => {
    const { keyword } = this.state;
    const { isSearch } = this.props;

    document.addEventListener('keydown', this.handleKeyDown);
    if (isSearch !== false) {
      this.timeoutSearch(keyword);
    }
  }

  onBlur = (e) => {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  // 搜索值改变时发起搜索
  onSearch = (value) => {
    this.setState({ keyword: value });
    this.timeoutSearch(value);
  }

  // 搜索设置1s间隔，防止频繁发起请求
  timeoutSearch = (value) => {
    clearTimeout(this.time);

    const serachValue = value.trim();
    if (serachValue === '') {
      this.setState({ keyword: '', loading: false, isOpen: false, results: [] });
      return;
    }

    this.time = setTimeout(() => this.searchResult(serachValue), 1000);
  }

  // 发起搜索请求
  searchResult = (serachValue) => {
    let pathname = window.location.pathname;
    const rootPath = process.env.REACT_APP_PUBLISH_PATH;
    if (rootPath) {
      pathname = pathname.replace(rootPath, '');
    }
    const url = pathname + window.location.hash;
    this.setState({ loading: true });

    this.props.dispatch({
      type: 'global/search',
      payload: {
        keyword: serachValue,
        url: url,
      }
    }).then((response) => {
      this.setState({
        loading: false,
      });

      if (!response) {
        return;
      }

      this.setState({
        isOpen: true,
        results: SerachHelper.parseResults(response),
      });
    });
  }

  // 选中时
  onSelect = (value, option) => {
    this.setState({ isSelect: true });
    const { size } = this.props;
    if (size === 'small') {
      window.open(option.key);
    } else {
      location.href = option.key;
    }
  }

  // 跳转搜索结果页面
  onGoMore = () => {
    const { keyword } = this.state;
    if (keyword === '') {
      ABSMessage.warning('请输入要查询的内容！');
      return;
    }
    window.location.href = `${routeConfig.search}?keyword=${keyword}`;
  }

  render() {
    const { size, onSearch, className, placeholder } = this.props;
    const { results, isOpen, loading, keyword } = this.state;
    let basicClassName = 'abs-search ';
    basicClassName += size === 'large' ? 'abs-search-large' : 'abs-search-small';
    const mergeClassName = classnames(basicClassName, className);

    const inputSuffix = loading ? <ABSAntIcon type="loading" />
      : <ABSIcon type="search" onClick={onSearch ? () => onSearch(keyword) : this.onGoMore} />;

    const options = results && results.length > 0 ? results.map(group => (
      <OptGroup
        key={group.title}
        label={group.title}
      >
        {group.children.map(opt => (
          <Option key={opt.url} value={opt.id} title={keyword}>
            {
              opt.avatarUrl ?
              <ABSAvatar size="default" imageUrl={opt.avatarUrl} className="abs-search-expert-avatar"/> : null
            }
            <div style={{float: 'left'}}>
              <div className="abs-select-dropdown-menu-item-title">{opt.title}</div>
              <div className="abs-select-dropdown-menu-item-description">{opt.description}</div>
            </div>
          </Option>
        ))}
      </OptGroup>
    )).concat([
      (
        <Option key={`${routeConfig.search}?keyword=${keyword}`} title={keyword} className="abs-select-dropdown-menu-item-show-more">
          查看更多<ABSIcon type="direction-right" />
        </Option>
      ),
    ]) : [
        (
          <Option disabled={true} key="all" className="abs-select-dropdown-menu-item-no-data">
            没有结果。请尝试简化关键词，例如 “碧桂园 47期”。
          </Option>
        )];

    return (
      <AutoComplete
        className={mergeClassName}
        dropdownClassName="abs-search-dropdown"
        dataSource={options}
        placeholder={placeholder}
        optionLabelProp="title"
        open={isOpen}
        defaultActiveFirstOption={false}
        defaultValue={commonUtils.getParams().keyword}
        onSelect={this.onSelect}
        onSearch={this.onSearch}
      >
        <Input suffix={inputSuffix} onFocus={(e) => this.onFocus(e)} onBlur={(e) => this.onBlur(e)} />
      </AutoComplete>
    );
  }
}

function mapStateToProps(state: any) {
  return { ...state.global, loading: state.loading.effects['global/search'] };
}

export default connect(mapStateToProps)(ABSSearchBar);