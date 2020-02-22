/**
 * 筛选面板类型（即将弃用）。
 * 推荐使用`renderHeader()`、`renderFooter()`。
 */
enum FilterPanelType {
  /**
   * 生态圈>机构>机构排名
   */
  organization = 0,
  /**
   * 市场
   */
  market,
  /**
   * 投资>最新交易>一、二级市场
   */
  investment,
  /**
   * 产品>产品、证券列表
   */
  product,
  /**
   * 产品>文档列表
   */
  document,
}

export default FilterPanelType;