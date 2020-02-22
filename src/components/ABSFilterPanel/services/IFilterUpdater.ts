import FilterModel from '../view_models/FilterModel';

/**
 * @author peng.wu
 */
export default interface IFilterUpdater {
  update(model: FilterModel, itemIndex: number);
}