import * as React from 'react';
import ABSMenu from './ABSMenu';
import classNames from 'classnames';
import ABSSearch from './ABSSearch';
import ABSPerson from './ABSPerson';
import ABSFollow from './ABSFollow';
import ABSFeedback from './ABSFeedback';
import ABSInternalMessage from './ABSInternalMessage';
import authService, { ISiteMenu, INavigationMenu, IVersion } from '../../abs/services/auth/authService';
import routeConfig from '../../abs/config/routeConfig';
import ABSLink from '../ABSLink';
import { ABSTag } from '../ABSTag';
import ABSBadge from '../ABSBadge';
import { menuKey } from '../../abs/config/menuKeyConfig';
import ABSUnLogin from './ABSUnLogin';
import './index.less';
import ABSInvitation from './ABSInvitation';
import ABSImproveUser from './ABSImproveUser';

const logo = require('../../assets/images/logo.png');
// const ChristmasHat = require('../../assets/images/hat.png');
interface IProps {
  menu: {
    siteMenus: Array<ISiteMenu>,
    homeMenus: Array<ISiteMenu>,
    navigationMenus: Array<INavigationMenu>,
    personMenu: ISiteMenu
  };
  version: IVersion;
  notice?: any;
  className?: string;
}

export interface IABSHeaderMenu {
  siteMenus: Array<ISiteMenu>;
  homeMenus: Array<ISiteMenu>;
  navigationMenus: Array<INavigationMenu>;
  personMenu: ISiteMenu;
}
interface IState {
  firstSelectKey: string;
  thirdSelectKey: string;
  isShowSearch: boolean;
}

let flatMenus: Array<ISiteMenu> = [];
let flatNavigationMenus: Array<INavigationMenu> = [];

class ABSHeader extends React.Component<IProps, IState> {
  readonly menuVersionKey: string = 'security.menuversion';
  readonly menuVersion: string | undefined = process.env.REACT_APP_MENU_VERSION;
  constructor(props: any) {
    super(props);
    this.state = {
      firstSelectKey: '',
      thirdSelectKey: '',
      isShowSearch: true
    };
  }
  componentWillMount() {
    if (this.menuVersion) {
      const oldMenuVersion = localStorage.getItem(this.menuVersionKey);
      if (oldMenuVersion !== this.menuVersion) {
        localStorage.removeItem('security.menu');
        localStorage.setItem(this.menuVersionKey, this.menuVersion);
      }
    }
  }
  componentWillReceiveProps(nextprops: IProps) {
    const { menu } = nextprops;
    const { siteMenus, navigationMenus, personMenu } = menu;
    let tempSiteMenus = siteMenus.map(item => {
      return item;
    });

    if (personMenu && personMenu.name) {
      tempSiteMenus.push(personMenu);
    }

    this.getFlatMenuData(tempSiteMenus);
    this.getFlatNavigationMenuData(navigationMenus);
    this.getSelectMenuKey();
    this.checkIsShowSearch();
  }

  // 获取平级菜单
  getFlatMenuData(menus: any) {
    menus.map(item => {
      item.url = item.url ? item.url.toLowerCase() : null;
      flatMenus.push(item);

      if (item.children && item.children.length) {
        this.getFlatMenuData(item.children);
      }
    });
  }

  // 获取侧边平级菜单
  getFlatNavigationMenuData(menus: any) {
    menus.map(item => {
      item.url = item.url ? item.url.toLowerCase() : null;
      flatNavigationMenus.push(item);

      if (item.children) {
        this.getFlatNavigationMenuData(item.children);
      }
    });
  }

