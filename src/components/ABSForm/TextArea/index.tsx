import React from 'react';
import { Form } from 'antd';
import classNames from 'classnames';
import ABSNormalInput from '../../ABSNormalInput';

interface ITextAreaProps {
  form: any;
  label: string;
  required?: boolean;
  id: string;
  validator?: (rule: any, value: any, callback: (msg: string) => any) => any;
  labelWidth: number;
  labelClassName: string;
  placeholder?: string;
  style?: React.CSSProperties;
  rows?: number;
  autosize?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  defaultValue?: string;
  initialValue?: string;
  bottomTextClassName?: string;
  disableResize?: boolean;
}

interface ITextAreaState {
  value: string;
}
export default class TextArea extends React.Component<
  ITextAreaProps,
  ITextAreaState
> {
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
      rows,
      autosize,
      className,
      onChange,
      initialValue,
      bottomTextClassName,
      disableResize
    } = this.props;
    const { getFieldDecorator } = form;
    const errorMessage = `请输入${label}`;
    const classes = classNames('internal-message-textarea', className);
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
            onChange={onChange}
            placeholder={placeholder}
            className={classes}
            autosize={autosize}
            rows={rows}
            style={style}
            disabled={false}
            bottomTextClassName={bottomTextClassName}
            showTextAreaBottomText={true}
            disableResize={disableResize}
          />
        )}
      </Form.Item>
    );
  }
}
