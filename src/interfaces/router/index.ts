/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: 路由属性定义
 * @Date: 2019-12-24 14:20:12
 * @LastModified: Oceanxy（xyzsyx@163.com）
 * @LastModifiedTime: 2020-01-02 14:52:14
 */

import { RouteProps } from 'react-router-dom';
import { RouteName } from '@/config/router';

/**
 * 路由对象映射
 */
export type Routes = {
  [K in RouteName]?: IRouteProps;
};

/**
 * 路由路径映射
 */
export type RoutesMap = { [K in RouteName]?: string };

/**
 * 路由接口
 */
export interface IRouteProps extends RouteProps {
  /**
   * 配置该路由是否显示
   */
  show?: boolean;
  /**
   * 路由标题（document.title）
   */
  title?: string;
  /**
   * 需要身份验证才能加载此路由（一般是登录权限）
   */
  requireAuth?: boolean;
  /**
   * 访问路由的路径
   */
  path: string;
}
