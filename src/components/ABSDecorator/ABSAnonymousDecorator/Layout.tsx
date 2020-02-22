import React from 'react';
import baseDecorator from '../index';
import authService from '../../../abs/services/auth/authService';
import routeConfig from '../../../abs/config/routeConfig';

@baseDecorator()
class AnonymousLayout extends React.Component<any, any> {
  componentWillMount() {
    const isLogin = authService.checkIsLogin();
    if (isLogin) {
      location.href = routeConfig.home;
    }
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default AnonymousLayout;