/**
 * 筛选 Item
 * @author peng.wu
 */
export default class FilterItemConfig {
  /**
   * Item 标识（id）
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
   * 关联的 Item Keys
   */
  relatedkey: number[] | null;

  /**
   * 是否隐藏该 Item
   */
  hide: boolean;
}