import React from 'react';
import ReactDOM from 'react-dom';
import routes from '../utils/router';
import renderRoutes from '../utils/renderRouters';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/store';
import './style.scss';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        {renderRoutes(routes, false, '')}
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
