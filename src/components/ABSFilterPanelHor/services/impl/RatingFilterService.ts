import IFilterService from '../IFilterService';
import IFilter from '../../entities/IFilter';
import ISelectList from '../../entities/ISelectList';
import DefaultSelectList from '../../entities/impl/DefaultSelectList';
import ISelect from '../../entities/ISelect';
import _ from 'lodash';

/** 评级分析处理 */
export default class RatingFilterService implements IFilterService {
  /** 原始未处理数据 */
  rawData: any;

  /** 原始筛选数据 */
  originalFilters: IFilter[];

  /** 横向筛选默认处理 */
  private filterService: IFilterService;

  /** filter data */
  private filterData: IFilter[];

  /** 市场分类 */
  private marketCategory: ISelectList;

  /** 产品分类 */
  private dealCategory: ISelectList;
  
  /** 资产子类型 */
  private assetCategory: ISelectList;

  /** 图表类型 */
  private chartType: ISelectList;

  constructor(fs: IFilterService) {
    this.filterService = fs;
  }

  format(response: any): IFilter[] {
    if (!Array.isArray(response)) { return []; }
    this.rawData = response;
    this.filterData = this.filterService.format(response);
    this.setCategories(this.filterData);
    const data = this.getFilterData();
    this.originalFilters = _.cloneDeep(data);
    return data;
  }

  updateState(data: IFilter[], id: number, index: number, value: number): IFilter[] {
    this.filterData = this.filterService.updateState(this.filterData, id, index, value);
    this.setCategories(this.filterData);
    const d = this.getFilterData();
    return d;
  }

  getSelectedFilter(data: IFilter[]): IFilter[] {
    return this.filterService.getSelectedFilter(data);
  }

  getSelectedResult(data: IFilter[]) {
    return this.filterService.getSelectedResult(data);
  }

  /**
   * 重置产品分类、资产子类型选择器
   */
  reset() {
    this.filterData = this.filterService.format(this.rawData);
    this.setCategories(this.filterData);
  }

  private setCategories(data: IFilter[]) {
    for (const filter of data) {
      if (!(filter instanceof DefaultSelectList)) { continue; }
      const { id } = filter;
      if (id === 54) {
        this.marketCategory = filter;
        continue;
      }
      if (id === 5) {
        this.dealCategory = filter;
        continue;
      }
      if (id === 52) {
        this.assetCategory = filter;
        continue;
      }
      if (id === 53) {
        this.chartType = filter;
      }
    }
  }

  private getFilterData() {
    const mc = this.marketCategory;
    const dc = this.getDealCategory(mc);
    const ac = this.getAssetCategory(dc);
    const ct = this.chartType;
    const data: IFilter[] = [];
    if (mc) { data.push(mc); }
    if (dc) { data.push(dc); }
    if (ac) { data.push(ac); }
    if (ct) { data.push(ct); }
    return data;
  }

  /**
   * 获取产品分类
   * @param marketCategory 
   */
  private getDealCategory(marketCategory: ISelectList): ISelectList | null {
    if (!marketCategory) { return null; }
    const { value: marketValue } = marketCategory;
    if (!this.dealCategory) { return null; }
    const sl = this.filterSelectList(this.dealCategory, marketValue);
    return sl;
  }

  /**
   * 获取资产子类型
   * @param dealCategory 
   */
  private getAssetCategory(dealCategory: ISelectList | null): ISelectList | null {
    if (!dealCategory) { return null; }
    const { value: dealValue } = dealCategory;
    if (!this.assetCategory) { return null; }
    const sl = this.filterSelectList(this.assetCategory, dealValue);
    return sl;
  }

  /**
   * 筛选 selectList
   * @param selectList 
   * @param key 
   */
  private filterSelectList(selectList: ISelectList, key: number | null): ISelectList | null {
    const { options, id, title, value, name } = selectList;
    const fo = this.filterOptions(options, key);
    if (fo.length < 1) { return null; }
    const validValue = this.validateSelectListValue(fo, value);
    let selectedValue = value;
    if (!validValue) {
      selectedValue = null;
      selectList.value = null;
    }
    const sl = new DefaultSelectList(id, title, fo, selectedValue);
    sl.name = name;
    return sl;
  }

  /**
   * 筛选 options
   * @param options 
   * @param key 
   */
  private filterOptions(options: ISelect[], key: number | null): ISelect[] {
    if (!Array.isArray(options)) { return []; }
    const filterOptions: ISelect[] = [];
    for (const option of options) {
      const { relatedkeys: keys } = option;
      if (!Array.isArray(keys)) { continue; }
      if (!_.includes(keys, key)) { continue; }
      filterOptions.push(option);
    }
    return filterOptions;
  }

  /**
   * 验证 selectList value 是否在更新后的 options 中有对应的值
   * @param options 
   * @param value 
   */
  private validateSelectListValue(options: ISelect[], value: number | null) {
    for (const option of options) {
      const { value: v } = option;
      if (v === value) { return true; }
    }
    return false;
  }
}