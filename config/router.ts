export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      {
        path: '/',
        redirect: '/welcome',
      },
      {
        path: '/welcome',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',
        authority: ['admin', 'user'],
      },
      {
        name: 'list',
        icon: 'table',
        path: '/list/card/list',
        component: './list/card/list',
        authority: ['admin'],
      },
      {
        name: '403',
        hideInMenu: true,
        path: '/exception/403',
        component: './exception/403',
      },
      {
        name: '500',
        hideInMenu: true,
        path: '/exception/500',
        component: './exception/500',
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
