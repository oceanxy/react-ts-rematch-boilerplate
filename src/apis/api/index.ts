/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: api接口请求配置
 * @Date: 2019-11-06 10:33:00
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-03-23 14:59:01
 */

import { IFetchAPI } from '@/interfaces/api';
import { APIResponse, IPolling } from '@/interfaces/api/mock';
import { EHTTPMethod } from '@/interfaces/config';
import ReconnectingWebSocket from 'reconnecting-websocket';

export type APIName =
  'fetchEventDetails' | // 事件详情
  'fetchEventList' | // 事件列表
  'fetchSearchByMonitorName' | // 搜索-按监控对象搜索
  'fetchFences' | // 获取围栏数据
  'fetchAroundEvent' | // 资源统计-按突发事件
  'fetchRSByAdminRegions' | // 资源统计-按行政区划
  'fetchRSByFence' | // 资源统计-按区域（按围栏）
  // 以下为框架测试的API接口，正式发布项目时可删除
  'fetchTest' |
  'fetchTestWebsocket' |
  'fetchECharts' |
  'deleteData';

export type APIRequestConfig = {
  [K in APIName]: IFetchAPI;
};

export type FetchApis = {
  [K in keyof APIRequestConfig]: (
    data?: any,
    callback?: (response: APIResponse) => void
  ) => Promise<APIResponse & ReconnectingWebSocket & IPolling>;
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
    url: '/testWebSocket',
    // url: 'ws://121.40.165.18:8800',
    // url: 'ws://localhost:3002/testWebSocket',
    port: 3002, // websocket服务的端口
    isWebsocket: true // 如果是websocket长链接且url字段不是完整的websocket地址请务必设置为true
  },
  deleteData: {
    url: '/testDelete'
  },
  fetchECharts: {
    url: '/testECharts'
  },

  /**
   * 获取事件详情
   */
  fetchEventDetails: {
    url: '/clbs/web/v1/dispatch/event/details',
    method: EHTTPMethod.POST
  },
  /**
   * 获取事件列表
   */
  fetchEventList: {
    url: '/clbs/web/v1/dispatch/event/unhandledList',
    method: EHTTPMethod.POST
  },
  /**
   * 按监控对象搜索
   */
  fetchSearchByMonitorName: {
    url: '/clbs/web/v1/dispatch/monitor/search/byName',
    method: EHTTPMethod.POST
  },
  /**
   * 获取围栏数据
   */
  fetchFences: {
    url: '/clbs/web/v1/dispatch/fence/getFenceTree',
    method: EHTTPMethod.POST
  },
  /**
   * 突发事件周边资源
   */
  fetchAroundEvent: {
    url: '/clbs/web/v1/dispatch/resource/statistics/aroundEvent',
    method: EHTTPMethod.POST
  },
  /**
   * 按行政区划获取资源统计数据
   */
  fetchRSByAdminRegions: {
    url: '/clbs/web/v1/dispatch/resource/statistics/byCity',
    method: EHTTPMethod.POST
  },
  /**
   * 按范围（围栏）获取资源统计数据
   */
  fetchRSByFence: {
    url: '/clbs/web/v1/dispatch/resource/statistics/byFence',
    method: EHTTPMethod.POST
  }
};

export default apis;