  // 获取当前选中的菜单Key
  getSelectMenuKey() {
    let firstSelectKey: string = '';
    let thirdSelectKey: string = '';
    const { pathname, search, hash } = window.location;
    let fullPathname = pathname + search + hash;
    fullPathname = fullPathname.toLowerCase();

    // 首页匹配
    if (pathname === '/' || fullPathname.indexOf('home') > 0) {
      thirdSelectKey = menuKey.home;
    } else {
      // 根据当前Url匹配
      for (let i = 0; i < flatMenus.length; i++) {
        const item = flatMenus[i];

        if (
          item.url &&
          fullPathname.indexOf(item.url) > -1 &&
          item.children.length === 0
        ) {
          thirdSelectKey = item.key;
          break;
        }
      }

      // 如果匹配不到，从导航规则中匹配
      if (thirdSelectKey === '') {
        for (let j = 0; j < flatNavigationMenus.length; j++) {
          const item = flatNavigationMenus[j];
          if (item.url && fullPathname.indexOf(item.url) > -1) {
            thirdSelectKey = item.siteMenuKey ? item.siteMenuKey : '';
            break;
          }
        }
      }

      // 仍 没有匹配到的(新闻模块)
      if (thirdSelectKey === '') {
          if ( fullPathname.indexOf('/market.html#/daily/news-info?type=domestic') >= 0) {
            thirdSelectKey = 'DomesticNews';
          } else if ( fullPathname.indexOf('/market.html#/daily/news-info?type=overseas') >= 0) {
            thirdSelectKey = 'OverseasNews';
          } else if (fullPathname.indexOf('/market.html#/daily/law-policy-info') >= 0 ) {
            thirdSelectKey = 'PoliciesNews';
           }
         }
    }

    const thirdMenu = flatMenus.find(r => r.key === thirdSelectKey);

    if (thirdMenu) {
      const secordMenu = flatMenus.find(r => r.id === thirdMenu.parentId);

      if (secordMenu) {
        if (secordMenu.key === menuKey.personCenter) {
          firstSelectKey = menuKey.personCenter;
        } else {
          const firstMenu = flatMenus.find(r => r.id === secordMenu.parentId);
          firstSelectKey = firstMenu ? firstMenu.key : menuKey.home;
        }
      }
    }

    this.setState({
      firstSelectKey,
      thirdSelectKey
    });
  }

  checkIsShowSearch = () => {
    const { hash } = window.location;

    if (hash && hash.indexOf('search') >= 0) {
      this.setState({ isShowSearch: false });
    } else {
      this.setState({ isShowSearch: true });
    }
  };

  toVersionLog = () => {
    window.location.href = routeConfig.versionLog;
  };

  render() {
    const { menu, className } = this.props;
    const { personMenu, siteMenus } = menu;
    const { firstSelectKey, thirdSelectKey, isShowSearch } = this.state;
    const { version } = this.props;
    const count = version && version.isNew ? undefined : 0;
    const displayTag = version && version.versionNo ? 'inline-block' : 'none';
    let versionNo = version && version.versionNo;
    if (versionNo && versionNo.length >= 5) {
      versionNo = versionNo.substring(0, versionNo.lastIndexOf('.'));
    }
    const user = authService.getCurrentUser();

    const classes = classNames('abs-header', className);
   
    const loginContent = () => {
      if (user && user.isLogin) {
        return (
          <div>
            <ABSPerson
              menu={personMenu}
              user={user}
              firstSelectKey={firstSelectKey}
              thirdSelectKey={thirdSelectKey}
            />
            <div>
              <ABSInternalMessage />
              <ABSFollow />
              <ABSFeedback to={routeConfig.usehelp} />
              <ABSInvitation />
              <ABSImproveUser />
            </div>
            {isShowSearch ? <ABSSearch /> : null}
          </div>
        );
      } else {
        return <ABSUnLogin isLogin={user != null && user.isLogin} />;
      }
    };

    return (
      // 最外层设置空div用来挡住三角形超出部分
      <div>
        <div className={classes}>
          <div className="abs-header-logo">
            <ABSLink to={user && user.isLogin ? routeConfig.home : routeConfig.introduction}>
              {/* <img className="abs-Christmas-hat" src={ChristmasHat} /> */}
              <img className="abs-header-logo-img" src={logo} />
            </ABSLink>
            <div
              className="abs-header-logo-tag"
              onClick={this.toVersionLog}
              style={{ display: displayTag }}
            >
              <ABSBadge count={count}>
                <ABSTag content={versionNo} color="#444C58" visible={true} />
              </ABSBadge>
            </div>
          </div>
          <ABSMenu
            menu={siteMenus}
            firstSelectKey={firstSelectKey}
            thirdSelectKey={thirdSelectKey}
          />
          <div className="abs-header-right">{loginContent()}</div>
        </div>
      </div>
    );
  }
}

export default ABSHeader;
