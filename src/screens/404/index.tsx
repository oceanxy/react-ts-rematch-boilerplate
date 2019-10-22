import * as React from 'react';
import config from '@/config';

export default () => {
  return (
    <>
      <h2>404</h2>
      <div>糟糕，页面不存在！</div>
      <a href={config.basename}>返回首页</a>
    </>
  );
};
