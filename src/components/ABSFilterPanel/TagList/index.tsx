import React from 'react';
import Label from '../Label';
import Tag from '../Tag';
import './index.less';
import properties from '../properties';
import FilterModel from '../view_models/FilterModel';

export interface ITagListProps {
  onClick: (model: FilterModel, index: number) => void;
  model: FilterModel;
}

export interface ITagListState {

}

/**
 * @author peng.wu
 */
class TagList extends React.Component<ITagListProps, ITagListState> {
  onClick = (itemIndex: number) => {
    const { onClick, model } = this.props;
    onClick(model, itemIndex);
  }

  render() {
    const { model } = this.props;
    let extraClass = model.isFold && !model.showFold ? 'hide-tag-list' : '';
    if (model.key === properties.PRODUCT_SUBDIVIDE) {
      if (model.items && Array.isArray(model.items)) {
        let hideLength = 0;
        model.items.map((item, index) => {
          if (item.key !== 0 && item.hide === true) {
            hideLength++;
          }
        });
        if (hideLength === model.items.length - 1) {
          extraClass = 'hide-tag-list';
        } else {
          extraClass = '';
        }
      }
    }
      
    return (
      <div className={`abs-filter-multi-select-list ${extraClass}`}>
        <Label title={model.title} />
        <div className="abs-filter-multi-select-list-item">
          {this.renderCheckboxItems()}
        </div>
      </div>
    );
  }

  renderCheckboxItems() {
    const { model: filterModel } = this.props;
    const items = filterModel.items;
    if (!Array.isArray(items)) { return null; }
    return items.map((model, index) => {
      return (
        <Tag
          key={index}
          onClick={this.onClick}
          index={index}
          model={model}
        />
      );
    });
  }
}

export default TagList;