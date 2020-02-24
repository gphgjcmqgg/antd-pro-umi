# DEBT

## 环境准备

1. 官网下载与系统相应的node版本，node.js版本>=8.10

2. 推荐使用 yarn 管理 npm 依赖
npm i yarn tyarn -g

3. 然后全局安装 umi，并确保版本是 2.0.0 或以上
yarn global add umi

4. yarn create umi
如果提示 create-umi 命令不存在，你需要执行 yarn global bin，然后把 global bin 的路径添加到环境变量 PATH 中。

## 脚手架使用

yarn create umi

Select the boilerplate type? 选择 antd pro
Do you want to use typescript? 选择 Yes

## umi通用目录

.
├── dist/                          // 默认的 build 输出目录
├── mock/                          // mock 文件所在目录，基于 express
├── config/
    ├── config.js                  // umi 配置，同 .umirc.js，二选一
└── src/                           // 源码目录，可选
    ├── assets                     // 静态资源
    ├── layouts/index.tsx          // 全局布局
    ├── models                     // 状态管理
    ├── pages/                     // 页面目录，里面的文件即路由
        ├── .umi/                  // dev 临时目录，需添加到 .gitignore
        ├── .umi-production/       // build 临时目录，会自动删除
        ├── document.ejs           // HTML 模板
        ├── 404.ts                 // 404 页面
        ├── page1.ts               // 页面 1，任意命名，导出 react 组件
        ├── page1.test.ts          // 用例文件，umi test 会匹配所有 .test.ts 和 .e2e.ts 结尾的文件
        └── page2.ts               // 页面 2，任意命名
    ├── global.css                 // 约定的全局样式文件，自动引入，也可以用 global.less
    ├── app.ts                     // 运行时配置文件
├── .umirc.ts                      // umi 配置，同 config/config.js，二选一
├── .env                           // 环境变量
├── tsconfig.json                  // ts的配置文件，指定了用来编译这个项目的根文件和编译选项
├── yarn.lock                      // yarn用来锁定npm依赖的文件     
├── .prettierrc.js                 // Prettier代码格式化配置文件
├── .prettierignore                // Prettier要忽略的文件     
├── .gitignore                     // git要忽略的文件     
├── .eslintrc.js                   // Eslint配置文件
├── .editorconfig                  // 维护代码风格的配置文件
└── package.json                   // npm依赖记录文件

## 开发指南
===================
>
- git clone                 克隆代码
- yarn install              安装包依赖
- yarn start                开发环境启动
- yarn build                打包开发环境包  部署IIS站点
- yanr analyze              打包并分析包大小 网页显示

## umi config基本配置

hash                        （production）是否开启 hash 文件后缀，防止缓存导致得不到最新代码实现，默认是false，开启后编译文件如：build\vendors.6d640c05.async.js带hash值
treeShaking                  移除未引用代码
define                       定义环境变量
outputPath                   build输出路径
routes                       用于批量修改路由
plugins                      配置插件列表 这里主要使用了umi-plugin-react插件
history                      调整路由模式 hash模式或者brower模式
targets                      配置浏览器最低版本，提高浏览器兼容性
block                        配置区块的访问地址     
uglifyJSOptions              开发环境 加速打包
theme                        配置主题，页面风格
define                       可以定义环境变量
proxy                        开启服务器代理，解决跨域问题
ignoreMomentLocale           忽略 moment 的 国际化locale 文件，用于减少尺寸
lessLoaderOptions            给 less-loader 的额外配置项   
disableRedirectHoist         禁用 redirect 上提
manifest                     配置后会生成 asset-manifest.json
chainWebpack                 webpack扩展

## umi-plugin-react 插件配置说明

antd: true,         启用后自动配置 babel-plugin-import 实现 antd, antd-mobile 和 antd-pro 的按需加载

dva: true,          启动dva

dynamicImport       实现路由级的动态加载（code splitting），可按需指定哪一级的按需加载。
    配置项包含：
        webpackChunkName，是否通过 webpackChunkName 实现有意义的异步文件名
        loadingComponent，指定加载时的组件路径              --'./components/ABSLoading/index.tsx',
        level，指定按需加载的路由等级
* 注明：这边打包用这个配置原本打包出来的umi.js会分包打包成小文件，切换路由时候也会按需加载对应的js文件



locale              用于国际化的配置

dll                 通过 webpack 的 dll 插件预打包一份 dll 文件来达到二次启动提速的目的
* 注明：加快开发环境二次启动速度和编译速度，生成umi.dll.js文件做缓存，有diff则构建

fastClick           解决移动端点击延迟问题

title               可以设置网站的title

chunks              默认是 ['umi']，可修改，做了 vendors 依赖提取之后，会需要在 umi.js 之前加载 vendors.js      
                    配置在umi-plugin-react下chunks: ['vendors', 'umi']
                    另外在chainWebpack设置要提取的依赖

## route配置说明

    path: '/',                                      --执行路由
    component: '../layouts/BasicLayout',            --执行页面layout
    Routes: ['src/pages/Authorized'],               --使用权限路由
    routes: [                                       --routes下配置子路由
      {
        path: '/',                                  
        redirect: '/welcome',                       --默认跳转的路由
      },
      {
        path: '/welcome',                           
        name: 'welcome',                            --路由名称对应 src\locales\zh-cn(国际化目录)\ment.ts里对应中文名称
        icon: 'smile',                              --对应路由使用的图标 参考 antd icon
        component: './Welcome',                     --对应使用的组件路由
        authority: ['admin', 'user'],               --路由权限配置 admin user 可以访问
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
        hideInMenu: true,                           --隐藏显示菜单
        path: '/exception/403',
        component: './exception/403',
      },

## 使用区块 快速开发页面

config配置中配置了区块的获取地址
    block: {
        // 国内用户可以使用码云
        //defaultGitUrl: 'https://gitee.com/ant-design/pro-blocks',
        defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
    },
区块包括以下内容
    显示页面   样式  mock数据   国际化文件      server dva 请求

umi block list          --显示所有可以访问的区块     还可以通过可视化工具umi ui 中看到所有区块的样子
umi block add 区块名称   --添加区块到项目   建议使用umi可视化来添加区块
