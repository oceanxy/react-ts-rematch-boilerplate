/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 全局配置定义
 * @Date: 2020-01-02 16:03:27
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-06-01 周一 17:24:19
 */

import Circle = AMap.Circle;
import Polygon = AMap.Polygon;

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
 * URL全局配置
 */
export interface IGlobalConfig {
  /**
   * 全局接口协议，默认“http://”
   * 注意：websocket链接时，'http://'将自动转换为'ws://'，'https://'将自动转换为'wss://'。
   * 注意：当使用SockJs代替websocket时，协议不会转换。因为SockJs使用HTTP协议，当websocket可用时，其内部会自动转换WS协议
   */
  protocol?: EProtocal
  /**
   * 全局接口主机IP。如果为假值，则HTTP协议的接口protocol和port字段无效；websocket接口默认为'localhost'
   */
  host?: string
  /**
   * 全局接口端口，默认8080
   */
  port?: number
}

/**
 * 全局配置
 */
export interface IConfig extends IGlobalConfig {
  /**
   * 全双工通信专用配置
   * 注意：
   *    如果配置此项，所有的websocket和SockJs接口会使用此配置覆盖全局的配置
   *    如果是生产环境且全局配置未设置protocol、host或port，则此配置项为必填项
   *    此配置可分别配置生产环境和开发环境，也可统一配置（单独配置的优先级更高）
   */
  websocket?: IGlobalConfig & {
    /**
     * 生产环境全局配置
     */
    prod?: IGlobalConfig
    /**
     * 开发环境全局配置
     */
    dev?: IGlobalConfig
  },
  /**
   * 根目录
   */
  basename: string
  /**
   * mock数据开关
   */
  mock: boolean
  /**
   * 地图相关设置
   */
  map: {
    /**
     * 地图的key
     */
    mapKey: string
    /**
     * 地图版本
     */
    mapVersion: string
    /**
     * 地图鼠标工具配置 目前只支持圆和矩形
     */
    mouseTool: Circle.Options & Polygon.Options
  } & AMap.Map.Options
}
