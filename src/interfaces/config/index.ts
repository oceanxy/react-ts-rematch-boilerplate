/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 全局配置定义
 * @Date: 2020-01-02 16:03:27
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-14 周四 17:56:56
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
  host?: string
  /**
   * 全局接口端口
   */
  port?: number
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
