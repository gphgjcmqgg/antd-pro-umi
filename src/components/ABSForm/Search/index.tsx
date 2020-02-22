import React from 'react';
import { Form } from 'antd';
import classNames from 'classnames';
// import data from './data';
import ABSExpertSearch from '../../ABSExpertSearch';
import debounce from 'lodash/debounce';
import './index.less';
import { connect } from 'dva';
import { ISearchItem } from './SearchItem';
import _ from 'lodash';

interface IInputProps {
  form: any;
  label: string;
  required?: boolean;
  id: string;
  validator?: (rule: any, value: any, callback: (msg: string) => any) => any;
  labelWidth: number;
  labelClassName: string;
  placeholder?: string;
  style?: React.CSSProperties;
  initialValue?: string[];
  dispatch?: any;
  expertSearchList?: any[];
  expertSearchLoading?: boolean;
  maxCount?: number;
}

interface IInputState {}

const mapStateToProps = ({ account, loading }) => {
  return {
    expertSearchList: account.expertSearchList,
    expertSearchLoading: loading.effects['account/getSearchUserList']
  };
};

@connect(mapStateToProps)
export default class SearchForm extends React.Component<
  IInputProps,
  IInputState
> {
  constructor(props: IInputProps) {
    super(props);
    this.onSearch = debounce(this.onSearch, 500);
  }

  onChange = (value: any) => {
    // console.log('value: ', value);
  };

  onSearch = value => {
    const { dispatch } = this.props;
    if (!value) {
      return;
    }
    dispatch({
      type: 'account/getSearchUserList',
      payload: { name: value }
    });
  };

  searchValidator = (rule: any, value: any, callback: any) => {
    const maxCount = _.get(this.props, 'maxCount', 1);
    if (Array.isArray(value)) {
      if (value.length > maxCount) {
        callback(`只能选择${maxCount}个收件人`);
      } else if (value.length === maxCount) {
        callback();
      } else {
        callback();
      }
    } else {
      callback();
    }
  };

  render() {
    const {
      form,
      label,
      required,
      id,
      // validator,
      labelWidth,
      style,
      labelClassName,
      initialValue,
      expertSearchList,
      expertSearchLoading
      // placeholder
    } = this.props;
    const { getFieldDecorator } = form;
    const errorMessage = `请输入${label}`;

    return (
      <Form.Item
        label={
          <span
            className={classNames(labelClassName)}
            style={{ width: labelWidth }}
          >
            {label}
          </span>
        }
        colon={false}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        className="search-item-form"
      >
        {getFieldDecorator(id, {
          initialValue,
          rules: [
            {
              required: required ? required : false,
              message: errorMessage
            },
            { validator: this.searchValidator }
          ]
        })(
          <ABSExpertSearch
            mode="multiple"
            style={style}
            onChange={this.onChange}
            onSearch={this.onSearch}
            filterOption={false}
            loading={expertSearchLoading}
            items={expertSearchList as ISearchItem[]}
          />
        )}
      </Form.Item>
    );
  }
}
