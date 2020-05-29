/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 为每个接口生成请求函数
 * @Date: 2019-11-06 10:31:45
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-28 周四 14:11:13
 */

import apis, { APIRequestConfig, FetchApis } from '@/apis/api';
import config from '@/config';
import { IFetchAPI, IFetchSockJs, IFetchWebsocket, WebsocketCallback } from '@/interfaces/api';
import { APIResponse, IPolling } from '@/interfaces/api/mock';
import { EHTTPMethod, EProtocal } from '@/interfaces/config';
import Axios, { AxiosResponse } from 'axios';
import _ from 'lodash';
import qs from 'qs';
import ReconnectingWebSocket from 'reconnecting-websocket';
import SockJS from 'sockjs-client';
import stomp, { Frame } from 'stompjs';
import DEV_SERVER_CONFIG from '../../build/config';
import mocks, { Mocks, productionData } from './mock';

/**
 * 拼接URL
 * @param fetchApi {IFetchAPI} API接口请求配置
 */
function stitchingURL(fetchApi: IFetchAPI | IFetchWebsocket | IFetchSockJs): string {
  // 拼接协议
  let protocols = fetchApi.protocol ? fetchApi.protocol : config.protocol;

  // websocket转换为ws协议
  if ('isWebsocket' in fetchApi && fetchApi.isWebsocket && (config.protocol === EProtocal.HTTP || config.protocol === EProtocal.HTTPS)) {
    protocols = protocols === EProtocal.HTTP ? EProtocal.WS : EProtocal.WSS;
  }

  // 如果服务端口未设置，则使用全局配置的端口
  const port = fetchApi.port ? fetchApi.port : config.port;
  // 如果host未设置，则使用全局配置的host
  const host = fetchApi.host ? fetchApi.host : config.host;

  // 如果接口以及全局配置均未设置port或host，则使用相对路径。如果是websocket或SockJs，则使用默认值，保证websocket链接是完整的URL
  if (!port || !host) {
    if ('isSockJs' in fetchApi || 'isWebsocket' in fetchApi) {
      let envPort: any;

      // 用 IP+PORT 代替域名
      if (host?.match(/^(((\\d{1,2})|(1\\d{2})|(2[0-4]\\d)|(25[0-5]))\\.){3}((\\d{1,2})|(1\\d{2})|(2[0-4]\\d)|(25[0-5]))$/)) {
        // 检查当前环境
        if (process.env.NODE_ENV === 'development') {
          envPort = DEV_SERVER_CONFIG.devServer.port;
        } else {
          envPort = 8080; // 默认8080
        }

        return `${protocols}${host || 'localhost'}:${port || envPort}${fetchApi.url}`;
      }

      // 用域名
      return `${protocols}${host || 'localhost'}${fetchApi.url}`;
    }

    return fetchApi.url;
  }

  return `${protocols}${host}:${port}${fetchApi.url}`;
}

/**
 * 建立SockJs全双工通道
 * @param {IFetchSockJs} fetchApi API接口请求配置
 * @param {WebsocketCallback} callback SockJs接收消息的回调函数
 * @returns {Promise<WebSocket>}
 */
