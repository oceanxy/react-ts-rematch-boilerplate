/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 生成接口请求函数
 * @Date: 2019-11-06 10:31:45
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2019-12-28 09:09:56
 */

import apis, { APIRequestConfig, FetchApis } from '@/apis/api';
import config from '@/config';
import { IFetchAPI, WebsocketCallback } from '@/interfaces/api';
import { APIResponse, IPolling } from '@/interfaces/api/mock';
import { EHTTPMethod, EProtocal } from '@/interfaces/config';
import Axios, { AxiosResponse } from 'axios';
import _ from 'lodash';
import ReconnectingWebSocket from 'reconnecting-websocket';
import mocks, { Mocks, productionData } from './mock';

/**
 * 拼接URL
 * @param fetchApi {IFetchAPI} API接口请求配置
 */
function stitchingURL(fetchApi: IFetchAPI): string {
  // 拼接URL并实例化websocket
  let protocols = fetchApi.protocol ? fetchApi.protocol : config.protocol;
  if (fetchApi.isWebsocket) {
    protocols = config.protocol === EProtocal.HTTP ? EProtocal.WS : EProtocal.WSS;
  }
  // 如果websocket的服务端口是另外的端口，则使用另外的端口
  const port = fetchApi.port ? fetchApi.port : config.port;
  // 如果websocket的主机是另外的主机，则使用另外的主机
  const host = fetchApi.host ? fetchApi.host : config.host;

  return `${protocols}${host}:${port}${fetchApi.url}`;
}

/**
 * 建立websocket通道
 * @param fetchApi {APIRequestConfig} API接口请求配置
 * @param [params] {any} 请求参数
 * @param [callback] {WebsocketCallback} websocket接收消息的回调函数
 */
function fetchWebSocket(fetchApi: IFetchAPI, params?: any, callback?: WebsocketCallback): Promise<ReconnectingWebSocket> {
  return new Promise((resolve, reject) => {
    let ws: ReconnectingWebSocket;
    // 检查是否在api中配置了完整的websocket URL
    // 如果是完整地websocket URL，则不再拼接URL
    if (fetchApi.url.includes(EProtocal.WS) || fetchApi.url.includes(EProtocal.WSS)) {
      ws = new ReconnectingWebSocket(fetchApi.url, '', params);
    } else {
      ws = new ReconnectingWebSocket(stitchingURL(fetchApi), '', params);
    }

    ws.onopen = () => resolve(ws);
    ws.onerror = reject;
    ws.onmessage = (messageEvent: MessageEvent) => {
      callback && callback(JSON.parse(messageEvent.data));
    };
  });
}

/**
 * 发送HTTP（Axios）请求
 * @param fetchApi {APIRequestConfig} API接口请求配置
 * @param [params] {any} Axios请求配置
 */
function fetchHttp(fetchApi: IFetchAPI, params?: any): Promise<AxiosResponse> {
  let url = fetchApi.url;
  // 如果URL内不带协议或未开启mock时，需要自动拼接可访问的URL
  if (!fetchApi.url.match(/^https?:\/\//) && !config.mock && !fetchApi.forceMock) {
    url = stitchingURL(fetchApi);
  }

  // 根据配置的HTTP Method来发送请求
  switch (fetchApi.method) {
    case EHTTPMethod.POST:
      return Axios.post(url, params);
    case EHTTPMethod.DELETE:
      return Axios.delete(url, params);
    case EHTTPMethod.PUT:
      return Axios.put(url, params);
    case EHTTPMethod.GET:
    default:
      return Axios.get(url, {params});
  }
}

/**
 * 使用HTTP轮询模拟websocket
 * @param fetchApi {APIRequestConfig} API接口请求配置
 * @param [params] {any} 请求数据
 * @param [callback] {WebsocketCallback} websocket接收消息的回调函数
 */
async function fetchPolling(fetchApi: IFetchAPI, params?: any, callback?: WebsocketCallback): Promise<IPolling> {
  // 首次加载时不延迟，立即请求数据
  const response = await fetchHttp(fetchApi, params);
  callback && callback(response.data);

  // 初始化轮询
  const polling = setInterval(async () => {
    if (callback) {
      const response = await fetchHttp(fetchApi, params);
      callback(response.data);
    }
  }, 1000);

  return <IPolling> {
    close: () => clearInterval(polling),
    reconnect: () => {
    }
  };
}

/**
 * 处理请求的方式
 * @param fetchApi {APIRequestConfig} API接口请求配置
 * @param [params] {any} 请求数据
 * @param [callback] {WebsocketCallback} websocket接收消息的回调函数
 */
async function fetchMethod(
  fetchApi: IFetchAPI,
  params?: any,
  callback?: WebsocketCallback
): Promise<APIResponse | IPolling | ReconnectingWebSocket> {
  // 处理参数
  // 当data和callback两者只传入其一时，检测这个传入参数的类型，并做相应的值转换
  if (_.isFunction(params)) {
    callback = params;
  }

  // 检测是否是websocket长链接
  if (fetchApi.isWebsocket || fetchApi.url.match(/^wss?:\/\//)) {
    // 当开启mock数据时，使用轮询的方式模拟websocket
    if (config.mock || fetchApi.forceMock) {
      const polling = await fetchPolling(fetchApi, params, callback);
      return <IPolling> polling;
    } else {
      // 使用websocket获取数据
      const ws = await fetchWebSocket(fetchApi, params, callback);
      return <ReconnectingWebSocket> ws;
    }
  } else {
    // 使用HTTP获取数据（开启Mock数据时，HTTP请求会被mockjs拦截，否则向服务端获取数据）
    const response: AxiosResponse = await fetchHttp(fetchApi, params);
    return <APIResponse> {data: response.data};
  }
}

/**
 * 封装了请求api接口数据的函数的一个对象
 */
const fetchApis: any = {};

/**
 * 生成接口API函数
 * @param mocks {Mocks} 模拟数据模型对象
 * @param apis {APIRequestConfig} API接口请求配置
 */
const fetchApi = (mocks: Mocks, apis: APIRequestConfig) => () => {
  Object.entries(apis).forEach(([fetchName, fetchApi]) => {
    // 检测mock开关
    if (config.mock || fetchApi.forceMock) {
      // 检测URL是否带有websocket协议或该API是否开启了websocket功能，以选择生成mock数据的方式
      if (fetchApi.url.match(/^wss?:\/\//) || fetchApi.isWebsocket) {
        // 生成mock数据
        productionData(<keyof APIRequestConfig> fetchName, true);
      } else {
        productionData(<keyof APIRequestConfig> fetchName);
      }
    }

    /**
     * 返回包含所有API函数的对象
     * @param {any} [params] 请求数据
     * @param {WebsocketCallback} [callback] websocket请求时必传的回调函数
     */
    fetchApis[fetchName] = (params?: any, callback?: WebsocketCallback) => fetchMethod(fetchApi, params, callback);
  });

  return <FetchApis> fetchApis;
};

export const initFetchApi = fetchApi(mocks, apis);
export default <FetchApis> fetchApis;
