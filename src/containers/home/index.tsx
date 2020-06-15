/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 主页
 * @Date: 2019-12-28 15:00:02
 * @LastModified: Oceanxy
 * @LastModifiedTime: 2019-12-28 15:00:02
 */

import * as React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <>
      <h2>首页</h2>
      <hr />
      <Link to={'/test'} style={{color: '#ffffff'}}>进入测试页面</Link>
    </>
  );
};
