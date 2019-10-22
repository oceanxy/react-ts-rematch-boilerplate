import React from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import config from '@/config';
import routes from './router';

export default () => {
  console.log(routes);
  debugger;
  return <BrowserRouter basename={config.basename}>{renderRoutes(routes)}</BrowserRouter>;
};
