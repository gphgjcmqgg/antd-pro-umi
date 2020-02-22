export default interface IFilter {
  /** filter 标识 */
  id: number;

  /** 标题 */
  title: string;

  /** 关联 filter key（id） */
  relatedkey: number;
}