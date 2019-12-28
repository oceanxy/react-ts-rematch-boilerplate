/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: APP入口
 * @Date: 2019-12-28 15:09:58
 * @LastModified: Oceanxy
 * @LastModifiedTime: 2019-12-28 15:09:58
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from '@/config/router';
import renderRoutes from '@/components/UI/renderRouters';
import { store } from '@/store';
import './style.scss';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        {renderRoutes(routes)}
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
