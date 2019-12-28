/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 路由定义文件
 * @Date: 2019-10-16 11:20:47
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2019-12-28 15:49:54
 */

import loadable from '@loadable/component'; // 按需加载
import config from '@/config/index';
import { IRouteProps } from '@/interfaces/router';

/**
 * 在跳转路由前的逻辑
 * @param route {IRouteProps} 路由配置
 */
export function beforeRouter(route: IRouteProps) {
  console.log(`即将进入路由：${route.path}`);
}

const routes: IRouteProps[] = [
  {
    path: `${config.basename}/login`,
    exact: true,
    component: loadable(() => import('@/screens/login')),
    name: 'login',
    title: '登录'
  },
  {
    path: config.basename,
    exact: true,
    component: loadable(() => import('@/screens/home')),
    name: 'home',
    title: 'react-home'
  },
  {
    path: `${config.basename}/test`,
    exact: true,
    component: loadable(() => import('@/screens/test')),
    title: '脚手架功能测试',
    requireAuth: false
  },

  // 404 Not Found
  {
    path: `${config.basename}/*`,
    exact: true,
    component: loadable(() => import('@/screens/404')),
    name: '404',
    title: '404'
  }
];

// 返回路由
export default <IRouteProps[]>routes.map((route: IRouteProps) => {
  // 检测路由中的'//'，并替换为'/'
  if (route.path && !Array.isArray(route.path)) {
    route.path = route.path.replace('//', '/');
  }

  return route;
});
