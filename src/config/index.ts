/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 全局属性配置
 * @Date: 2019-10-16 10:57:25
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-01-02 16:04:22
 */

import { EProtocal, IConfig } from '@/interfaces/config';

/**
 * 全局配置
 */
const config: IConfig = {
  // 接口相关配置
  // =======本地调试可使用devServer的代理，解决跨域问题。如果后端处理跨域，则可根据需要配置port和host=============
  // protocol: EProtocal.HTTP,
  // port: 3001,
  // host: 'localhost',
  // =====================部署到服务端的配置，port和host为空，则默认相对服务环境的根路径=======================
  protocol: EProtocal.HTTP,
  // port: 3001,
  // host: 'localhost',
  // ================================================================================================

  // app相关配置
  basename: '/clbs/talkback/kanBanPage',
  mock: false,

  // 地图相关配置
  map: {
    mapKey: '3018bf7f400b01e710642d798b80eaf1',
    mapVersion: '1.4.15',
    mouseTool: {
      fillColor: '#00b0ff',
      strokeColor: '#80d8ff'
    }
  }
};

export default config;
