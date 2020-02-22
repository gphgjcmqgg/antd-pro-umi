import React from 'react';
import './index.less';
import Title from '../../abs/views/account/Resume/components/Title';
import { ABSSelect } from '../ABSSelect';

export interface ISelectFieldProps {
  title?: string;
  placeholder?: string;
  defaultValue?: any;
  selectOptions: any[];
  className?: string;
  required?: boolean;
  onChange?: (value: any) => void;
  textClassName?: string;
}

export interface ISelectFieldState {
  value: string;
}

class ABSSelectField extends React.Component<ISelectFieldProps, ISelectFieldState> {
  constructor(props: ISelectFieldProps) {
    super(props);
    const { defaultValue } = props;
    const value = defaultValue === undefined || defaultValue === null ? '' : defaultValue;
    this.state = {
      value,
    };
  }

  componentWillReceiveProps(nextProps: ISelectFieldProps) {
    const { defaultValue } = nextProps;
    const { value } = this.state;
    const v = defaultValue === undefined || defaultValue === null ? '' : defaultValue;
    if (defaultValue !== value) { this.setState({ value: v }); }
  }

  selectChange = (value) => {
    const { onChange } = this.props;

    this.setState({ value });
    if (onChange) {
      onChange(value);
    }
  }

  /**
   * 重置选择器
   */
  public reset(value: string) {
    this.setState({ value });
  }

  selectSelect = () => {
    // 被选中时调用
  }

  selectSearch = () => {
    // 文本框值变化时回调
  }

  selectFocus = () => {
    // 获得焦点时回调
  }

  selectBlur = () => {
    // 失去焦点的时回调 
  }

  getValue() {
    return this.state.value;
  }

  getIntValue() {
    const intValue = parseInt(this.state.value, 10);
    if (isNaN(intValue)) { return 0; }
    return intValue;
  }

  getLabelName(): string {
    const { selectOptions } = this.props;
    const { value } = this.state;
    if (!Array.isArray(selectOptions) || selectOptions.length <= 0) { return ''; }
    for (const option of selectOptions) {
      if (!option) { continue; }
      const { value: sValue, labelName } = option;
      if (value === sValue) {
        return labelName;
      }
    }
    return '';
  }

  renderTitle() {
    const { title, required, textClassName } = this.props;
    if (title) {
      return (
        <Title
          className="select-field-title"
          required={required}
          textClassName={textClassName}
        >
          {title}
        </Title>
      );
    }
    return null;
  }

  render() {
    const {
      placeholder,
      selectOptions,
      className,
    } = this.props;
    const { value } = this.state;
    return (
      <div className={`select-field ${className}`}>
        {this.renderTitle()}
        <ABSSelect
          placeholder={placeholder}
          className=""
          disabled={false}
          size="default"
          onChange={this.selectChange}
          onSelect={this.selectSelect}
          onSearch={this.selectSearch}
          onFocus={this.selectFocus}
          onBlur={this.selectBlur}
          dropdownMatchSelectWidth={true}
          dropdownClassName=""
          optionData={selectOptions}
          value={value}
        />
      </div>
    );
  }
}

export default ABSSelectField;