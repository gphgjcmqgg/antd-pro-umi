import IFilterUpdater from '../IFilterUpdater';
import FilterModel from '../../view_models/FilterModel';

/**
 * @author peng.wu
 */
export default class RadioUpdater implements IFilterUpdater {
  update(model: FilterModel, itemIndex: number) {
    const { items } = model;
    if (!Array.isArray(items)) { return; }
    items.forEach((item, index) => {
      item.selected = index === itemIndex;
    });
  }
}