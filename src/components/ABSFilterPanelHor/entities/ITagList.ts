import ITag from './ITag';
import IFilter from './IFilter';

export default interface ITagList extends IFilter {
  tags: ITag[];

  /** 
   * 是否有选中的`Tag`
   */
  hasSelectedTag(): boolean;

  /**
   * 更新`TagList `
   * @param tagList 
   * @param index 
   */
  updateTagState(handler: (tag: ITag, index: number) => ITag): ITagList;

  /**
   * 设置`Tag`s value
   * @param rawTags 
   */
  setTags(rawTags: any[]);

  /**
   * 获取处于选中状态的所有`Tag`的`id`列表
   */
  getAllSelectedTagId(): number[];
}