import IFilterService from '../IFilterService';
import IFilter from '../../entities/IFilter';
import DefaultSelectList from '../../entities/impl/DefaultSelectList';
import DefaultTagList from '../../entities/impl/DefaultTagList';
import DefaultSelect from '../../entities/impl/DefaultSelect';
import ISelect from '../../entities/ISelect';
import ITag from '../../entities/ITag';
import DefaultTag from '../../entities/impl/DefaultTag';
import _ from 'lodash';

// 输入行
const rowKey = 10;
// 输出行
const columnKey = 11;
// 统计范围
const rangeKey = 12;

// 产品类型
const dealTypeId = 1;
// 事件类型
const eventTypeId = 2;
// 年份
const yearId = 3;

/** 热力图处理 */
export default class HeatMapFilterService implements IFilterService {
  /** 原始未处理数据 */
  rawData: any;

  /** 初始筛选数据 */
  originalFilters: IFilter[];

  /** 横向筛选默认处理 */
  private filterService: IFilterService;

  // 产品类型
  private dealTags: ITag[];

  // 事件类型
  private eventTags: ITag[];

  // 统计范围
  private yearTags: ITag[];

  constructor(fs: IFilterService) {
    this.filterService = fs;
  }

  /** 格式化筛选面板数据 */
  format(response: any): IFilter[] {
    if (!response) { return []; }

    this.rawData = response;
    this.setTags(response);
    const filters: IFilter[] = [];
    const row = this.getRowSelectList(dealTypeId);
    const column = this.getColumnSelectList(dealTypeId, yearId);
    filters.push(row);
    filters.push(column);
    const tl = this.getRangeTagList(this.eventTags);
    filters.push(tl);
    this.originalFilters = _.cloneDeep(filters);
    return filters;
  }

  updateState(data: IFilter[], id: number, index: number, value: number): IFilter[] {
    let filterData: IFilter[] = [];
    if (id === rowKey) {
      filterData = this.updateRowState(data, value);
      return filterData;
    }
    if (id === columnKey) {
      filterData = this.updateColumnState(data, value);
      return filterData;
    }
    return this.filterService.updateState(data, id, index, value);
  }

  getSelectedFilter(data: IFilter[]): IFilter[] {
    return this.filterService.getSelectedFilter(data);
  }

  getSelectedResult(data: IFilter[]): Promise<any> {
    return new Promise((resolve, reject) => {
      let row = '';
      let column = '';
      let ranges: string[] = [];
      for (const filter of data) {
        if (filter instanceof DefaultSelectList) {
          const { name, id } = filter;
          if (id === rowKey) {
            row = name;
            continue;
          }
          if (id === columnKey) {
            column = name;
            continue;
          }
        }
        if (filter instanceof DefaultTagList) {
          const { tags } = filter;
          if (!Array.isArray(tags)) { continue; }
          tags.forEach(tag => {
            const { content, selected } = tag;
            if (selected) { ranges.push(content); }
          });
        }
      }
      const result = {
        row,
        column,
        ranges,
      };
      resolve(result);
    });
  }

  switchAllState(data: IFilter[], selected: boolean): IFilter[] {
    const fs = this.filterService;
    if (fs.switchAllState) {
      return fs.switchAllState(data, selected);
    }
    return [];
  }

  hasSelectedTag(data: IFilter[]): boolean {
    const fs = this.filterService;
    if (fs.hasSelectedTag) { return fs.hasSelectedTag(data); }
    return false;
  }

  /**
   * 获取 tags
   * @param data HTTP 响应数据
   */
  private getTags(data: any[]): ITag[] {
    if (!Array.isArray(data)) { return []; }
    const tags: ITag[] = [];
    data.forEach(item => {
      const { id: d, text } = item;
      const tag = new DefaultTag(d, text, false);
      tags.push(tag);
    });
    return tags;
  }

  /**
   * 更新输入行 row
   * @param data 
   * @param rowId 
   */
  private updateRowState(data: IFilter[], rowId: number): IFilter[] {
    const filterData: IFilter[] = [];
    const row = this.getRowSelectList(rowId);
    filterData.push(row);
    const co = data[1] as DefaultSelectList;
    const { value: columnId } = co;
    let range: IFilter;
    // 产品类型
    if (rowId === dealTypeId) {
      if (columnId === eventTypeId) {
        const column = this.getColumnSelectList(rowId, eventTypeId);
        filterData.push(column);
        range = this.getRangeTagList(this.yearTags);
        filterData.push(range);
      }
      if (columnId === yearId) {
        const column = this.getColumnSelectList(rowId, yearId);
        filterData.push(column);
        range = this.getRangeTagList(this.eventTags);
        filterData.push(range);
      }
    }
    // 事件类型
    if (rowId === eventTypeId) {
      const column = this.getColumnSelectList(rowId, yearId);
      filterData.push(column);
      range = this.getRangeTagList(this.dealTags);
      filterData.push(range);
    }
    return filterData;
  }

  /**
   * 更新输入列 column
   * @param data 
   * @param columnId 
   */
  private updateColumnState(data: IFilter[], columnId: number): IFilter[] {
    const filterData: IFilter[] = [];
    const row = data[0] as DefaultSelectList;
    const { value: rowId } = row;
    filterData.push(row);
    let range: IFilter;
    // 事件类型
    if (columnId === eventTypeId) {
      const column = this.getColumnSelectList(rowId, eventTypeId);
      filterData.push(column);
      if (rowId === dealTypeId) {
        range = this.getRangeTagList(this.yearTags);
        filterData.push(range);
      }
    }
    // 年份
    if (columnId === yearId) {
      const column = this.getColumnSelectList(rowId, yearId);
      filterData.push(column);
      if (rowId === dealTypeId) {
        range = this.getRangeTagList(this.eventTags);
        filterData.push(range);
      }
      if (rowId === eventTypeId) {
        range = this.getRangeTagList(this.dealTags);
        filterData.push(range);
      }
    }
    return filterData;
  }

  private setTags(data: any) {
    const { deal_types: dealTypes, event_types: eventTypes, years } = data;
    this.dealTags = this.getTags(dealTypes);
    this.eventTags = this.getTags(eventTypes);
    this.yearTags = this.getTags(years);
  }

  private getRangeTagList(tags: ITag[]): IFilter {
    return new DefaultTagList(rangeKey, '统计范围', tags);
  }

  private getRowSelectList(dealId: number): IFilter {
    const options = this.getSelectOptions(dealId);
    const sl = new DefaultSelectList(rowKey, '输出行', options[0], dealId);
    const name = dealId === dealTypeId ? '产品类型' : '事件类型';
    sl.name = name;
    return sl;
  }

  private getColumnSelectList(rowId: number | null, columnId: number | null): IFilter {
    const options = this.getSelectOptions(rowId);
    const sl = new DefaultSelectList(columnKey, '输出列', options[1], columnId);
    const name = columnId === eventTypeId ? '事件类型' : '年份';
    sl.name = name;
    return sl;
  }

  private getSelectOptions(rowId: number | null): [ISelect[], ISelect[]] {
    const product = new DefaultSelect(dealTypeId, '产品类型');
    const event = new DefaultSelect(eventTypeId, '事件类型');
    const year = new DefaultSelect(yearId, '年份');
    const rowOptions = [product, event];
    let columnOptions = [event, year];
    if (rowId === dealTypeId) {
      columnOptions = [event, year];
    }
    if (rowId === eventTypeId) {
      columnOptions = [year];
    }
    return [rowOptions, columnOptions];
  }
}