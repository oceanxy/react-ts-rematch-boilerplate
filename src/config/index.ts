/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 全局属性配置
 * @Date: 2019-10-16 10:57:25
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-01-02 16:04:22
 */

import { IConfig, EProtocal } from '@/interfaces/config';

/**
 * 全局配置
 */
const config: IConfig = {
  protocol: EProtocal.HTTP,
  port: 3001,
  host: 'localhost',
  basename: '/clbs/intercom',
  mock: true,

  mapKey: '3018bf7f400b01e710642d798b80eaf1'
};

export default config;
