/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 接口API函数约束
 * @Date: 2019-12-23 17:06:41
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2019-12-26 17:03:14
 */

import { APIResponse } from '@/interfaces/api/mock';
import { EHTTPMethod, EProtocal } from '@/interfaces/config';

export type WebsocketCallback = (response: APIResponse) => void

export interface IFetchAPI {
  /**
   * 后台接口的地址
   * url写法
   *  1. 完整的URL：如 http://127.0.0.1:8080/path，ws://example.com/path
   *  2. 路径+接口名写法：如 /path/name
   * 采用第一种写法时，以下字段会失效。isWebsocket、port、host和protocol。即完整的URL拥有最高优先级。否则采用自动拼接的URL发送接口请求。
   * 采用第二种写法时，以下字段：port、host和protocol如未定义，则会使用全局默认的配置（config文件里面的配置）
   */
  url: string
  /**
   * 强制开启mock
   * 当全局mock设置为false的时候，如果此配置为true，则该接口的请求依旧会被mockjs拦截
   */
  forceMock?: boolean
  /**
   * 请求接口方式（HTTP Method）
   * 如果isWebsocket为true，则自动转换为websocket对应的protocol
   */
  method?: EHTTPMethod
  /**
   * 是否是websocket长链接
   * 注意：websocket不支持mock，开发时请在 /build/websocketServer/index.js 编写本地websocket服务的逻辑，用于模拟数据支撑。或者使用轮询来代替。
   * 注意：如果是websocket长链接且url字段不是完整的websocket地址，请务必设置为true
   */
  isWebsocket?: boolean
  /**
   * 是否采用原生websocket
   */
  isNativeWebsocket?: boolean

  /**
   * 单独指定端口
   * 如果这个值为空则使用全局的port（即config文件里面配置的port）
   */
  port?: number
  /**
   * 单独指定主机IP
   * 如果这个值为空则使用全局的host（即config文件里面配置的host）
   */
  host?: string
  /**
   * 单独指定协议
   * 如果这个值为空则使用全局的protocol（即config文件里面配置的protocol）
   * 注意：如果isWebsocket为true，则这个字段会自动转换为websocket对应的协议，即：
   *  http:// => ws://
   *  https:// => wss://
   */
  protocol?: EProtocal

  /**
   * 自定义配置项
   * 为特殊情况预留
   */
  [otherConfig: string]: any
}
