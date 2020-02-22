/**
 * 筛选面板附加视图（头部、尾部）类型（即将废弃）。
 * 推荐使用`renderHeader()`、`renderFooter()`。
 */
enum ExtraType {
  /**
   * 机构排名 header
   */
  organizationHeader = 'organization header',
  /**
   * 投资页 footer
   */
  investmentFooter = 'investment footer',
  /**
   * 其他
   */
  other = 'other',
}

export default ExtraType;