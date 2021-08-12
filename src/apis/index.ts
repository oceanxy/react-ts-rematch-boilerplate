/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: 为每个接口生成请求函数
 * @Date: 2019-11-06 10:31:45
 * @LastModified: Oceanxy(xyzsyx@163.com)
 * @LastModifiedTime: 2020-06-02 周二 14:59:21
 */

import apis, { APIRequestConfig, FetchApis } from '@/apis/api';
import config from '@/config';
import { IFetchAPI, IFetchSockJs, IFetchWebsocket, WebsocketCallback } from '@/interfaces/api';
import { APIResponse, IPolling } from '@/interfaces/api/mock';
import { EHTTPMethod, EProtocal, IGlobalConfig } from '@/interfaces/config';
import Axios, { AxiosResponse } from 'axios';
import _ from 'lodash';
import qs from 'qs';
import ReconnectingWebSocket from 'reconnecting-websocket';
import SockJS from 'sockjs-client';
import stomp, { Frame } from 'stompjs';
import DEV_SERVER_CONFIG from '../../build/config';
import mocks, { Mocks, productionData } from './mock';

// 匹配IP的正则表达式
const ip = /^([0,1]?\d{1,2}|2([0-4][0-9]|5[0-5]))(\.([0,1]?\d{1,2}|2([0-4][0-9]|5[0-5]))){3}$/;
// 当前环境是否是开发环境
const isDev = process.env.NODE_ENV === 'development';

/**
 * 拼接URL
 * @param fetchApi {IFetchAPI} API接口请求配置
 */
function stitchingURL(fetchApi: IFetchAPI | IFetchWebsocket | IFetchSockJs): string {
  // URL默认配置
  const defaultWebsocketConfig: IGlobalConfig = {
    protocol: EProtocal.HTTP,
    host: 'localhost',
    port: isDev ? DEV_SERVER_CONFIG.devServer.port : 8080
  };

  // 全双工通信，需要拼接完整URL
  if (
    ('isSockJs' in fetchApi && fetchApi.isSockJs) ||
    ('isWebsocket' in fetchApi && fetchApi.isWebsocket)
  ) {
    // 处理websocket配置。config.websocket里面的配置，层级越深，优先级越高
    const websocketConfig = {
      ...defaultWebsocketConfig,
      ...config,
      ...config.websocket,
      ...isDev ? config.websocket?.dev : config.websocket?.prod
    };

    // Websocket接口，HTTP协议转换为WS协议。SockJs接口不作处理
    if (
      'isWebsocket' in fetchApi && fetchApi.isWebsocket &&
      'isSockJs' in fetchApi && !fetchApi.isSockJs &&
      websocketConfig.protocol!.match(/^https?:\/\/$/)
    ) {
      websocketConfig.protocol = websocketConfig.protocol === EProtocal.HTTPS ? EProtocal.WSS : EProtocal.WS;
    }

    // protocol(WS)+ip+port
    if (websocketConfig.host === 'localhost' || websocketConfig.host!.match(ip)) {
      return `${websocketConfig.protocol}${websocketConfig.host}:${websocketConfig.port}${fetchApi.url}`;
    }

    // protocol(WS)+域名
    return `${websocketConfig.protocol}${websocketConfig.host}${fetchApi.url}`;
  } else {
    // 如果协议未设置，则使用全局配置的协议
    let protocol = fetchApi.protocol ? fetchApi.protocol : config.protocol;
    // 如果host未设置，则使用全局配置的host
    let host = fetchApi.host ? fetchApi.host : config.host;
    // 如果端口未设置，则使用全局配置的端口
    let port = fetchApi.port ? fetchApi.port : config.port;

    // 当host值不存在，则protocol和port无效，此时直接返回接口路径
    if (!host) {
      return fetchApi.url;
    } else {
      // protocol(HTTP)+ip+port
      if (host === 'localhost' || host.match(ip)) {
        return `${protocol || defaultWebsocketConfig.protocol}${host}:${port || defaultWebsocketConfig.port}${fetchApi.url}`;
      }

      // protocol(HTTP)+域名
      return `${protocol}${host}${fetchApi.url}`;
    }
  }
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
  if (!fetchApi.url.match(/^https?:\/\/$/)) {
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
      if (fetchApi.url.match(/^wss?:\/\//) ||
        ( 'isWebsocket' in fetchApi && fetchApi.isWebsocket) ||
        ( 'isSockJs' in fetchApi && fetchApi.isSockJs)
      ) {
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
