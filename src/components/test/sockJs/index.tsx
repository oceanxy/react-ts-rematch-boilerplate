import React, { useEffect } from 'react';
import './index.scss';
import { IPolling } from '@/interfaces/api/mock';

interface IWebsocket {
  getData: () => WebSocket;
  data: {
    name: string;
    value: string;
  };
}

export default (props: IWebsocket) => {
  const { data, getData } = props;

  useEffect(() => {
    let sockJs: WebSocket | IPolling;

    (async function getSockJs() {
      sockJs = await getData();
    })();

    // 记得在组件卸载时关闭websocket连接（重要）
    return () => {
      sockJs.close();
    };
  }, []);

  return (
    <div className="sock-js">
      <div className='test-title'>SockJs测试：</div>
      <div>接收到后端数据：{data.value}</div>
    </div>
  );
};
