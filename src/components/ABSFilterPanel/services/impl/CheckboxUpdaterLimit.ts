import IFilterUpdater from '../IFilterUpdater';
import FilterModel from '../../view_models/FilterModel';
import properties from '../../properties';
import FilterItemModel from '../../view_models/FilterItemModel';

/**
 * @author peng.wu
 */
export default class CheckboxUpdaterLimit implements IFilterUpdater {
  update(model: FilterModel, itemIndex: number) {
    const { items } = model;
    if (!Array.isArray(items)) { return; }
    if (items.length - 1 < itemIndex) { return; }
    const item = items[itemIndex];
    if (!item) { return; }
    const { key: k2 } = item;
    const prevState = item.selected;
    item.selected = !prevState;

    if (k2 !== properties.SELECT_ALL) {
      let prefixItem: FilterItemModel | null = null;
      let allSelectExceptPrefix = true;
      for (const item1 of items) {
        if (item1.key === properties.SELECT_ALL) {
          prefixItem = item1;
        } else {
          if (!item1.selected && !item1.hide) { allSelectExceptPrefix = false; }
        }
      }
      if (!prefixItem) { return; }
      if (allSelectExceptPrefix) {
        prefixItem.selected = false;
        return;
      }
      if (item.selected) { prefixItem.selected = false; }
      return;
    }

    if (!item.selected) { return; }
    model.selectPrefixItem();
  }
}