/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: 全局属性配置
 * @Date: 2019-10-16 10:57:25
 * @LastModified: Oceanxy(xyzsyx@163.com)
 * @LastModifiedTime: 2020-06-01 周一 17:23:09
 */

import { EProtocal, IConfig } from '@/interfaces/config';

/**
 * 全局配置
 */
const config: IConfig = {
  /**
   * 接口配置说明（port、host和protocol三项的配置说明）
   * 当host为域名时，port无效
   *
   * - 本地调试配置样例。如果有跨域问题，可使用webpack的devServer代理。如果是后端处理跨域，则根据实际情况配置port、host以及protocol
   * PS：本地时推荐不配置此三项，会自动使用默认值
   * {
   *   protocol: EProtocal.HTTP,
   *   port: 8080,
   *   host: 'localhost'
   * }
   *
   * - 生产环境配置样例。port、host和protocol为空，则除全双工通道以外的接口默认为相对服务环境的根路径，全双工通道需要在websocket配置项内单独配置
   *
   * I. 按域名配置全局生产环境配置
   * {
   *   protocol: EProtocal.HTTPS,
   *   host: 'zw.iwalkie.cn'
   * }
   *
   * II. 按IP配置全局生产环境配置
   * {
   *   protocol: EProtocal.HTTPS,
   *   host: '192.168.1.1',
   *   port: 8080
   * }
   *
   * III. 使用部署服务器的相对路径，此时可省略全局protocol/port/host配置，但此时必须为全双工通信配置单独的protocol/port/host
   * {
   *   websocket: {
   *     protocol: EProtocal.HTTPS,
   *     port: 8080,
   *     host: '192.168.1.1'
   *   }
   * }
   *
   * IV. 为开发环境和生产环境分别配置全双工通信的protocol/port/host
   * {
   *   websocket: {
   *     prod: {
   *       protocol: EProtocal.HTTPS,
   *       port: 8080,
   *       host: '192.168.1.1'
   *     },
   *     // 推荐省略dev配置，自动使用默认值
   *     dev: {
   *       protocol: EProtocal.HTTP,
   *       port: 3001,
   *       host: 'localhost'
   *     }
   *   }
   * }
   */
  // protocol: EProtocal.HTTP,
  // host: 'localhost',
  // port: 8080,
  websocket: {
    prod: {
      protocol: EProtocal.HTTPS,
      host: 'zw.iwalkie.cn'
    }
  },

  // app及路由相关配置
  basename: '/',
  // mock数据开关
  mock: true,

  // 地图相关配置
  map: {
    // 此mapkey是xyzsyx@163.com的私人账号申请的key，后续可能失效，请及时更换
    mapKey: '3018bf7f400b01e710642d798b80eaf1',
    mapVersion: '1.4.15',
    mouseTool: {
      fillColor: '#00b0ff',
      strokeColor: '#80d8ff'
    }
  }
};

export default config;
