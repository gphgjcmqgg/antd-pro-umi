import ITagList from '../ITagList';
import ITag from '../ITag';
import _ from 'lodash';
import DefaultTag from './DefaultTag';

export default class DefaultTagList implements ITagList {
  id: number;

  title: string;

  tags: ITag[];

  relatedkey: number;

  constructor(id: number, title: string, tags: ITag[]) {
    this.id = id;
    this.title = title;
    this.tags = tags;
  }

  /**
   * 是否有选中的 Tag
   */
  hasSelectedTag(): boolean {
    for (const tag of this.tags) {
      const { selected } = tag;
      if (selected) { return true; }
    }
    return false;
  }

  /**
   * 更新 Tag selected 状态
   * @param handler 
   */
  updateTagState(handler: (tag: ITag, index: number) => ITag): ITagList {
    this.tags = this.tags.map(handler);
    return _.cloneDeep(this);
  }

  /**
   * 设置 Tags value
   * @param rawTags 
   */
  setTags(rawTags: any[]) {
    if (!Array.isArray(rawTags)) { return; }
    const tags: ITag[] = [];
    rawTags.forEach(item => {
      const {
        key: id,
        selected,
        value: content,
        relatedkey: relatedkeys,
      } = item;
      const tag = new DefaultTag(id, content, selected);
      tag.relatedkeys = relatedkeys;
      tags.push(tag);
    });
    this.tags = tags;
  }

  /**
   * 获取处于选中状态的所有`Tag`的`id`列表
   */
  getAllSelectedTagId(): number[] {
    if (!Array.isArray(this.tags)) { return []; }

    const idList: number[] = [];
    this.tags.forEach(tag => {
      const { id, selected } = tag;
      if (selected) { idList.push(id); }
    });
    return idList;
  }
}