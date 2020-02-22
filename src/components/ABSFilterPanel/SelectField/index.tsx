import React from 'react';
import Label from '../Label';
import { Select } from 'antd';
import './index.less';
import FilterModel from '../view_models/FilterModel';
import FilterItemModel from '../view_models/FilterItemModel';

const Option = Select.Option;

export interface ISelectOption {
  key: number;
  value: string;
  selected: boolean;
}

export interface ISelectFieldProps {
  onClick: (model: FilterModel, index: number) => void;
  model: FilterModel;
}

export interface ISelectFieldState {
  selectValue: string;
  isShow: string;
}

/**
 * 下拉单选
 * @author peng.wu
 */
class SelectField extends React.PureComponent<ISelectFieldProps, ISelectFieldState> {
  constructor(props: ISelectFieldProps) {
    super(props);
    const { model } = props;
    let selectValue = '';
    let isShow = '';
    if (model) { 
      selectValue = model.getDefaultValue(); 
      isShow = model.isFold && !model.showFold ? 'none' : 'block';
    }
    
    this.state = {
      selectValue,
      isShow,
    };
  }

  componentWillReceiveProps(nextProps: ISelectFieldProps) {
    const { model } = nextProps;
    if (!model) { return; }
    const isShow = model.isFold && !model.showFold ? 'none' : 'block';
    this.setState({ isShow: isShow });
    const { selectValue } = this.state;
    const value = model.getDefaultValue();
    if (value !== selectValue) {
      this.setState({ selectValue: value });
    }
  }

  render() {
    const { model } = this.props;
    const { selectValue, isShow } = this.state;
    const items = model.items;
    
    return (
      <div className="abs-filter-auto-complete" style={{ display : isShow}}>
        <Label title={model.title} />
        <Select
          className="abs-filter-auto-complete-select"
          showSearch={true}
          optionFilterProp="children"
          filterOption={this.filterOption}
          onSelect={this.onSelect}
          dropdownClassName="abs-select-field-dropdown"
          value={selectValue}
        >
          {this.renderOptions(items)}
        </Select>
      </div>
    );
  }

  renderOptions(items: FilterItemModel[]) {
    if (!Array.isArray(items)) { return null; }
    return items.map((item, index) => {
      return <Option key={`${index}`} value={index}>{item.value}</Option>;
    });
  }

  private filterOption = (input, option) => {
    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  }

  private onSelect = (value: any) => {
    this.setState({ selectValue: value });
    const { onClick, model } = this.props;
    onClick(model, value);
  }
}

export default SelectField;