/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 主页
 * @Date: 2019-12-28 15:03:33
 * @LastModified: Oceanxy
 * @LastModifiedTime: 2019-12-28 15:03:33
 */

import React from 'react';
import Logo from '@/screens/home/react-logo.svg';
import './index.scss';
import { RouteComponentProps } from 'react-router-dom';

export default (routes: RouteComponentProps) => {
  return (
    <div className="App">
      <header className="App-header">
        <Logo className="App-logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
};
