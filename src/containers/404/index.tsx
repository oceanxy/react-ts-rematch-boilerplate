/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 404页面
 * @Date: 2019-12-28 15:03:08
 * @LastModified: Oceanxy
 * @LastModifiedTime: 2019-12-28 15:03:08
 */

import * as React from 'react';
import config from '@/config';

export default () => {
  return (
    <>
      <h2>404</h2>
      <hr/>
      <div>糟糕，页面不存在！</div>
      <a href={config.basename}>返回首页</a>
    </>
  );
};
