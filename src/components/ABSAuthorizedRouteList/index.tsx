import React from 'react';
import { Route, Switch } from 'dva/router';
import RenderAuthorized from 'ant-design-pro/lib/Authorized';
import routerUtil from '../../utils/routerUtil';
import authService, { INavigationMenu } from '../../abs/services/auth/authService';
// import HomePage from '../../abs/views/home/main/HomePage';
import ABSHome from '../../abs/views/home/component';

const Authorized = RenderAuthorized('root');
const { AuthorizedRoute }: any = Authorized;

export interface IProps {
  routerConfig: object;
  path: string;
  navigationMenus?: INavigationMenu[];
}

export class ABSAuthorizedRouteList extends React.Component<IProps, any> {
  notFound = () => (
    // <HomePage />
    <ABSHome login={true} />
  )

  render() {
    const { routerConfig, path, navigationMenus } = this.props;

    return (
      <Switch>
        {
          routerUtil.getRoutes(path, routerConfig).map(item => {
            return (
              <AuthorizedRoute
                key={item.key}
                path={item.path}
                component={item.component}
                exact={item.exact}
                authority={() => { return authService.hasPermission(item.identity, navigationMenus, navigationMenus && navigationMenus.length > 0 ? true : false); }}
              />
            );
          })
        }
        <Route render={this.notFound} />
      </Switch>
    );
  }
}
