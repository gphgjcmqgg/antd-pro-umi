import FilterModel from './FilterModel';
import _ from 'lodash';
import FilterSectionConfig from '../dto/FilterSectionConfig';
import properties from '../properties';
import FilterResult from '../dto/FilterResult';
import FilterPanelResult from '../dto/FilterPanelResult';

/**
 * 筛选面板组件 `FilterPanel` 的 view model
 * @author peng.wu
 */
export default class FilterPanelModel {
  /**
   * 筛选项
   */
  filters: FilterModel[];

  static from(json: FilterSectionConfig[]): FilterPanelModel | null {
    if (!Array.isArray(json)) { return null; }
    const filters: FilterModel[] = [];
    json.forEach((section) => {
      const filterModel = FilterModel.from(section);
      if (filterModel) { filters.push(filterModel); }
    });
    const model = new FilterPanelModel();
    model.filters = filters;
    return model;
  }

  /**
   * 更新筛选项选中状态
   * @param filterKey 
   * @param itemIndex 
   */
  updateFilters(filterKey: number, itemIndex: number): FilterPanelModel {
    const model: FilterPanelModel = _.cloneDeep(this);
    const { filters } = model;
    if (!Array.isArray(filters)) { return model; }
    for (const filter of filters) {
      if (filter.key !== filterKey) { continue; }
      filter.updateItemsState(itemIndex);
    }
    return model;
  }

  /**
   * 根据关联筛选项更新状态
   */
  updateRelatedFilters(hasRelatedFilter: boolean): FilterPanelModel {
    const that: FilterPanelModel = _.cloneDeep(this);
    that.initialize();
    if (!hasRelatedFilter) { return that; }
    const marketFilter = that.getFilter(properties.MARKET_CATEGORY);
    const productFilter = that.getFilter(properties.PRODUCT_CATEGORY);
    const divideFilter = that.getFilter(properties.PRODUCT_SUBDIVIDE);
    let marketKeys: number[] = [];
    let productKeys: number[] = [];
    
    // 市场分类1级
    if (marketFilter) { 
      // 市场分类选中全部
      if (marketFilter.isPrefixItemSelected) {
        marketFilter.selectPrefixItem();
        if (productFilter) { 
          // 显示所有市场分类2级选项
          productFilter.hideAllItems(false);
          // 取得选中并且没有隐藏得key
          productKeys = productFilter.selectedShowKeys; 
          if (divideFilter) { 
            // 显示全部按钮 显示市场细分关联项目
            divideFilter.showAll();
            divideFilter.hideByRelatedKeys(productKeys); 
          }
        }
        return that;
      }
      // 取得市场分类选择key
      marketKeys = marketFilter.selectedKeys;
    }
    
    // 产品分类2级
    if (productFilter) { 
      productFilter.hideByRelatedKeys(marketKeys);
      // 取得选中并且没有隐藏得key
      productKeys = productFilter.selectedShowKeys; 
      if (divideFilter) { 
        if (productKeys.length === 0) {
          divideFilter.hideAllItems(true);
        } else {
          // 显示全部按钮
          divideFilter.showAll();
          divideFilter.hideByRelatedKeys(productKeys); 
        }
      }
    }
    
    return that;
  }

  /**
   * 获取筛选面板选择结果（统一格式）
   * @param headerValue 
   * @param footerValue 
   */
  getRequestResult(headerValue?: any, footerValue?: any): FilterPanelResult | null {
    const filterResultList = this.getFilterResultList();
    if (!Array.isArray(filterResultList)) { return null; }
    let result = FilterPanelResult.of(filterResultList);
    if (headerValue) { result = { ...result, ...headerValue }; }
    if (footerValue) { result = { ...result, ...footerValue }; }
    return result;
  }

  /**
   * 初始化，如没有选中项，则选中“全部”
   */
  private initialize() {
    const { filters } = this;
    if (!Array.isArray(filters)) { return; }
    for (const filter of filters) {
      if (filter.hasSelectedItem) { continue; }
      filter.selectPrefixItem();
    }
  }

  /**
   * 获取所有 `selected = true` 的 `key`s
   */
  private getFilterResultList() {
    const filters = this.filters;
    if (!Array.isArray(filters)) { return null; }
    const resultList: FilterResult[] = [];
    for (const filter of filters) {
      const result = filter.filterResult;
      if (!result) { continue; }
      resultList.push(result);
    }
    return resultList;
  }

  /**
   * 获取指定 `filterModel` 
   * @param key 
   */
  private getFilter(key: number): FilterModel | null {
    const filters = this.filters;
    if (!Array.isArray(filters)) { return null; }
    for (const filter of filters) {
      const { key: k } = filter;
      if (k === key) { return filter; }
    }
    return null;
  }
}