/**
 * 筛选器类型
 */
enum FilterSelectListType {
  /**
   * 单选1（下拉选择器）
   */
  select = 'select',
  /**
   * 多选
   */
  checkbox = 'checkbox',
  /**
   * 单选2
   */
  radio = 'radio',
  /**
   * 多选不限
   */
  checkboxlimit = 'checkboxlimit',
}

export default FilterSelectListType;