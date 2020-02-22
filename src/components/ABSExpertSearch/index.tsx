import React, { ReactElement } from 'react';
import { Select } from 'antd';
import classNames from 'classnames';
import './index.less';
import SearchItem, { ISearchItem } from '../ABSForm/Search/SearchItem';
import ABSMessage from '../ABSMessage';
import ABSLoading from '../ABSLoading';
import SearchExpertNotFound from '../ABSForm/Search/NotFound';

const Option = Select.Option;

export interface IABSSearchProps {
  notFoundContent?: React.ReactNode | null;
  style?: React.CSSProperties;
  className?: string;
  onSearch?: (value: string) => void;
  mode?: string;
  items: ISearchItem[];
  value?: string[];
  onChange?: ({ value, option }: { value: any; option: any }) => void;
  onSelect?: (value: string[], option: ReactElement<any>) => void;
  dropdownClassName?: string;
  filterOption?: boolean;
  maxCount?: number;
  placeholder?: string;
  loading?: boolean;
}

export interface IABSSearchState {}

class ABSExpertSearch extends React.Component<
  IABSSearchProps,
  IABSSearchState
> {
  renderOptions(item: ISearchItem) {
    return (
      <Option key={item.id} value={item.id}>
        <SearchItem item={item as ISearchItem} key={item.id} />
      </Option>
    );
  }

  renderSelectOptions() {
    const { items } = this.props;
    return items.map(item => this.renderOptions(item));
  }

  onChange = (value: any) => {
    const { onChange, maxCount } = this.props;
    if (maxCount && value && Array.isArray(value) && value.length > maxCount) {
      ABSMessage.error(`只能选择${maxCount}位用户`);
      return;
    }
    if (onChange) {
      onChange(value);
      return;
    }
  };

  renderNotFoundContent() {
    const { notFoundContent, loading } = this.props;
    if (notFoundContent) {
      return notFoundContent;
    }
    if (loading) {
      return (
        <div className="search-expert-loading">
          <ABSLoading size="small" />
        </div>
      );
    } else {
      return <SearchExpertNotFound />;
    }
  }

  render() {
    const {
      style,
      className,
      onSearch,
      onSelect,
      mode,
      value,
      filterOption,
      dropdownClassName,
      placeholder
    } = this.props;
    const classes = classNames('internal-message-search', className);
    const dropdownClasses = classNames(
      'expert-search-dropdown',
      dropdownClassName
    );
    return (
      <Select
        mode={mode}
        className={classes}
        style={style}
        onChange={this.onChange}
        onSearch={onSearch}
        onSelect={onSelect}
        notFoundContent={this.renderNotFoundContent()}
        value={value}
        dropdownClassName={dropdownClasses}
        filterOption={filterOption}
        placeholder={placeholder}
        labelInValue={true}
      >
        {this.renderSelectOptions()}
      </Select>
    );
  }
}

export default ABSExpertSearch;
