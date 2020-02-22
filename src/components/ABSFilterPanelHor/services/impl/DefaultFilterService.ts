import IFilterService from '../IFilterService';
import IFilter from '../../entities/IFilter';
import DefaultTagList from '../../entities/impl/DefaultTagList';
import DefaultSelectList from '../../entities/impl/DefaultSelectList';
import ITagList from '../../entities/ITagList';
import ISelectList from '../../entities/ISelectList';
import FilterType from '../../enums/FilterType';
import ITag from '../../entities/ITag';
import _ from 'lodash';

/** 横向筛选面板默认处理 */
export default class DefaultFilterService implements IFilterService {
  /** 原始未处理数据 */
  rawData: any;

  /** 原始筛选数据 */
  originalFilters: IFilter[];

  /** 格式化筛选面板数据 */
  format(response: any): IFilter[] {
    if (!Array.isArray(response) || response.length < 1) { return []; }

    this.rawData = response;
    const filters: IFilter[] = [];
    response.forEach(item => {
      const { type } = item;
      if (type === FilterType.select) {
        const sl = this.getSelectList(item);
        filters.push(sl);
      }
      if (type === FilterType.checkbox) {
        const tl = this.getTagList(item);
        filters.push(tl);
      }
    });
    this.originalFilters = _.cloneDeep(filters);
    return filters;
  }

  /** 更新筛选数据状态 */
  updateState(
    data: IFilter[],
    id: number,
    index: number,
    value: number,
  ): IFilter[] {
    if (!Array.isArray(data) || data.length < 1) { return []; }
    const filters: IFilter[] = [];
    data.forEach(filter => {
      const { id: identity } = filter;
      if (id !== identity) {
        filters.push(filter);
        return;
      }
      if (filter instanceof DefaultTagList) {
        const handler = (tag: ITag, i: number) => {
          if (i !== index) { return tag; }
          const selected = !tag.selected;
          return { ...tag, selected };
        };
        const f = filter.updateTagState(handler);
        filters.push(f);
        return;
      }
      if (filter instanceof DefaultSelectList) {
        filter.value = value;
        filters.push(filter);
      }
    });
    return filters;
  }

  /** 全选/取消全选 */
  switchAllState(data: IFilter[], selected: boolean): IFilter[] {
    if (!Array.isArray(data) || data.length < 1) { return []; }
    const filters: IFilter[] = [];
    data.forEach(filter => {
      if (filter instanceof DefaultSelectList) {
        filters.push(filter);
      }
      if (filter instanceof DefaultTagList) {
        const handler = (tag, i) => {
          return { ...tag, selected };
        };
        const f = filter.updateTagState(handler);
        filters.push(f);
        return;
      }
    });
    return filters;
  }

  /** 是否有选中的 Tag */
  hasSelectedTag(data: IFilter[]): boolean {
    for (const filter of data) {
      if (!(filter instanceof DefaultTagList)) { continue; }
      const hasSelectedTag = filter.hasSelectedTag();
      if (hasSelectedTag) { return true; }
    }
    return false;
  }

  /** 获取筛选面板选中的 Filter */
  getSelectedFilter(data: IFilter[]): IFilter[] {
    if (!Array.isArray(data) || data.length < 1) { return []; }
    const selectedFilters: IFilter[] = [];
    data.forEach(filter => {
      if (filter instanceof DefaultTagList) {
        const { tags, id, title } = filter;
        const selectedTags: ITag[] = [];
        tags.forEach(tag => {
          const { selected } = tag;
          if (selected) { selectedTags.push(tag); }
        });
        const tl = new DefaultTagList(id, title, selectedTags);
        selectedFilters.push(tl);
        return;
      }
      if (filter instanceof DefaultSelectList) {
        selectedFilters.push(filter);
      }
    });
    return selectedFilters;
  }

  /** 获取筛选面板选中的数据 */
  getSelectedResult(data: IFilter[]): Promise<any> {
    return new Promise((resolve, reject) => {
      const result: any[] = [];
      for (const filter of data) {
        if (filter instanceof DefaultSelectList) {
          const { id, value, title } = filter;
          if (value === null || value === undefined) {
            reject(new Error(`请选择${title}`));
            return;
          }
          const filterResult = {
            key: id,
            value: [value],
          };
          result.push(filterResult);
          continue;
        }
        if (filter instanceof DefaultTagList) {
          const { id: key } = filter;
          const idList = filter.getAllSelectedTagId();
          if (idList.length < 1) { continue; }
          const filterResult = {
            key,
            value: idList,
          };
          result.push(filterResult);
        }
      }
      resolve(result);
    });
  }

  /**
   * 获取SelectList
   * @param data 
   */
  private getSelectList(data: any): ISelectList {
    const { key, value: rawOptions, title } = data;
    let selectedValue = -1;
    let selectedName = '';
    if (Array.isArray(rawOptions)) {
      for (const item of rawOptions) {
        const { key: id, value: labelName, selected } = item;
        if (selected) {
          selectedValue = id;
          selectedName = labelName;
          break;
        }
      }
    }
    const sl = new DefaultSelectList(key, title, [], selectedValue);
    sl.name = selectedName;
    sl.setOptions(rawOptions);
    return sl;
  }

  /**
   * 获取TagList
   * @param data 
   */
  private getTagList(data: any): ITagList {
    const { key, title, value: rawTags } = data;
    const tl = new DefaultTagList(key, title, []);
    tl.setTags(rawTags);
    return tl;
  }
}