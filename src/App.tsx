import React from 'react';
import ReactDOM from 'react-dom';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import config from '@/config';
import routes from './router';
import { Provider } from 'react-redux';
import { store } from './store';
import './style.scss';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={config.basename}>{renderRoutes(routes)}</BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
