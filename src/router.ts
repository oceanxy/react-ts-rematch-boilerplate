/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 路由定义文件
 * @Date: 2019-10-16 11:20:47
 * @LastModified: Oceanxy
 * @LastModifiedTime: 2019-10-16 11:20:47
 */

import loadable from '@loadable/component'; // 按需加载
import config from '@/config';
import { RouteConfig } from 'react-router-config';

const routes: RouteConfig[] = [
  {
    path: config.basename,
    exact: true,
    component: loadable(() => import('@/screens/home')),
    name: 'home', // 自定义属性
    title: 'react-home' // 自定义属性
    // 这里可以扩展一些自定义的属性
  },
  {
    path: config.basename + '/home',
    exact: true,
    component: loadable(() => import('@/screens/home')),
    name: 'home',
    title: 'HelloWorld'
  },
  {
    path: config.basename + '/test',
    exact: true,
    component: loadable(() => import('@/screens/test'))
  },

  // 404 Not Found
  {
    path: '*',
    exact: true,
    component: loadable(() => import('@/screens/404')),
    name: '404',
    title: '404'
  }
];

/**
 * 在跳转路由前的逻辑
 * @param route
 */
export function beforeRouter(route: string) {}

// 返回路由
export default routes.map((route: RouteConfig) => {
  // 检测路由中的'//'，并替换为'/'
  if (route.path && !Array.isArray(route.path)) {
    route.path = route.path.replace('//', '/');
  }
  return route;
});
