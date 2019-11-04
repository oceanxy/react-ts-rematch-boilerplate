import Increment from '@/components/test/increment';
import TestList from '@/components/test/list';
import TestWebSocket from '@/components/test/websocket';
import React from 'react';

const TestContainer = (props: {
  test: { count: any; data: any; websocketData: any };
  increment: any;
  incrementAsync: any;
  getData: any;
  getWebSocketData: any;
}) => {
  return (
    <>
      <Increment count={props.test.count} increment={props.increment} incrementAsync={props.incrementAsync} />
      <TestList data={props.test.data} getData={props.getData} />
      <TestWebSocket data={props.test.websocketData} getData={props.getWebSocketData} />
    </>
  );
};

export default TestContainer;
