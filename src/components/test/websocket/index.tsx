import React, { useEffect } from 'react';
import './index.scss';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { IPolling } from '@/interfaces/api/mock';

interface IWebsocket {
  getData: () => ReconnectingWebSocket;
  data: {
    name: string;
    value: string;
  };
}

export default (props: IWebsocket) => {
  const { data, getData } = props;

  useEffect(() => {
    let ws: ReconnectingWebSocket | IPolling;

    (async function getWS() {
      ws = await getData();
    })();

    // 记得在组件卸载时关闭websocket连接（重要）
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="">
      <div className='test-title'>websocket测试：</div>
      <div>接收到后端数据：{data.value}</div>
    </div>
  );
};
