/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 路由属性定义
 * @Date: 2019-12-24 14:20:12
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2019-12-28 10:17:31
 */

import { RouteProps } from 'react-router-dom';

export interface IRouteProps extends RouteProps {
  /**
   * 路由名称
   */
  name?: string,
  /**
   * 路由标题（document.title）
   */
  title?: string,
  /**
   * 需要身份验证才能加载此路由（一般是登录权限）
   */
  requireAuth?: boolean
}
