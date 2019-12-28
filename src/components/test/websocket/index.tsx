import React, { useEffect } from 'react';
import './index.scss';

interface IWebsocket {
  getData: () => void,
  data: {
    name: string,
    value: string
  }
}

export default (props: IWebsocket) => {
  const {data, getData} = props;

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="ws">
      <div>websocket测试：</div>
      <div>接收到后端数据：{data.value}</div>
    </div>
  );
};
