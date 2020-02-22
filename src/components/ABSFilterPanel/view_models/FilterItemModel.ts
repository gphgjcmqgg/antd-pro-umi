import FilterItemConfig from '../dto/FilterItemConfig';
import properties from '../properties';

/**
 * 筛选项组件 view model
 * @author peng.wu
 */
export default class FilterItemModel {
  /**
   * 标识（id）
   */
  key: number;

  /**
   * 文本描述
   */
  value: string;

  /**
   * 是否选中
   */
  selected: boolean;

  /**
   * 关联筛选项 Keys
   */
  relatedkey: number[] | null;

  /**
   * 是否隐藏该筛选项
   */
  hide: boolean;

  static of(key: number, value: string): FilterItemModel {
    const model = new FilterItemModel();
    model.key = key;
    model.value = value;
    return model;
  }

  static from(json: FilterItemConfig): FilterItemModel | null {
    if (!json) { return null; }
    const { key, value, selected, relatedkey, hide } = json;
    const model = new FilterItemModel();
    model.key = key;
    model.value = value;
    model.selected = selected;
    model.relatedkey = relatedkey;
    model.hide = hide;
    return model;
  }

  /**
   * “全部” item
   */
  static prefixItem(): FilterItemModel {
    const item = FilterItemModel.of(properties.SELECT_ALL, '全部');
    item.selected = false;
    item.hide = false;
    item.relatedkey = null;
    return item;
  }

  /**
   * “全部” item
   */
  static prefixItemNoLimit(): FilterItemModel {
    const item = FilterItemModel.of(properties.SELECT_ALL, '不限');
    item.selected = false;
    item.hide = false;
    item.relatedkey = null;
    return item;
  }

  hideByRelatedKeys(otherKeys: number[] | null) {
    const relateKeys = this.relatedkey;
    if (!Array.isArray(relateKeys) || !Array.isArray(otherKeys)) { return; }

    let hide = true;
    for (const ok of otherKeys) {
      for (const rk of relateKeys) {
        if (rk === ok) {
          hide = false;
          break;
        }
      }
      if (!hide) { break; }
    }
    this.hide = hide;
  }

  get isPrefixItem(): boolean {
    return this.key === properties.SELECT_ALL;
  }

  get isPrefixItemSelected(): boolean {
    return this.key === properties.SELECT_ALL && this.selected;
  }

  get isInvalidItem(): boolean {
    return !this.selected || this.hide;
  }
}