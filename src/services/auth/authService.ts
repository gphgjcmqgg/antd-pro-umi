import commonUtils from '@/utils/commonUtils';
// import { menuKey } from '../../config/menuKeyConfig';
// import routeConfig from '../../config/routeConfig';
// import routerIdentityConfig from '../../config/routerIdentityConfig';
// import { absUIMenuData } from './absUIMenuData';

interface IUser {
  id: string;
  name: string;
  avatar: string;
  isLogin: boolean;
  isNew: boolean;
  isPayed: boolean;
  roles: Array<IRole>;
}

interface IMenu {
  id: number;
  parentId: number;
  name: string;
  key: string;
  url?: string;
  children: IMenu[];
}

interface ISiteMenu extends IMenu {
  isNew: boolean;
  isOpen: boolean;
  isFree: boolean;
  isAnoymous: boolean;
  children: ISiteMenu[];
}

interface IRole {
  id: string;
  key: string;
  name: string;
}

interface IToken {
  token: string;
  expireIn: number;
}

interface INavigationMenu extends IMenu {
  icon?: string;
  siteMenuKey?: string;
}

export interface IAuthMenu {
  siteMenus: ISiteMenu[];
  personMenu: ISiteMenu | null;
  navigationMenus: INavigationMenu[];
}

// interface IScenario {
//   id: number;
//   name: string;
// }

interface IUrlParams {
  params: {
    // 产品ID
    dealID: number;
    // 机构ID
    organizationID: number;
    // 证券ID
    securityID: number;
  };
}

interface IVersion {
  versionNo: string;
  isNew: boolean;
}

/**
 * 权限业务封装
 */
class AuthService {
  readonly userCacheKey: string = 'security.user';
  readonly menuCacheKey: string = 'security.menu';
  readonly tokenCacheKey: string = 'security.token';
  readonly paramsCacheKey: string = 'security.params';
  readonly versionCacheKey: string = 'security.version';

  getCurrentUser(): IUser | null {
    let userData;
    try {
      userData = localStorage.getItem(this.userCacheKey);
    } catch (error) {
      // location.href = routeConfig.login;
      return null;
    }

    if (!userData) {
      return null;
    }
    const user = JSON.parse(userData) as IUser;
    return user;
  }

  getMenus(): any {
    const menuData = localStorage.getItem(this.menuCacheKey);
    if (!menuData) {
      return null;
    }
    let menus = JSON.parse(menuData) as IAuthMenu;
    return menus;
  }

  getVersion(): IVersion | null {
    const versionData = localStorage.getItem(this.versionCacheKey);
    if (!versionData) {
      return null;
    }
    const version = JSON.parse(versionData) as IVersion;
    return version;
  }

  // 获取单个侧边栏菜单
  // getNavigationMenu(
  //   navigationMenuKey: any,
  //   scenarios?: IScenario[] | null,
  //   dealId?: number | null,
  //   isOrgManager?: boolean | null,
  //   menuData?: any): any {

  //   let navigationMenus;
  //   if (menuData) {
  //     navigationMenus = menuData;
  //   } else {
  //     const menus = this.getMenus();
  //     if (!menus) { return null; }
  //     navigationMenus = menus.navigationMenus;
  //   }

  //   const currentMenu = navigationMenus.find((menu) => menu.key === navigationMenuKey);
  //   if (currentMenu) {
  //     const staticAnalysis = currentMenu.children.find(
  //       r => r.key === menuKey.dealStaticAnalysis
  //     );
  //     // 处理产品【基本分析】菜单特殊逻辑
  //     if (staticAnalysis && scenarios) {
  //       staticAnalysis.children = [];
  //       if (scenarios.length > 0) {
  //         scenarios.forEach(item => {
  //           let menu: INavigationMenu = {
  //             id: item.id,
  //             parentId: staticAnalysis.id,
  //             name: item.name,
  //             key: item.name,
  //             url: `${
  //               routeConfig.dealStaticAnalysis
  //             }?deal_id=${dealId}&scenario_id=${item.id}`,
  //             children: []
  //           };
  //           staticAnalysis.children.push(menu);
  //         });
  //       } else {
  //         let menu: INavigationMenu = {
  //           id: 0,
  //           parentId: staticAnalysis.id,
  //           name: '0% CDR 0% CPR',
  //           key: menuKey.dealNoStaticAnalysis,
  //           url: `${routeConfig.dealStaticAnalysis}?deal_id=${dealId}`,
  //           children: []
  //         };
  //         staticAnalysis.children.push(menu);
  //       }
  //     }

