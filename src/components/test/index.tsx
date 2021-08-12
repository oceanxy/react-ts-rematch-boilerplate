/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: 测试页面组件组装
 * @Date: 2019-12-28 16:16:06
 * @LastModified: Oceanxy(xyzsyx@163.com)
 * @LastModifiedTime: 2020-05-28 周四 15:24:32
 */

import TestChart from '@/components/test/chart';
import Increment from '@/components/test/increment';
import TestList from '@/components/test/list';
import TestSockJs from '@/components/test/sockJs';
import TestWebSocket from '@/components/test/websocket';
import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

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
    <>
      <h2>测试页面</h2>
      <hr />
      <Link to={'/'} style={{color: '#ffffff'}}>返回主页</Link>

      <Increment count={props.test.count} increment={props.increment} incrementAsync={props.incrementAsync} />
      <TestList data={props.test.listData} getData={props.getListData} />
      <TestWebSocket data={props.test.websocketData} getData={props.getWebSocketData} />
      <TestSockJs data={props.test.sockJsData} getData={props.getSockJsData} />
      <TestChart data={props.test.eChartsData} getData={props.getEChartsData} />
    </>
  );
};

export default TestContainer;
