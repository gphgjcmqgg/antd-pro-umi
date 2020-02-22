import * as React from 'react';
import classNames from 'classnames';
import ABSUnLogin from './ABSUnLogin';
import { ISiteMenu } from '../../abs/services/auth/authService';
import { withRouter } from 'dva/router';
import { connect } from 'dva';
import './index.less';
import { Menu } from 'antd';
import ABSLink from '../ABSLink';
import ABSHomeHeaderDataHelper from './ABSHomeHeaderDataHelper';

const logo = require('../../assets/images/logo.png');

interface IProps {
  menus: Array<ISiteMenu>;
  isLogin: boolean;
  style?: React.CSSProperties;
  className?: string;
  location?: any;
  homeMenus: Array<IHomeHeaderMenu>;
}

export interface IHomeHeaderMenu {
  url: string;
  name: string;
  key: string;
  id: number;
}

interface IState {
  selectMenuKey: string;
}

class ABSHomeHeader extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectMenuKey: ''
    };
  }

  handleClick = () => {
    // console.log('handleClick: ');
  }

  renderMenus() {
    const { homeMenus } = this.props;
    
    if (homeMenus) {
      return (
        homeMenus.map((menu) => (
          <Menu.Item key={menu.url}>
            <ABSLink to={menu.url}>{menu.name}</ABSLink>
          </Menu.Item>
        ))
      );
    }
    
    return null;
  }

  render() {
    const { isLogin, className } = this.props;
    const classes = classNames('abs-home-header', className);
    const selectedKey = ABSHomeHeaderDataHelper.getSelectedKey();

    return (
      <div className={classes}>
        <div className="abs-home-header-container">
          <div className="abs-header-logo">
            <a href="/">
              <img src={logo} />
            </a>
          </div>
          <div className="abs-header-menu">
            <Menu
              onClick={this.handleClick}
              selectedKeys={[selectedKey]}
              mode="horizontal"
            >
              {this.renderMenus()}
            </Menu>
            {/* <ABSMenu menu={siteMenus} selectKey={selectMenuKey} /> */}
          </div>
          <div className="abs-header-right">
            <ABSUnLogin isLogin={isLogin} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ global }) => {
  const { homeMenus } = global.menu ? global.menu : { homeMenus: []};
  return { homeMenus };
};

export default withRouter(connect(mapStateToProps)(ABSHomeHeader));