  //     if (isOrgManager !== null && isOrgManager === false) {
  //       // 处理机构【我要编辑】菜单特殊逻辑
  //       const organizationEditIndex = currentMenu.children.findIndex(
  //         r => r.key === menuKey.organizationEdit
  //       );
  //       if (organizationEditIndex > -1) {
  //         currentMenu.children.splice(organizationEditIndex, 1);
  //       }

  //       // 处理机构【专家认证】菜单特殊逻辑
  //       const organizationInfoIndex = currentMenu.children.findIndex(
  //         r => r.key === menuKey.organizationExpertCertification
  //       );
  //       if (organizationInfoIndex > -1) {
  //         currentMenu.children.splice(organizationInfoIndex, 1);
  //       }
  //     }

  //     return currentMenu.children;
  //   }

  //   return [];
  // }

  /**
   * 设置本地数据存储（包括：菜单、版本）
   */
  setMenuAndVersionCache(auth: any) {
    localStorage.setItem(this.menuCacheKey, JSON.stringify(auth.menu));
    localStorage.setItem(this.versionCacheKey, JSON.stringify(auth.version));
  }

  /**
   * 设置本地数据存储（包括：用户、Token）
   */
  setAuthCache(data: any) {
    const token = this.parseToken(data.token);
    localStorage.setItem(this.tokenCacheKey, JSON.stringify(token));
    
    this.setUserCache(data.user);
  }

  setUserCache(userState: any) {
    const user = this.parseUser(userState);
    localStorage.setItem(this.userCacheKey, JSON.stringify(user));
  }

  // parseMenuAndVersion(authData: any) {
  //   if (!authData) {
  //     return null;
  //   }

  //   let navigationMenus = authData.menu.navigation_menus.map((item) => {
  //     return this.parseNavigationMenu(item);
  //   });

  //   const absUiMenu = { key: menuKey.absUI, children: absUIMenuData };
  //   navigationMenus.push(absUiMenu);

  //   let auth = {
  //     menu: {
  //       siteMenus: authData.menu.site_menus.map(item => {
  //         return this.parseSiteMenu(item);
  //       }),
  //       personMenu: this.parseSiteMenu(authData.menu.person_menu),
  //       navigationMenus
  //     },
  //     version: this.parseVersion(authData.version)
  //   };

  //   return auth;
  // }

  /**
   * 清除本地数据存储（包括：用户、菜单、Token、版本）
   */
  removeAllCache() {
    localStorage.removeItem(this.userCacheKey);
    localStorage.removeItem(this.menuCacheKey);
    localStorage.removeItem(this.tokenCacheKey);
    localStorage.removeItem(this.versionCacheKey);
  }

  /**
   * 判断用户是否登录
   */
  checkIsLogin() {
    const token = this.getToken();

    // 判断token是否过期
    if (!token) {
      return false;
    }
    const ts = (new Date() as any) - 0;

    if (token.expireIn > ts) {
      return true;
    }

    return false;
  }

  /**
   * 检查权限
   * @param {string} [identity]
   */
  // hasPermission(
  //   identity: string,
  //   navigationMenus?: INavigationMenu[] | undefined,
  //   isCheckNavigation?: boolean
  // ): boolean {
  //   // 权限令牌不存在,禁止放行
  //   if (!identity) {
  //     location.href = routeConfig.home;
  //     return true;
  //   }

  //   // 通用页面，直接放行
  //   if (identity === routerIdentityConfig.common) {
  //     return true;
  //   }

  //   // 权限不存在，禁止放行
  //   const menu = this.getMenus();
  //   if (!menu) {
  //     location.href = routeConfig.home;
  //     return false;
  //   }

  //   // 权限令牌不匹配，禁止放行
  //   let siteMenus = menu.siteMenus;
  //   siteMenus.push(menu.personMenu);

