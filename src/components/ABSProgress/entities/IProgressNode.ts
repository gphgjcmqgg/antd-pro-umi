export default interface IProgressNode {
  /**
   * 日期字符串
   */
  date: string;

  /**
   * 时间戳（毫秒）
   */
  time: number;

  /**
   * Tag names
   */
  tagNames: any[];
}