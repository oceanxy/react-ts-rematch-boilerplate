/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 主页
 * @Date: 2019-12-28 15:03:33
 * @LastModified: Oceanxy
 * @LastModifiedTime: 2019-12-28 15:03:33
 */

import React from 'react';
import Logo from '@/pages/home/react-logo.svg';
import { NavLink } from 'react-router-dom';
import { routePath } from '@/config/router';
import './index.scss';

export default () => {
  return (
    <div className="App">
      <header className="App-header">
        <Logo className="App-logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          React官网
        </a>
        <NavLink to={routePath.test} className='App-link'>进入功能测试页面</NavLink>
      </header>
    </div>
  );
};
