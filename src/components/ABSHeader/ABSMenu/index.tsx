import * as React from 'react';
import { Menu } from 'antd';
import Menuhelper from './menuhelper';
import { ABSAntIcon } from '../../ABSAntIcon';
import authService, { ISiteMenu } from '../../../abs/services/auth/authService';
import './index.less';
import { ABSModal } from '../../ABSModal';
import routeConfig from '../../../abs/config/routeConfig';
import { menuKey } from '../../../abs/config/menuKeyConfig';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

interface IProps {
  menu: Array<ISiteMenu>;
  firstSelectKey: string;
  thirdSelectKey: string;
}

interface IState {
  activeKey: string;
}

let flatMenus: Array<ISiteMenu> = [];

class ABSMenu extends React.Component<IProps, IState> {
  modal;
  constructor(props: any) {
    super(props);
    this.state = {
      activeKey: ''
    };
  }

  componentWillReceiveProps(nextprops: IProps) {
    const { menu } = nextprops;
    this.getFlatMenuData(menu);
  }

  // 获取平级菜单
  getFlatMenuData(menus: any) {
    menus.map(item => {
      item.url = item.url ? item.url.toLowerCase() : null;
      flatMenus.push(item);

      if (item.children) {
        this.getFlatMenuData(item.children);
      }
    });
  }

  handleClick = e => {
    const menu = flatMenus.find(r => r.key === e.key);
    const isLogin = authService.checkIsLogin();
    if (menu && menu.isOpen) {
      if (e.key === menuKey.eduction) {
        window.open(menu.url, '_blank');
      } else {
        let url = menu.url;
        if (e.key === menuKey.home) {
          if (isLogin) {
            url = routeConfig.home;
          } else {
            url = routeConfig.introduction;
          }
        }

        if (url) {
          location.href = url;
        }
      }
    } else if (isLogin) {
      this.modal.setState({ visible: true });
    } else {
      location.href = routeConfig.login;
    }
  };

  // 重置弹出菜单的定位高度
  menuOpenChange(e: string[]) {
    if (e[0] != null) {
      document.getElementById(e[0] + '$Menu')!.style.marginTop = '-7px';
      this.setState({ activeKey: e[0] });
    } else {
      this.setState({ activeKey: '' });
    }
  }

  render() {
    const { menu, firstSelectKey, thirdSelectKey } = this.props;
    const content = (
      <p>
        该功能仅对专业版用户开放，如果您有兴趣了解更多详情请与我们联系，电话：
        <a href="tel:021-31156258">021-31156258</a>，邮箱：
        <a href="mailto:feedback@cn-abs.com">feedback@cn-abs.com</a>
        ，感谢您的关注与支持！
      </p>
    );

    const popoverContent = (menus: ISiteMenu) =>
      menus.children.map((item: ISiteMenu) => {
        return (
          <MenuItemGroup
            className="abs-menu-item-group"
            key={item.key}
            title={
              <div className="abs-menu-item-group-title">
                <div
                  className={
                    item.isNew ? 'abs-reddot' : 'abs-reddot visibility-hidden'
                  }
                />
                <div className="abs-menu-item-group-title-name">
                  {item.name}
                </div>
              </div>
            }
          >
            {item.children.map((element: ISiteMenu) => {
              return (
                <Menu.Item key={element.key}>
                  {
                    <div className="abs-menu-item">
                      <div
                        className={
                          element.isNew
                            ? 'abs-reddot'
                            : 'abs-reddot visibility-hidden'
                        }
                      />
                      {element.name}
                      {!element.isFree ? (
                        element.isOpen ? (
                          <ABSAntIcon
                            className="abs-ant-icon-s"
                            type="unlock"
                          />
                        ) : (
                            <ABSAntIcon className="abs-ant-icon-s" type="lock" />
                          )
                      ) : null}
                    </div>
                  }
                </Menu.Item>
              );
            })}
          </MenuItemGroup>
        );
      });

    return (
      <div className="abs-menu">
        <Menu onClick={this.handleClick} selectedKeys={[thirdSelectKey]} mode="horizontal" onOpenChange={(e) => this.menuOpenChange(e)} subMenuOpenDelay={0.1}>
          {
            menu ? menu.map((item) => {
              return (
                (item.children && item.children.length > 0)
                  ?
                  <SubMenu className="abs-menu-submenu-popup" key={item.key} title={
                    <div className="abs-menu-submenu">
                      <div className={item.isNew ? 'abs-reddot' : 'abs-reddot visibility-hidden'} />
                      <div className="abs-menu-submenu-title">
                        {item.name}
                        <div className={Menuhelper.getArrowClassName(item.key, firstSelectKey, this.state.activeKey, thirdSelectKey)} />
                      </div>
                    </div>
                  }>
                    {popoverContent(item)}
                  </SubMenu>
                  :
                  <Menu.Item key={item.key} className={item.key === menuKey.home ? 'abs-menu-item-home' : ''}>
                    {item.name}
                    <div className={Menuhelper.getArrowClassName(item.key, thirdSelectKey, this.state.activeKey, thirdSelectKey)} />
                  </Menu.Item>
              );
            }) : null
          }
        </Menu>
        <ABSModal
          content={content}
          width={360}
          footer={null}
          ref={view => this.modal = view}
        />
      </div>

    );
  }
}

export default ABSMenu;
