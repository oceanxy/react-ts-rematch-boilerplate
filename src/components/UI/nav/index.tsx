/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 导航菜单
 * @Date: 2020-01-02 16:28:01
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-01-11 13:45:34
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';

interface INav {
  to: string;
  title?: string;
}

/**
 * 导航菜单组件
 */
const Nav = (props: INav) => {
  return (
    <NavLink to={props.to} className="inter-plat-nav-item" activeClassName="active">
      {props.title}
    </NavLink>
  );
};

export default Nav;