function fetchSockJs(fetchApi: IFetchSockJs, callback: WebsocketCallback): Promise<WebSocket> {
  let url = fetchApi.url;
  // 如果URL内不带协议，需要自动拼接可访问的URL
  if (!fetchApi.url.match(/^https?:\/\//)) {
    url = stitchingURL(fetchApi);
  }

  return new Promise(((resolve, reject) => {
    const sockJS = new SockJS(url);

    if (!fetchApi.enableStomp) {
      sockJS.onopen = () => {
        resolve(sockJS);
      };
      sockJS.onerror = err => {
        reject(err);
      };

      if (_.isFunction(callback)) {
        sockJS.onmessage = (messageEvent: WebSocketMessageEvent) => {
          callback(JSON.parse(messageEvent.data));
        };
      }
    } else {
      const stompClient = stomp.over(sockJS);

      stompClient.connect({}, (frame?: Frame) => {
        if (_.isFunction(callback)) {
          callback(stompClient, frame);
        }

        resolve(stompClient);
      }, (error: Frame | string) => {
        reject(error);
      });
    }
  }))
    .then(sockJs => sockJs)
    .catch(error => {
      console.error('SockJs连接失败, 请检查网络是否正常或者SockJs服务是否存在:', error);
    }) as Promise<WebSocket>;
}

/**
 * 建立websocket通道
 * @param {IFetchWebsocket} fetchApi API接口请求配置
 * @param {WebsocketCallback} callback websocket接收消息的回调函数
 * @returns {Promise<ReconnectingWebSocket>}
 */
function fetchWebSocket(fetchApi: IFetchWebsocket, callback: WebsocketCallback): Promise<ReconnectingWebSocket> {
  return new Promise((resolve, reject) => {
    let ws: ReconnectingWebSocket;
    // 检查是否在api中配置了完整的websocket URL
    // 如果是完整地websocket URL，则不再拼接URL
    if (fetchApi.url.includes(EProtocal.WS) || fetchApi.url.includes(EProtocal.WSS)) {
      ws = new ReconnectingWebSocket(fetchApi.url, '');
    } else {
      ws = new ReconnectingWebSocket(stitchingURL(fetchApi), '');
    }

    ws.onopen = () => {
      resolve(ws);
    };
    ws.onerror = err => {
      reject(err);
    };

    if (_.isFunction(callback)) {
      ws.onmessage = (messageEvent: MessageEvent) => {
        callback(JSON.parse(messageEvent.data));
      };
    }
  })
    .then(ws => ws)
    .catch(error => {
      console.error('websocket连接失败, 请检查网络是否正常或者websocket服务是否存在:', error);
    }) as Promise<ReconnectingWebSocket>;
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

  // 实例化Axios对象
  const axios = Axios.create({});

  return new Promise<AxiosResponse>((resolve => {
    let axiosResponse;

    // 根据配置的HTTP Method来发送请求
    switch (fetchApi.method) {
      case EHTTPMethod.POST:
        axiosResponse = axios.post(
          url,
          qs.stringify(params, {arrayFormat: 'comma'}),
          {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
        );
        break;
      case EHTTPMethod.DELETE:
        axiosResponse = axios.delete(url, params);
        break;
      case EHTTPMethod.PUT:
        axiosResponse = axios.put(url, params);
        break;
      case EHTTPMethod.GET:
      default:
        axiosResponse = axios.get(url, params);
        break;
    }

    // 返回数据/捕获异常
    axiosResponse
      .then((data: AxiosResponse) => resolve(data))
      .catch(reason => resolve(<AxiosResponse> {
        data: {retCode: 0, retMsg: 'request failed!', data: {}},
        ...reason
      }));
  }));
}

/**
 * 使用HTTP轮询模拟websocket
 * @param fetchApi {APIRequestConfig} API接口请求配置
 * @param callback {WebsocketCallback} websocket接收消息的回调函数
 */
async function fetchPolling(fetchApi: IFetchAPI, callback: WebsocketCallback): Promise<IPolling> {
  // 首次加载时不延迟，立即请求数据
  const response = await fetchHttp(fetchApi);
  callback(response.data);

  // 初始化轮询
  const polling = setInterval(async () => {
    const response = await fetchHttp(fetchApi);
    callback(response.data);
  }, 1000);

  return <IPolling> {
    close: () => clearInterval(polling),
    reconnect: () => {
    }
  };
}

/**
 * 处理请求的方式
 * @param {IFetchAPI | IFetchSockJs | IFetchWebsocket} fetchApi API接口请求配置
 * @param {any | WebsocketCallback} params 请求参数或者websocket接收消息的回调函数
 * @returns {Promise<APIResponse | IPolling | ReconnectingWebSocket | WebSocket>}
 */
async function fetchMethod(
  fetchApi: IFetchAPI | IFetchSockJs | IFetchWebsocket,
  params?: WebsocketCallback | any
): Promise<APIResponse | IPolling | ReconnectingWebSocket | WebSocket> {
  if (
    ('isSockJs' in fetchApi && fetchApi.isSockJs) ||
    ('isWebsocket' in fetchApi && fetchApi.isWebsocket) ||
    fetchApi.url.match(/^wss?:\/\//)
  ) {
    // 当开启mock数据时，使用轮询的方式模拟websocket
    if (config.mock || fetchApi.forceMock) {
      const polling = await fetchPolling(fetchApi, params as WebsocketCallback);
      return <IPolling> polling;
    } else {
      // 检测是否开启了SockJs功能
      if ('isSockJs' in fetchApi && fetchApi.isSockJs) {
        // 从SockJs服务端获取数据
        const sockJs = await fetchSockJs(fetchApi as IFetchSockJs, params as WebsocketCallback);
        return <WebSocket> sockJs;
      } else /** websocket长链接 */ {
        // 从websocket服务器获取数据
        const ws = await fetchWebSocket(fetchApi as IFetchWebsocket, params as WebsocketCallback);
        return <ReconnectingWebSocket> ws;
      }

    }
  } else /** 使用HTTP获取数据（开启Mock数据时，HTTP请求会被mockjs拦截，否则则向服务端获取数据） */ {
    const response: AxiosResponse = await fetchHttp(fetchApi, params);
    return <APIResponse> response.data;
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
     * 返回包含所有接口请求函数的对象
     * @param params 请求数据
     * @returns {Promise<APIResponse | IPolling | ReconnectingWebSocket | WebSocket>}
     */
    fetchApis[fetchName] = (params?: any | WebsocketCallback) => fetchMethod(fetchApi, params);
  });

  return <FetchApis> fetchApis;
};

export const initFetchApi = fetchApi(mocks, apis);
export default <FetchApis> fetchApis;
