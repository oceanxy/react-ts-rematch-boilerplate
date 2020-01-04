/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 导航菜单
 * @Date: 2020-01-02 16:28:01
 * @LastModified: Oceanxy
 * @LastModifiedTime: 2020-01-02 16:28:01
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import routes, { routesMap } from '@/config/router';
import './index.scss';

/**
 * 导航菜单组件
 */
const Nav = () => {
  return (
    <NavLink to={routesMap.home} className="nav-item">
      {routes.home.title}
    </NavLink>
  );
};

export default Nav;
