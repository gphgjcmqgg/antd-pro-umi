import ISelectList from '../ISelectList';
import ISelect from '../ISelect';
import DefaultSelect from './DefaultSelect';

export default class DefaultSelectList implements ISelectList {
  /**
   * 标识
   */
  id: number;

  /**
   * 标题
   */
  title: string;

  /**
   * 所有选项
   */
  options: ISelect[];

  /**
   * 选中的 key（id）
   */
  value: number | null;

  /**
   * key（id）对应的字符串
   */
  name: string;

  /**
   * 与当前对象关联的 ISelectList 的 key（id）
   */
  relatedkey: number;

  constructor(id: number, title: string, options: ISelect[], value: number | null) {
    this.id = id;
    this.title = title;
    this.options = options;
    this.value = value;
  }

  /**
   * 设置 options
   * @param rawOptions 接口返回的未处理选项
   */
  setOptions(rawOptions: any[]) {
    if (!Array.isArray(rawOptions)) { return; }

    const options: ISelect[] = [];
    rawOptions.forEach(item => {
      const {
        key: id,
        value: labelName,
        relatedkey: relatedkeys,
      } = item;
      const select = new DefaultSelect(id, labelName);
      select.relatedkeys = relatedkeys;
      options.push(select);
    });
    this.options = options;
  }
}