import React from 'react';
import { Form } from 'antd';
import Input from './Input/index';
import SelectItem, { Ioption } from './Select';
import { ABSButton } from '../ABSButton';
import classNames from 'classnames';
import './index.less';
import TextArea from './TextArea/index';
import Search from './Search/index';

export interface ILabeledValue {
  key: string;
  label: React.ReactNode;
}
export interface IControls {
  type: 'input' | 'select' | 'textarea' | 'search';
  label?: string;
  options?: Ioption[];
  id: string;
  required?: boolean;
  validator?: (rule: any, value: any, callback: (msg: string) => any) => any;
  handleChange?: (value: any, form: any) => any;
  placeholder?: string;
  className?: string;
  defaultValue?: string | string[] | ILabeledValue[];
  style?: React.CSSProperties;
  bottomTextClassName?: string;
  maxCount?: number;
  disableTextAreaResize?: boolean;
}

interface IABSForm {
  form: any;
  controls: IControls[];
  onConfirm?: (values: any) => any;
  wrappedComponentRef?: (form: any) => void;
  className?: string;
  labelWidth?: number;
  wrapperWidth?: number;
  disableTextAreaResize?: boolean;
}

class ABSForm extends React.Component<IABSForm, any> {
  static defaultProps = {
    wrapperWidth: 300,
    labelWidth: 78
  };

  buttonMagrinLeft;

  constructor(props: IABSForm) {
    super(props);
    this.state = {
      hasStar: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err && this.props.onConfirm) {
        this.props.onConfirm(values);
      }
    });
  };
  calculateButtonMarginLeft = (hasStar, labelWidth) => {
    if (hasStar) {
      this.buttonMagrinLeft = labelWidth + 11;
    } else {
      this.buttonMagrinLeft = labelWidth;
    }
  };
  renderContent = () => {
    const { controls, form, labelWidth, disableTextAreaResize } = this.props;
    let content;
    if (Array.isArray(controls)) {
      content = controls.map(item => {
        if (item.required && !this.state.hasStar) {
          this.setState({
            hasStar: true
          });
        }
        if (item.type === 'input') {
          return (
            <Input
              form={form}
              label={item.label ? item.label : ''}
              id={item.id}
              required={item.required ? item.required : false}
              validator={item.validator}
              labelWidth={labelWidth!}
              style={item.style}
              placeholder={item.placeholder}
              initialValue={item.defaultValue as string}
              labelClassName={classNames({
                'abs-label-margin-left': !item.required && this.state.hasStar
              })}
            />
          );
        }
        if (item.type === 'select') {
          const handleChange = value => {
            if (item.handleChange) {
              item.handleChange(value, this.props.form);
            }
          };
          return (
            <SelectItem
              form={form}
              label={item.label ? item.label : ''}
              id={item.id}
              required={item.required ? item.required : false}
              handleChange={handleChange}
              options={
                item.options ? item.options : [{ name: '暂无数据', value: -1 }]}
              labelWidth={labelWidth!}
              style={item.style}
              placeHolder={item.placeholder}
              labelClassName={classNames({
                'abs-label-margin-left': !item.required && this.state.hasStar
              })}
            />
          );
        }
        if (item.type === 'textarea') {
          const handleChange = value => {
            if (item.handleChange) {
              item.handleChange(value, this.props.form);
            }
          };
          return (
            <TextArea
              form={form}
              labelClassName={classNames({
                'abs-label-margin-left': !item.required && this.state.hasStar
              })}
              labelWidth={labelWidth!}
              required={item.required!}
              id={item.id}
              label={item.label!}
              onChange={handleChange}
              placeholder={item.placeholder}
              rows={6}
              style={item.style}
              autosize={true}
              className={item.className}
              initialValue={item.defaultValue as string}
              validator={item.validator}
              bottomTextClassName={item.bottomTextClassName}
              disableResize={
                disableTextAreaResize || item.disableTextAreaResize
              }
            />
          );
        }
        if (item.type === 'search') {
          return (
            <Search
              form={form}
              label={item.label ? item.label : ''}
              id={item.id}
              required={item.required ? item.required : false}
              validator={item.validator}
              labelWidth={labelWidth!}
              style={item.style}
              placeholder={item.placeholder}
              initialValue={item.defaultValue as string[]}
              maxCount={item.maxCount}
              labelClassName={classNames({
                'abs-label-margin-left': !item.required && this.state.hasStar
              })}
            />
          );
        }
        return null;
      });
    }
    this.calculateButtonMarginLeft(this.state.hasStar, labelWidth!);
    return content;
  };
  render() {
    const { onConfirm, className } = this.props;
    const clazz = classNames('abs-form', className);
    return (
      <div className={clazz}>
        {onConfirm ? (
          <Form onSubmit={this.handleSubmit} layout="vertical">
            {this.renderContent()}
            <Form.Item wrapperCol={{ span: 19 }}>
              <ABSButton
                htmlType="submit"
                style={{ marginLeft: this.buttonMagrinLeft }}
              >
                确定
              </ABSButton>
            </Form.Item>
          </Form>
        ) : (
          <Form layout="vertical">{this.renderContent()}</Form>
        )}
      </div>
    );
  }
}

const WrappedApp = Form.create({})(ABSForm);

export default WrappedApp;
