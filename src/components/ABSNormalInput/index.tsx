import React from 'react';
import { Input } from 'antd';
import './index.less';
import classNames from 'classnames';
import { ABSAntIcon } from '../../components/ABSAntIcon';
import BottomHint from '../ABSForm/TextArea/BottomHint';

export declare type inputSize = 'large' | 'default' | 'small';

export interface IABSNormalInputProps {
  style?: React.CSSProperties;
  className?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  id?: string;
  type?: string;
  size?: inputSize;
  disabled?: boolean;
  readOnly?: boolean;
  autosize?: any;
  prefix?: string | React.ReactNode;
  onChange?: (value: string) => void;
  onPressEnter?: (value: string) => void;
  onGetValue?: (value: string) => void | string;
  onBlur?: (value: string) => void;
  onFocus?: (value: string) => void;
  issuffix?: boolean;
  addonAfter?: string | React.ReactNode;
  addonBefore?: string | React.ReactNode;
  deletBtn?: (value: any) => void;
  icon?: any;
  regular?: any;
  getvalue?: any;
  inputType?: any;
  errortext?: string;
  emptyClassName?: string;
  rows?: number;
  maxLength?: number;
  bottomTextClassName?: string;
  showTextAreaBottomText?: boolean;
  disableResize?: boolean;
}

interface IABSNormalInputState {
  emptyClassName: string;
  value: string;
}

export default class ABSNormalInput extends React.Component<
  IABSNormalInputProps,
  IABSNormalInputState
> {
  public static defaultProps = {
    issuffix: false,
    showTextAreaBottomText: false,
    disableResize: false
  };

  constructor(props: any) {
    super(props);
    this.state = {
      emptyClassName: '',
      value: props.value ? props.value : ''
    };
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
    if (nextProps.emptyClassName !== this.props.emptyClassName) {
      this.setState({ emptyClassName: nextProps.emptyClassName });
    }
  }

  icon(value: any, regular: any) {
    const { deletBtn } = this.props;
    if (!value) {
      return null;
    }
    if (value && regular.test(value)) {
      return (
        <ABSAntIcon
          type={'check-circle'}
          onClick={deletBtn}
          style={{ color: 'green' }}
          theme="filled"
        />
      );
    }
    return (
      <ABSAntIcon
        type={'close-circle'}
        onClick={deletBtn}
        style={{ color: '#979797' }}
      />
    );
  }

  iconButton = () => {
    const { issuffix, deletBtn, getvalue, inputType, regular } = this.props;
    if (!issuffix || JSON.stringify(getvalue) === '{}' || !getvalue) {
      return null;
    }
    switch (inputType) {
      case 'mobile':
        return this.icon(getvalue.mobile, regular);
      case 'email':
        return this.icon(getvalue.email, regular);
      case 'form':
        return this.icon(getvalue.form, regular);
      default: {
        return (
          <ABSAntIcon
            type="close-circle"
            onClick={deletBtn}
            style={{ color: '#979797' }}
          />
        );
      }
    }
  };

  renderBottomHint() {
    const { showTextAreaBottomText, bottomTextClassName } = this.props;
    const { value } = this.state;
    if (showTextAreaBottomText) {
      return <BottomHint value={value} className={bottomTextClassName} />;
    }
    return null;
  }

  render() {
    const {
      placeholder,
      type,
      disabled,
      readOnly,
      defaultValue,
      id,
      size,
      prefix,
      className,
      addonAfter,
      addonBefore,
      style,
      autosize,
      rows,
      disableResize,
      showTextAreaBottomText
    } = this.props;
    const { emptyClassName, value } = this.state;

    const inputStyle = classNames('abs-normal-input', className);
    const emptyStyle = emptyClassName
      ? classNames('abs-input-empty', emptyClassName)
      : '';
    const suffix = this.iconButton();
    const classes = classNames('abs-native-scrollbar', 'abs-textarea', {
      'textarea-resize-disabled': disableResize,
      'textarea-padding-bottom': showTextAreaBottomText
    });
    const valueOption = value != null ? { value } : {};
    if (autosize) {
      return (
        <div className={inputStyle}>
          <Input.TextArea
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            defaultValue={defaultValue}
            id={id}
            onChange={this.onChange}
            style={style}
            rows={rows}
            className={classes}
            {...valueOption}
          />
          {this.renderBottomHint()}
        </div>
      );
    }
    return (
      <div className={inputStyle} style={style}>
        <Input
          prefix={prefix}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          readOnly={readOnly}
          defaultValue={defaultValue}
          id={id}
          size={size}
          onChange={this.onChange}
          onPressEnter={this.onPressEnter}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          suffix={suffix}
          addonBefore={addonBefore}
          addonAfter={addonAfter}
          className={emptyStyle}
          style={style}
          {...valueOption}
          autoComplete="off"
        />
      </div>
    );
  }

  onChange = (e: any) => {
    const { onChange } = this.props;

    this.setState({ value: e.target.value });

    if (onChange) {
      onChange(e.target.value);
      return;
    }
  };

  onPressEnter = (e: any) => {
    const { onPressEnter } = this.props;
    if (onPressEnter) {
      onPressEnter(e.target.value);
      return;
    }
  };

  onBlur = (e: any) => {
    const { onGetValue, onBlur } = this.props;
    if (onGetValue) {
      const flag = onGetValue(e.target.value);
      if (typeof flag === 'undefined') {
        return;
      }
      this.setState({ emptyClassName: flag });
    }
    if (onBlur) {
      onBlur(e.target.value);
    }
  };

  onFocus = (e: any) => {
    const { onFocus } = this.props;
    if (onFocus) {
      onFocus(e.target.value);
    }
  };
}
