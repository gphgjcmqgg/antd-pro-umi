import ISelect from './ISelect';
import IFilter from './IFilter';

/**
 * 单选-选择器-数据配置
 */
export default interface ISelectList extends IFilter {
  /**
   * 选项
   */
  options: ISelect[];

  /**
   * 当前选中的 key（id）
   */
  value: number | null;

  /**
   * 当前选中的值对应字符串
   */
  name: string;

  /**
   * 设置 options
   * @param rawOptions 接口返回的未处理选项
   */
  setOptions(rawOptions: any[]);
} 