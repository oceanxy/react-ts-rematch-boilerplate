/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: api接口请求配置
 * @Date: 2019-11-06 10:33:00
 * @LastModified: Oceanxy(xyzsyx@163.com)
 * @LastModifiedTime: 2020-04-25 周六 15:19:36q
 */

import { IFetchAPI, IFetchSockJs, IFetchWebsocket } from '@/interfaces/api';
import { APIResponse, IPolling } from '@/interfaces/api/mock';
import { EHTTPMethod, EProtocal } from '@/interfaces/config';
import ReconnectingWebSocket from 'reconnecting-websocket';

export type APIName =
  // 以下为框架测试的API接口，正式发布项目时可删除
  'fetchTest' |
  'fetchTestSockJs' |
  'fetchTestWebsocket' |
  'fetchECharts' |
  'deleteData';

export type APIRequestConfig = {
  [K in APIName]: IFetchAPI | IFetchSockJs | IFetchWebsocket;
};

export type FetchApis = {
  [K in keyof APIRequestConfig]: (() => Promise<APIResponse>) &
  ((params: any) => Promise<APIResponse>) &
  ((callback: (response: APIResponse) => void) => Promise<ReconnectingWebSocket & WebSocket & IPolling>)
};

/**
 * API接口请求配置
 * 注意返回对象内的fetchAPI名称需要与mock目录内的相应名称对应
 */
const apis: APIRequestConfig = {
  fetchTest: {
    url: '/test',
    forceMock: true
  },
  fetchTestWebsocket: {
    // protocol: EProtocal.HTTP,
    // host: 'localhost',
    port: 3002, // websocket服务的端口

    url: '/testWebSocket',
    // url: 'ws://121.40.165.18:8800',
    // url: 'ws://localhost:3002/testWebSocket',
    isWebsocket: true // 如果是websocket长链接且url字段不是完整的websocket地址请务必设置为true
  } as IFetchWebsocket,
  fetchTestSockJs: {
    // protocol: EProtocal.HTTP,
    // host: 'localhost',
    // port: 8080,

    url: '/testSockJs',
    isSockJs: true, // 如果后端采用SockJs包实现的全双工通信，请开启此配置，isWebsocket将失效
    enableStomp: true
  } as IFetchSockJs,
  deleteData: {
    url: '/testDelete'
  },
  fetchECharts: {
    url: '/testECharts'
  }
};

export default apis;
