/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 测试页面组件组装
 * @Date: 2019-12-28 16:16:06
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-28 周四 15:24:32
 */

import TestChart from '@/components/test/chart';
import Increment from '@/components/test/increment';
import TestList from '@/components/test/list';
import TestSockJs from '@/components/test/sockJs';
import TestWebSocket from '@/components/test/websocket';
import Nav from '@/components/UI/nav';
import routes, { routesMap } from '@/config/router';
import ZWMap from '@/containers/UI/amap';
import React from 'react';
import './index.scss';

const TestContainer = (props: {
  test: {
    count: any
    listData: any
    websocketData: any
    sockJsData: any
    eChartsData: any
    artsData: any
  }
  increment: any
  incrementAsync: any
  getListData: any
  getWebSocketData: any
  getSockJsData: any
  getEChartsData: any
}) => {
  return (
    <div className="test-color">
      <Nav title={routes.home?.title} to={routesMap.home || '/'} />
      <Increment count={props.test.count} increment={props.increment} incrementAsync={props.incrementAsync} />
      <TestList data={props.test.listData} getData={props.getListData} />
      <TestWebSocket data={props.test.websocketData} getData={props.getWebSocketData} />
      <TestSockJs data={props.test.sockJsData} getData={props.getSockJsData} />
      <TestChart data={props.test.eChartsData} getData={props.getEChartsData} />
      <ZWMap style={{width: '100%', height: '100%', position: 'fixed', top: 0, zIndex: -1}} />
    </div>
  );
};

export default TestContainer;
