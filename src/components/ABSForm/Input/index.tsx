import React from 'react';
import { Form } from 'antd';
import classNames from 'classnames';
import ABSNormalInput from '../../ABSNormalInput';

interface IInputProps {
  form: any;
  label: string;
  required?: boolean;
  id: string;
  validator?: (rule: any, value: any, callback: (msg: string) => any) => any;
  labelWidth: number;
  style?: React.CSSProperties;
  labelClassName: string;
  placeholder?: string;
  initialValue?: string;
}

export default class Input extends React.Component<IInputProps, any> {
  render() {
    const {
      form,
      label,
      required,
      id,
      validator,
      labelWidth,
      labelClassName,
      placeholder,
      style,
      initialValue
    } = this.props;
    const { getFieldDecorator } = form;
    const errorMessage = `请输入${label}`;
    const extraValidator = validator ? { validator } : {};
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
          initialValue,
          rules: [
            { required: required ? required : false, message: errorMessage },
            { ...extraValidator }
          ]
        })(
          <ABSNormalInput
            style={style}
            placeholder={placeholder ? placeholder : errorMessage}
          />
        )}
      </Form.Item>
    );
  }
}
