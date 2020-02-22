import FilterSelectListType from '../enums/FilterSelectListType';
import FilterItemModel from './FilterItemModel';
import FilterSectionConfig from '../dto/FilterSectionConfig';
import FilterResult from '../dto/FilterResult';
import properties from '../properties';
import IFilterUpdater from '../services/IFilterUpdater';
import FilterUpdaterFactory from '../services/FilterUpdaterFactory';

/**
 * @author peng.wu
 */
export default class FilterModel {
  /**
   * 标识（id）
   */
  key: number;

  /**
   * 所有筛选项
   */
  items: FilterItemModel[];

  /**
   * 标题
   */
  title: string;

  /**
   * 类型
   */
  type: FilterSelectListType;

  /**
   * 关联 key
   */
  relatedkey: number | null;

  /**
   * 是否高级选项 isFold
   */
  isFold: boolean | null;

   /**
    * 是否显示高级选项 showFold
    */
  showFold: boolean | null;

  private stateUpdator: IFilterUpdater | null;

  static from(json: FilterSectionConfig): FilterModel | null {
    if (!json) { return null; }
    const { key, value: items, title, type, relatedkey, isUnlimited, isFold } = json;
    // 设置checkbox选中效果
    const stateUpdater = FilterUpdaterFactory.of(type === 'checkbox' && isUnlimited ? FilterSelectListType.checkboxlimit : type);
    const model = new FilterModel(stateUpdater);
    model.key = key;
    model.title = title;
    model.type = type;
    model.relatedkey = relatedkey;
    model.isFold = isFold;
    
    const filterItems: FilterItemModel[] = [];
    if (type === FilterSelectListType.checkbox) { 
      if (isUnlimited) {
        // 增加不限选项
        filterItems.push(FilterItemModel.prefixItemNoLimit()); 
      } else {
        // 增加全部选项
        filterItems.push(FilterItemModel.prefixItem()); 
      }
    }
    if (Array.isArray(items)) {
      items.forEach(item => {
        const filterItemModel = FilterItemModel.from(item);
        if (filterItemModel) { filterItems.push(filterItemModel); }
      });
    }
    model.items = filterItems;
    return model;
  }

  constructor(stateUpdater: IFilterUpdater | null) {
    this.stateUpdator = stateUpdater;
  }

  /**
   * 是否选中“全部”
   */
  get isPrefixItemSelected(): boolean {
    const { items } = this;
    if (!Array.isArray(items)) { return false; }
    for (const item of items) {
      if (item.isPrefixItemSelected) { return true; }
    }
    return false;
  }

  get isProductCategoryFilter(): boolean {
    return this.key === properties.PRODUCT_CATEGORY;
  }

  get isMarketCategoryFilter(): boolean {
    return this.key === properties.MARKET_CATEGORY;
  }

  get isSelect(): boolean {
    return this.type === FilterSelectListType.select;
  }

  get isRadio(): boolean {
    return this.type === FilterSelectListType.radio;
  }

  get isCheckbox(): boolean {
    return this.type === FilterSelectListType.checkbox;
  }

  get firstItem(): FilterItemModel | null {
    const { items } = this;
    if (!Array.isArray(items) || items.length < 1) { return null; }
    return items[0];
  }

  /**
   * 返回 `selected = true` 的所有 `key`s
   */
  get selectedKeys(): number[] {
    const { items } = this;
    const keys: number[] = [];
    if (!Array.isArray(items)) { return keys; }
    items.forEach(item => {
      if (item && item.selected) { keys.push(item.key); }
    });
    return keys;
  }

  /**
   * 返回 `selected = true and hide = false` 的所有 `key`s
   */
  get selectedShowKeys(): number[] {
    const { items } = this;
    const keys: number[] = [];
    if (!Array.isArray(items)) { return keys; }
    items.forEach(item => {
      if (item && item.selected && !item.hide) { keys.push(item.key); }
    });
    return keys;
  }

  get filterResult(): FilterResult | null {
    const { key: filterKey, items } = this;
    if (!Array.isArray(items)) { return null; }
    const keys: number[] = [];
    for (const item of items) {
      if (item.isInvalidItem) { continue; }
      keys.push(item.key);
    }
    if (keys.length < 1 && this.isSelect) {
      const item = this.firstItem;
      if (item) {
        item.selected = true;
        keys.push(item.key);
      }
    }
    if (keys.length < 1) { return null; }
    return FilterResult.of(filterKey, keys);
  }

  /**
   * 有已选中的 Item
   */
  get hasSelectedItem(): boolean {
    const { items } = this;
    if (!Array.isArray(items)) { return true; }
    for (const item of items) {
      if (item.selected) { return true; }
    }
    return false;
  }

  hideByRelatedKeys(relatedKeys: number[] | null) {
    const items = this.items;
    if (!Array.isArray(relatedKeys) || !Array.isArray(items)) { return; }
    if (relatedKeys.length <= 0) {
      items.forEach(item => item.hide = false);
      return;
    }
    items.forEach(item => item.hideByRelatedKeys(relatedKeys));
  }

  // 显示全部按钮
  showAll() {
    const items = this.items;
    if (Array.isArray(items)) {
      items.forEach(item => {
        if (item.key === 0) {
          item.hide = false;
        } 
      });
    }
  }
  /**
   * 根据 `key` 与 `itemIndex` 更新 `selected`
   * @param key 
   * @param itemIndex 
   */
  updateItemsState(itemIndex: number) {
    if (this.stateUpdator) { this.stateUpdator.update(this, itemIndex); }
  }

  getDefaultValue(): string {
    const { items } = this;
    if (!Array.isArray(items)) { return ''; }
    for (const item of items) {
      const { value, selected } = item;
      if (selected) { return value; }
    }
    const first = this.firstItem;
    if (!first) { return ''; }
    return first.value;
  }

  /**
   * 是否隐藏所有 item
   * @param hide 
   */
  hideAllItems(hide: boolean) {
    const { items } = this;
    if (!Array.isArray(items)) { return; }
    items.forEach(item => item.hide = hide);
  }

  /**
   * 切换至“全部” tag
   */
  selectPrefixItem() {
    const { items } = this;
    if (!Array.isArray(items)) { return; }
    items.forEach(item => {
      if (item.isPrefixItem) {
        item.selected = true;
        return;
      }
      item.selected = false;
    });
  }
}