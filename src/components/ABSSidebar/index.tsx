import * as React from 'react';
import { Menu } from 'antd';
import ABSIcon from '../ABSIcon';
import './index.less';
import ABSLink from '../ABSLink';
import commonUtils from '../../utils/commonUtils';
import classNames from 'classnames';
import { connect } from 'dva';
import _ from 'lodash';
import ABSPerfectScrollBar from '../ABSPerfectScrollBar';
import qs from 'qs';

const SubMenu = Menu.SubMenu;

export interface IABSSidebarMenuData {
  icon: string;
  name: string;
}

interface IABSSidebarProps {
  location?: any;
  menus?: any;
  prefix?: string;
  securityID?: number | null;
  dealID?: number | null;
  organizationID?: number | null;
}

interface IABSSidebarState {
  openKeys: string[];
  menus: any[];
}

const mapStateToProps = state => {
  const securityID = _.get(state, 'investment.pageHeader.security_id', null);
  const dealID = _.get(state, 'product.dealID', null);
  const organizationID = _.get(state, 'organization.organizationCore.id', null);
  return {
    securityID,
    dealID,
    organizationID
  };
};

// 如果pure为true 则会默认进行一次浅比较 但是对应点击的左侧菜单不会高亮
@connect(
  mapStateToProps,
  null,
  null,
  { pure: false }
)
class ABSSidebar extends React.Component<IABSSidebarProps, IABSSidebarState> {
  static defaultProps = {
    prefix: ''
  };

  state = {
    openKeys: [],
    menus: []
  };

  static getDerivedStateFromProps(
    nextProps: IABSSidebarProps,
    prevState: IABSSidebarState
  ) {
    const menus = nextProps.menus;
    const lastMenus = prevState.menus;
    const nextOpenKeys = commonUtils.getOpenKeys(menus);
    if (lastMenus.length !== menus.length) {
      return {
        openKeys: nextOpenKeys,
        menus
      };
    }
    return null;
  }

  onOpenChange = (openKeys: string[]) => {
    this.setState({ openKeys });
  };
  renderIcon(item: IABSSidebarMenuData) {
    return (
      <span>
        <span>
          <ABSIcon type={item.icon} />
          <span>{item.name}</span>
        </span>
      </span>
    );
  }

  getUrl(item: any) {
    const { securityID, dealID, organizationID } = this.props;
    if (securityID) {
      return `${item.url}?security_id=${securityID}`;
    }
    if (dealID && !item.url.includes('basic-analysis')) {
      return `${item.url}?deal_id=${dealID}`;
    }
    if (item.url.includes('basic-analysis') && qs.parse(item.url.split('?')[1]).deal_id === 'undefined') {
      const url = item.url.replace(`deal_id=undefined`, `deal_id=${dealID}`);
      return url;
    }
    if (organizationID) {
      return `${item.url}?organization_id=${organizationID}`;
    }
    return item.url;
  }

  renderIndex(parentIndex: number, index: number) {
    const showIndex = location.href.includes('absui.html');
    if (showIndex && parentIndex !== undefined && parentIndex !== undefined) {
      return (
        <>
          {parentIndex + 1}.{index + 1}.
        </>
      );
    }
    return null;
  }

  renderMenu = (menus, menuIndex?) => {
    if (menus && menus.length > 0) {
      return menus.map((item, index) => {
        let key = item.url ? item.url.trim() : item.key;

        if (item.children && item.children.length > 0) {
          return (
            <SubMenu title={this.renderIcon(item)} key={key}>
              {this.renderMenu(item.children, index)}
            </SubMenu>
          );
        }
        const smallSubMenuClassName = classNames({
          'small-submenu-title': item.url.includes('basic-analysis')
        });
        const url = this.getUrl(item);
        if (location.href.includes('absui.html')) {
          key = `${location.pathname}#${key}`;
        }
        if (item.url.includes('basic-analysis') && this.props.dealID) {
          key = key.replace(`deal_id=undefined`, `deal_id=${this.props.dealID}`);
        }
        return (
          <Menu.Item key={key}>
            <ABSLink to={url} className={smallSubMenuClassName} target="_self">
              <ABSIcon type={item.icon} />
              <span>
                {this.renderIndex(menuIndex, index)}
                {item.name}
              </span>
            </ABSLink>
          </Menu.Item>
        );
      });
    }

    return null;
  };

  render() {
    const { menus } = this.props;
    let selectedKey = commonUtils.getSelectedKey(menus);
    if (selectedKey.includes('basic-analysis') && this.props.dealID) {
      selectedKey = selectedKey.replace(`deal_id=undefined`, `deal_id=${this.props.dealID}`);
    }
    return (
      <ABSPerfectScrollBar className="abs-sidebar-container">
        <Menu
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          mode="inline"
          theme="dark"
          selectedKeys={[selectedKey]}
          inlineIndent={20}
        >
          {this.renderMenu(menus)}
        </Menu>
      </ABSPerfectScrollBar>
    );
  }
}

export default ABSSidebar;
