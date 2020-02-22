import IFilter from '../entities/IFilter';

export default interface IFilterService {
  /** 原始未处理数据 */
  rawData: any;

  /** 原始筛选数据 */
  originalFilters?: IFilter[];

  /**
   * 格式化HTTP请求响应数据
   * @param response HTTP请求响应数据
   */
  format(response: any): IFilter[];

  /**
   * 更新筛选数据
   * @param data 筛选数据
   * @param id IFilter id
   * @param index TagList 选中的索引
   * @param value SelectList 选中的值
   */
  updateState(data: IFilter[], id: number, index: number, value: number): IFilter[];

  /**
   * 获取选中的 Filter
   * @param data 
   */
  getSelectedFilter(data: IFilter[]): IFilter[];

  /**
   * 提交接口数据
   * @param data 
   */
  getSelectedResult(data: IFilter[]): Promise<any>;

  /**
   * 切换全选状态
   * @param data 
   */
  switchAllState?(data: IFilter[], selected: boolean);

  /**
   * 是否有选中的Tag
   * @param data 
   */
  hasSelectedTag?(data: IFilter[]): boolean;
  
  /**
   * 重置filter
   * @param filter 
   */
  reset?(): void;
}