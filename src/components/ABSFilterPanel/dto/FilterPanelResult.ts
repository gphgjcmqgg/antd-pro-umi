import FilterResult from './FilterResult';

/**
 * @author peng.wu
 */
export default class FilterPanelResult {
  // tslint:disable-next-line:variable-name
  filter_query_list: FilterResult[];

  static of(list: FilterResult[]) {
    const result = new FilterPanelResult();
    result.filter_query_list = list;
    return result;
  }
}