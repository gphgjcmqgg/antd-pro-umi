/**
 * 页面跳转路由配置
 */
export default class RouteConfig {
  /**
   * 根目录
   */
  static root: string | undefined = process.env.REACT_APP_PUBLISH_PATH;

  /**
   * 首页
   */
  static home: string = 'home';
}
