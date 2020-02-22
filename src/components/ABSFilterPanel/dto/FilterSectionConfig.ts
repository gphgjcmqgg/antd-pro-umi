import FilterItemConfig from './FilterItemConfig';
import FilterSelectListType from '../enums/FilterSelectListType';

/**
 * 筛选 Section
 */
export default class FilterSectionConfig {
  /**
   * Section 标识（id）
   */
  key: number;

  /**
   * Section 选项数据
   */
  value: FilterItemConfig[];

  /**
   * Section 标题
   */
  title: string;

  /**
   * Section 类型
   */
  type: FilterSelectListType;

  /**
   * 关联 Section Key
   */
  relatedkey: number | null;
  
  /**
   * 是否tag 
   */
  isUnlimited: boolean | null;

  /**
   * 是否高级选项
   */
  isFold: boolean | null;
}