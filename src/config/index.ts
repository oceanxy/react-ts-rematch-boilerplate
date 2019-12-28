/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 全局属性配置
 * @Date: 2019-10-16 10:57:25
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2019-12-24 11:48:39
 */

export enum EHTTPMethod {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export enum EProtocal {
  HTTP = 'http://',
  HTTPS = 'https://',
  WS = 'ws://',
  WSS = 'wss://'
}

/**
 * 全局配置
 */
export interface IConfig {
  /**
   * 全局接口协议
   * 注意：websocket链接时，'http://'将自动转换为'ws://'，'https://'将自动转换为'wss://'
   */
  protocol: EProtocal
  /**
   * 全局接口主机IP
   */
  host: string
  /**
   * 全局接口端口
   */
  port: number
  /**
   * 根目录
   */
  basename: string
  /**
   * mock数据开关
   */
  mock: boolean
}

/**
 * 全局配置
 */
const config: IConfig = {
  protocol: EProtocal.HTTP,
  port: 3001,
  host: 'localhost',
  basename: '/clbs/intercom',
  mock: false
};

export default config;
