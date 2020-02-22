import React from 'react';
import './index.less';
import classNames from 'classnames';
import FilterItemModel from '../view_models/FilterItemModel';

export interface ITagProps {
  index: number;
  onClick: (index: number) => void;
  model: FilterItemModel;
}
 
export interface ITagState {
  
}
 
class Tag extends React.Component<ITagProps, ITagState> {
  onClick = () => {
    const { onClick, index } = this.props;
    onClick(index);
  } 

  render() { 
    const { model } = this.props;
    if (model.hide) { return null; }
    const style = classNames('abs-multi-select', { 'abs-multi-select-selected': model.selected });
    return (
      <div className={style} onClick={this.onClick}>
        {model.value}
      </div>
    );
  }
}
 
export default Tag;