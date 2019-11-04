import React, { useEffect } from 'react';
import './index.scss';

export default (props: any) => {
  const { data, getData } = props;

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="ws">
      <div>websocket测试：</div>
      <div>接收到后端数据：{data}</div>
    </div>
  );
};
