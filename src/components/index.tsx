/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: APP入口
 * @Date: 2019-12-28 15:09:58
 * @LastModified: Oceanxy（xyzsyx@163.com）
 * @LastModifiedTime: 2020-01-10 15:18:21
 */

import renderRoutes from '@/components/UI/renderRouters';
import routes from '@/config/router';
import { store } from '@/store';
import { GlobalStyle } from '@/styled';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <GlobalStyle />
      <Switch>{renderRoutes(routes)}</Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
