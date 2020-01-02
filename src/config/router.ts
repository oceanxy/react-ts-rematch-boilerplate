/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 路由定义文件
 * @Date: 2019-10-16 11:20:47
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-01-02 15:15:48
 */

import loadable from '@loadable/component'; // 按需加载
import config from '@/config/index';
import { IRouteProps, RoutePath, Routes } from '@/interfaces/router';

export type RouteName =
  'login' |
  'home' |
  'test' |
  'notFound'

/**
 * 路由配置
 */
const routesConfig: Routes = {
  login: {
    path: `${config.basename}/login`,
    exact: true,
    component: loadable(() => import('@/pages/login')),
    title: '登录'
  },
  home: {
    path: config.basename,
    exact: true,
    component: loadable(() => import('@/pages/home')),
    title: '首页'
  },
  test: {
    path: `${config.basename}/test`,
    exact: true,
    component: loadable(() => import('@/pages/test')),
    title: '脚手架功能测试',
    requireAuth: false
  },

  // 404(Not Found)
  notFound: {
    path: `${config.basename}/*`,
    exact: true,
    component: loadable(() => import('@/pages/404')),
    title: '页面找不到了-404'
  }
};

/**
 * 在跳转路由前的逻辑
 * @param route {IRouteProps} 路由配置
 */
export function beforeRouter(route: IRouteProps) {
  console.log(`即将进入路由：${route.path}`);
}

/**
 * 处理路由中的 '//' 为 '/'
 */
const routes = <Routes>Object.fromEntries(Object.entries(routesConfig).map(([routeName, route]) => {
  // 检测路由中的'//'，并替换为'/'
  if (route.path && !Array.isArray(route.path)) {
    route.path = route.path.replace('//', '/');
  }

  return [routeName, route];
}));

export const routePath = <RoutePath>Object.fromEntries(
  Object.entries(routes).map(
    ([routeName, route]) => [routeName, route.path]
  )
);

export default routes;
