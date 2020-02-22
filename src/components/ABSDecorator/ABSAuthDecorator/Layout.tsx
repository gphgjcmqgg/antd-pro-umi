import * as React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import baseDecorator from '..';
import ABSHeader from '../../ABSHeader';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../../../styles/layout.less';
import authService from '../../../abs/services/auth/authService';
import RouteConfig from '../../../abs/config/routeConfig';

@baseDecorator()
class AuthLayout extends React.Component<any, any> {
  componentDidMount() {
    if (!authService.checkIsLogin()) {
      location.href = RouteConfig.login + '?return_url=' + window.location.href.replace('?', '*').replace(/&/g, '@');
    } else {
      this.props.dispatch({
        type: 'global/getMenuAndVersion',
      });
    }
  }

  render() {
    const { menu, notice, children, version } = this.props;
    return (
      <Layout>
        <ABSHeader menu={menu} notice={notice} version={version} />
        <Layout style={{ height: 'calc(100vh - 60px)' }}>
          {
            children
          }
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps(state: any) {
  return { ...state.global };
}

export default connect(mapStateToProps)(AuthLayout); 
