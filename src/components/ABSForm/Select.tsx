import React from 'react';
import { Form, Select } from 'antd';
import classNames from 'classnames';
export interface Ioption {
  value: any;
  name: any;
}

interface ISelectProps {
  form: any;
  label: string;
  required?: boolean;
  id: string;
  validator?: (rule: any, value: any, callback: (msg: string) => any) => any;
  handleChange?: (value: any) => void;
  options: Ioption[];
  labelWidth: number;
  labelClassName: string;
  placeHolder?: string;
  style?: React.CSSProperties;
}

export default class SelectItem extends React.Component<ISelectProps, any> {
  renderOptions = () => {
    const { options } = this.props;
    const { Option } = Select;
    let optionArray;
    if (Array.isArray(options)) {
      optionArray = options.map(item => {
        return (
          <Option key={item.value} value={item.value}>
            {item.name}
          </Option>
        );
      });
    } else {
      optionArray = [{ name: '暂无数据', value: -1 }];
    }
    return optionArray;
  };
  render() {
    const {
      form,
      label,
      required,
      id,
      validator,
      handleChange,
      labelWidth,
      style,
      labelClassName,
      placeHolder
    } = this.props;
    const { getFieldDecorator } = form;
    const errorMessage = `请选择${label}`;

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
      >
        {getFieldDecorator(id, {
          rules: [
            { required: required ? required : false, message: errorMessage },
            { ...validator }
          ]
        })(
          <Select
            placeholder={placeHolder ? placeHolder : errorMessage}
            onChange={handleChange}
            style={style}
          >
            {this.renderOptions()}
          </Select>
        )}
      </Form.Item>
    );
  }
}
