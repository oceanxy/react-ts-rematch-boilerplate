import React, { useEffect } from 'react';
import './index.scss';

export default (props: any) => {
  const {data, websocketData, getData, getWebSocketData} = props;

  useEffect(() => {
    getData();
    getWebSocketData();
  }, []);

  return (
    <div>
      <div>数据列表：</div>
      {
        data &&
        data.child &&
        data.child.map((d: {value: number; name: string}, index: number) => {
          return (
            <div key={index} className="test">
              {d.name} {d.value}
            </div>
          );
        })
      }
      <div>websocket测试：</div>
      <div>接收到后端数据：{websocketData}</div>
    </div>
  );
};
