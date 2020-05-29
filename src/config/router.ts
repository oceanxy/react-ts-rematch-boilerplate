/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 路由定义文件
 * @Date: 2019-10-16 11:20:47
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-18 周一 10:13:52
 */

import config from '@/config/index';
import { IRouteProps, Routes, RoutesMap } from '@/interfaces/router';
import loadable from '@loadable/component';
import _ from 'lodash'; // 按需加载

export type RouteName = 'login' | 'home' | 'home2' | 'test' | 'notFound';

/**
 * 路由配置
 */
const routesConfig: Routes = {
  // login: {
  //   path: `${config.basename}/login`,
  //   exact: true,
  //   component: loadable(() => import('@/containers/login')),
  //   title: '登录'
  // },
  home: {
    show: true,
    path: config.basename,
    exact: true,
    component: loadable(() => import('@/containers/home')),
    title: '指挥调度'
  }
  // home2: {
  //   show: true,
  //   path: '/clbs',
  //   exact: true,
  //   title: '数据管理'
  // },
  // test: {
  //   path: `${config.basename}/test`,
  //   exact: true,
  //   component: loadable(() => import('@/containers/test')),
  //   title: '脚手架功能测试',
  //   requireAuth: false
  // },

  // 404(Not Found)
  // notFound: {
  //   path: `${config.basename}/*`,
  //   exact: true,
  //   component: loadable(() => import('@/containers/404')),
  //   title: '页面找不到了-404'
  // }
};

/**
 * 在跳转路由前的逻辑
 * @param route {IRouteProps} 路由配置
 */
export function beforeRouter(route: IRouteProps) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`即将进入路由：${route.path}`);
  }
}

/**
 * 路由配置对象
 */
const routes = <Routes> Object.fromEntries(
  // 处理路由中的 '//' 为 '/'
  Object.entries(routesConfig).map(([routeName, route]) => {
    // 检测路由中的'//'，并替换为'/'
    if (route?.path && !Array.isArray(route.path)) {
      route.path = route.path.replace('//', '/');
    }

    return [routeName, route];
  })
);

export const routesMap = <RoutesMap> (
  Object.fromEntries(Object.entries(routes).map(([routeName, route]) => [routeName, route?.path]))
);

// eslint-disable-next-line consistent-return
export const renderRoutes = Object.values(routes).map(route => {
  if (route && !_.isArray(route) && route.show) {
    return route;
  }
});

export default routes;
