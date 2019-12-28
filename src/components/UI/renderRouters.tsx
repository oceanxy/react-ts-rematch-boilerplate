/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 渲染路由组件
 * @Date: 2019-10-16
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2019-12-28 14:29:40
 */

import React from 'react';
import { Route, Redirect, Switch, RouteComponentProps } from 'react-router-dom';
import { SwitchProps } from 'react-router-dom';
import { beforeRouter } from '@/config/router';
import { IRouteProps } from '@/interfaces/router';
import config from '@/config';

/**
 * 渲染路由组件
 * @param routes {IRouteProps[]} 路由配置
 * @param [authenticated] {boolean} 如果路由配置的route.requireAuth字段为true，则配置此字段可跳过验证
 * @param [authenticationPath] {string} 验证的路由
 * @param [extraProps] {React.ComponentType} 额外的props属性
 * @param [switchProps] {SwitchProps} 需要传给react-router库的Switch组件的props属性
 */
const renderRoutes = (
  routes: IRouteProps[],
  authenticated?: boolean,
  authenticationPath?: string,
  extraProps?: React.ComponentType,
  switchProps?: SwitchProps
) => {
  if (!authenticationPath) {
    authenticationPath = `${config.basename}/login`;
  }

  return routes ? (
    <Switch {...switchProps}>
      {
        routes.map((route: IRouteProps, i: number) => (
          <Route
            key={`react-route-${i}`}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={(props: RouteComponentProps) => {
              document.title = route.title || 'react-app';

              // 验证路由
              if (!route.requireAuth || authenticated || route.path === authenticationPath) {
                beforeRouter(route);

                if (route.component) {
                  return <route.component {...props} {...extraProps} />;
                }

                return null;
              }

              return <Redirect to={{pathname: authenticationPath, state: {from: props.location}}} />;
            }}
          />
        ))
      }
    </Switch>
  ) : null;
};

export default renderRoutes;
