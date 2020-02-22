import React from 'react';
import { Select  } from 'antd';
import './index.less';
const Option = Select.Option;
import ISelectOption from './utils/ISelectOption';

export declare type selectSize = 'default' | 'large' | 'small';

export interface IABSSelectProps {
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  defaultValue?: string | number;
  value?: string | number | string[];
  size?: selectSize;
  onChange?: (value: any, option: any) => void;
  onSelect?: (value: any, option: React.ReactElement<any>) => any;
  onSearch?: (value: string) => any;
  onFocus?: () => void;
  onBlur?: () => void;
  dropdownMatchSelectWidth?: boolean;
  dropdownClassName?: string;
  optionData?: ISelectOption[];
  mode?: 'multiple' | 'tags';
  notFoundContent?: string;
}

export class ABSSelect extends React.Component<IABSSelectProps, any> {
  select;
  
  onChange = (value: any, option: any) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value, option);
    }
    this.select.blur();
  }

  IsShowOptionData() {
    const { 
      size, 
      placeholder, 
      className, 
      disabled, 
      onSelect, 
      onSearch, 
      onFocus, 
      onBlur,
      dropdownMatchSelectWidth, 
      dropdownClassName, 
      optionData,
      defaultValue,
      mode,
      notFoundContent,
    } = this.props;
    const optionDatas = optionData ? optionData : [];
    return (
      <div className="abs-select">
        <Select
          defaultValue={defaultValue}
          className={className} 
          size={size} 
          placeholder={placeholder} 
          disabled={disabled}
          onSelect={onSelect} 
          onSearch={onSearch} 
          onFocus={onFocus} 
          onChange={this.onChange} 
          onBlur={onBlur}
          dropdownMatchSelectWidth={dropdownMatchSelectWidth} 
          dropdownClassName={dropdownClassName}
          mode={mode}
          ref={view => this.select = view}
          notFoundContent={notFoundContent ? notFoundContent : '无数据'}
          {...this.props}
        >
          {
            optionDatas.map((item, index) => {
              return (
                <Option 
                  key={`${item.value}${index}`} 
                  title={item.title} 
                  value={item.value}
                  disabled={item.disabled}
                >
                  {item.labelName}
                </Option>
              );
            })
          }
        </Select>
      </div>
    );
  }

  render() { 
    return (
      this.IsShowOptionData()
    );
  }
}
