import { menuKey } from '../../../abs/config/menuKeyConfig';

/**
 * 菜单帮助类
 */
class Menuhelper {
  /**
   * 请求超时设置
   * @param {string} currentKey 当前菜单Key
   * @param {string} selectKey 选中的Key
   * @param {string} activeKey 激活的Key
   * @returns {string} 箭头className
   */
  static getArrowClassName = (currentKey: string, selectKey: string, activeKey: string, thirdKey: string) => {
    let arrowClassName = 'abs-menu-submenu-arrow ';
    // 一级菜单展开页面三角形
    if (currentKey === selectKey) {
      arrowClassName += 'abs-menu-submenu-arrow-active ';
      let arrowClassNameSuffix = '';
      switch (currentKey) {
        case menuKey.home:
          arrowClassNameSuffix = 'home';
          break;
        // case menuKey.introduction:
        //   arrowClassNameSuffix = 'introduction';
        //   break;
        case menuKey.aboutUS:
          if (thirdKey === menuKey.web ||
            thirdKey === menuKey.app ||
            thirdKey === menuKey.desk) {
            arrowClassNameSuffix = 'product ';
          }

          if (thirdKey === menuKey.aboutCompany ||
            thirdKey === menuKey.aboutTeam ||
            thirdKey === menuKey.contactUs) {
            arrowClassNameSuffix = 'aboutUs ';
          }
          break;
        default:
          arrowClassNameSuffix = 'common ';
          break;
      }

      arrowClassName += `abs-menu-submenu-arrow-${arrowClassNameSuffix}`;
    }

    // 一级菜单展开二级菜单三角形
    if (currentKey === activeKey) {
      arrowClassName += ' abs-menu-submenu-arrow-active abs-menu-submenu-arrow-menu ';
    }

    return arrowClassName;
  }
}

export default Menuhelper;
