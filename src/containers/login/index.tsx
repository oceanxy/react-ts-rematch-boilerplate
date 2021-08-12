/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: 登录页面
 * @Date: 2019-12-28 15:00:02
 * @LastModified: Oceanxy
 * @LastModifiedTime: 2019-12-28 15:00:02
 */

import * as React from 'react';
import config from '@/config';

export default () => {
  return (
    <>
      <h2>登录</h2>
      <hr />
      <form action="/login">
        <div>
          <label htmlFor="username">
            账户：
            <input type="text" name='username' id='username' />
          </label>
        </div>
        <div>
          <label htmlFor="pwd">
            密码：
            <input type="password" name="password" id="pwd" />
          </label>
        </div>
        <button type='submit'>登录</button>
      </form>
    </>
  );
};
