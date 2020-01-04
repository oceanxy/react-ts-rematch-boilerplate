/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 测试页面组件组装
 * @Date: 2019-12-28 16:16:06
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-01-02 17:18:35
 */

import React from 'react';
import Increment from '@/components/test/increment';
import TestList from '@/components/test/list';
import TestWebSocket from '@/components/test/websocket';
import TestChart from '@/components/test/chart';
import Nav from '@/components/UI/nav';
import AMap from '@/components/UI/amap';
import config from '@/config';
import './index.scss';

const TestContainer = (props: {
  test: { count: any; listData: any; websocketData: any; eChartsData: any };
  increment: any;
  incrementAsync: any;
  getListData: any;
  getWebSocketData: any;
  getEChartsData: any;
}) => {
  return (
    <div className="test-color">
      <Nav />
      <Increment count={props.test.count} increment={props.increment} incrementAsync={props.incrementAsync} />
      <TestList data={props.test.listData} getData={props.getListData} />
      <TestWebSocket data={props.test.websocketData} getData={props.getWebSocketData} />
      <TestChart data={props.test.eChartsData} getData={props.getEChartsData} />
      <AMap mapKey={config.mapKey} style={{ width: '100%', height: '100%', position: 'fixed', top: 0, zIndex: -1 }} />
    </div>
  );
};

export default TestContainer;
