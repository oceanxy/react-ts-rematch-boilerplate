/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: api接口请求配置
 * @Date: 2019-11-06 10:33:00
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2019-12-26 15:44:17
 */

import { APIName } from '@/apis';
import { IFetchAPI } from '@/interfaces/api';

export type APIRequestConfig = {
  [K in APIName]: IFetchAPI
}

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
    url: '/testWebSocket',
    // url: 'ws://121.40.165.18:8800',
    // url: 'ws://localhost:3002/testWebSocket',
    port: 3002, // websocket服务的端口
    isWebsocket: true // 如果是websocket长链接且url字段不是完整的websocket地址请务必设置为true
  },
  deleteData: {
    url: '/testDelete'
  }
};

export default apis;
