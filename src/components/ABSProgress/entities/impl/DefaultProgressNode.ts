import IProgressNode from '../IProgressNode';

/**
 * The default implementation of the interface of `IProgressNode`
 */
export default class DefaultProgressNode implements IProgressNode {
  /**
   * 日期字符串
   */
  date: string;  
  
  /**
   * 时间戳（毫秒）
   */
  time: number;

  /**
   * tag names
   */
  tagNames: any[];

  constructor(date: string, time: number, names: any[]) {
    this.date = date;
    this.time = time;
    this.tagNames = names;
  }
}