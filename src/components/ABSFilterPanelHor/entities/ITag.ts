export default interface ITag {
  id: number;

  content: string;

  /** 是否选中 */
  selected: boolean;

  relatedkeys?: number[];
}