  //   if (!this.checkAuth(identity, siteMenus)) {
  //     if (
  //       !isCheckNavigation ||
  //       (isCheckNavigation &&
  //         !this.checkNavigationAuth(identity, navigationMenus))
  //     ) {
  //       location.href = routeConfig.home;
  //       return false;
  //     }
  //   }

  //   return true;
  // }

  getParams() {
    const urlParams = commonUtils.getParams();
    return this.parseUrlParams(urlParams);
  }

  private parseUrlParams(data: any) {
    let returnData: IUrlParams = {
      params: {
        dealID: data.deal_id ? data.deal_id : null,
        organizationID: data.organization_id ? data.organization_id : null,
        securityID: data.security_id ? data.security_id : null
      }
    };

    return returnData;
  }

  /**
   * 检查权限
   * @param {string} [identity]
   */
  // private checkAuth(identity: string, menus: ISiteMenu[]): boolean {
  //   for (let i = 0; i < menus.length; i++) {
  //     let menu = menus[i];
  //     if (identity === menu.key && menu.isOpen === true) {
  //       return true;
  //     }
  //     if (
  //       menu.children &&
  //       menu.children.length > 0 &&
  //       this.checkAuth(identity, menu.children)
  //     ) {
  //       return true;
  //     } else {
  //       continue;
  //     }
  //   }

  //   return false;
  // }

  /**
   * 检查侧边菜单权限
   * @param {string} [identity]
   */
  // private checkNavigationAuth(identity: string, menus: INavigationMenu[] | undefined): boolean {
  //   if (menus && menus.find(r => r.key === identity)) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  /**
   * 获取Token
   */
  private getToken(): IToken | null {
    try {
      const tokenStr = localStorage.getItem(this.tokenCacheKey);
      if (!tokenStr) { return null; }
      const token = JSON.parse(tokenStr) as IToken;

      return token;
    } catch (error) {
      return null;
    }
  }

  // private parseSiteMenu(menu: any) {
  //   if (!menu) {
  //     return null;
  //   }

  //   let siteMenu: ISiteMenu = {
  //     id: menu.id,
  //     name: menu.name,
  //     key: menu.key,
  //     url: commonUtils.parseUrl(menu.url),
  //     isNew: menu.is_new,
  //     isOpen: menu.is_open,
  //     isFree: menu.is_free,
  //     isAnoymous: menu.is_anoymous,
  //     parentId: menu.parent_id,
  //     children: menu.children.map(item => {
  //       return this.parseSiteMenu(item);
  //     })
  //   };

  //   return siteMenu;
  // }

  // private parseNavigationMenu(menu: any) {
  //   let siteMenu: INavigationMenu = {
  //     id: menu.id,
  //     name: menu.name,
  //     key: menu.key,
  //     url: commonUtils.parseUrl(menu.url),
  //     icon: menu.icon,
  //     parentId: menu.parent_id,
  //     siteMenuKey: menu.site_menu_key,
  //     children: menu.children.map(item => {
  //       return this.parseNavigationMenu(item);
  //     })
  //   };

  //   return siteMenu;
  // }

  private parseUser(userState: any) {
    if (!userState) {
      return null;
    }

    const user: IUser = {
      id: userState.id,
      name: userState.name,
      avatar: commonUtils.getAvatar(userState.avatar),
      isLogin: true,
      isNew: (userState.is_new || userState.is_new === false) ? userState.is_new : userState.isNew,
      isPayed: (userState.is_payed || userState.is_payed === false) ? userState.is_payed : userState.isPayed,
      roles: userState.roles
    };

    return user;
  }

  private parseToken(token: any) {
    if (!token) {
      return null;
    }

    const data: IToken = {
      token: token.token,
      expireIn: token.expire_in
    };

    return data;
  }

  // private parseVersion(version: any) {
  //   if (!version) {
  //     return null;
  //   }

  //   const data: IVersion = {
  //     versionNo: version.version_no,
  //     isNew: version.is_new
  //   };

  //   return data;
  // }
}

export default new AuthService();
export { IUser, INavigationMenu, IVersion, ISiteMenu};
