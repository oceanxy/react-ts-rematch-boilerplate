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

const routes = [
  {
    path: config.basename,
    exact: true,
    component: loadable(() => import('@/screens/home')),
    name: 'home',
    title: 'react-home'
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
export function beforeRouter(route: string) {
  console.log(route);
}

// 返回路由
export default routes.map((route) => {
  // 检测路由中的'//'，并替换为'/'
  if (route.path && !Array.isArray(route.path)) {
    route.path = route.path.replace('//', '/');
  }
  return route;
});
