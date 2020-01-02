/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 测试页面组件组装
 * @Date: 2019-12-28 16:16:06
 * @LastModified: Oceanxy
 * @LastModifiedTime: 2019-12-28 16:16:06
 */

import Increment from '@/components/test/increment';
import TestList from '@/components/test/list';
import TestWebSocket from '@/components/test/websocket';
import React from 'react';
import TestChart from '@/components/test/chart';
import Nav from '@/components/UI/nav';

const TestContainer = (props: {
  test: {count: any; listData: any; websocketData: any};
  increment: any;
  incrementAsync: any;
  getListData: any;
  getWebSocketData: any;
}) => {
  return (
    <>
      <Nav />
      <Increment count={props.test.count} increment={props.increment} incrementAsync={props.incrementAsync} />
      <TestList data={props.test.listData} getData={props.getListData} />
      <TestWebSocket data={props.test.websocketData} getData={props.getWebSocketData} />
      <TestChart />
    </>
  );
};

export default TestContainer;
