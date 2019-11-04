import { EProtocal, IConfig } from '@/config';
import apis, { EMethod, IFetchAPI, IFetchAPIs } from './apis';
import mocks, { productionData } from './models';
import Axios, { AxiosResponse } from 'axios';
import ReconnectingWebSocket from 'reconnecting-websocket';

type fetchApis = { [fetchApiName in keyof IFetchAPIs]: (callback?: (msg: any) => any) => Promise<AxiosResponse> };

const fetchApis: fetchApis = {};

/**
 * 处理websocket长链接
 * @param config
 * @param fetchApi
 * @param callback
 */
function fetchWebSocket(
  config: IConfig,
  fetchApi: IFetchAPI,
  callback?: (axiosResponse: AxiosResponse) => void
): Promise<ReconnectingWebSocket> {
  return new Promise((resolve, reject) => {
    let ws: ReconnectingWebSocket;
    // 检查是否在api中配置了完整的websocket URL
    // 如果是完整地websocket URL，则不再拼接URL
    if (fetchApi.url.includes('ws://') || fetchApi.url.includes('wss://')) {
      ws = new ReconnectingWebSocket(fetchApi.url);
    } else {
      // 拼接URL并实例化websocket
      const protocol = config.protocol === EProtocal.HTTP ? 'ws://' : 'wss://';
      ws = new ReconnectingWebSocket(protocol + config.host + ':' + config.port + fetchApi.url);
    }

    ws.onopen = () => resolve(ws);
    ws.onerror = reject;
    ws.onmessage = (messageEvent: MessageEvent) => {
      callback && callback(<AxiosResponse<ReconnectingWebSocket>>{ data: JSON.parse(messageEvent.data) });
    };
  });
}

/**
 * 处理请求的方式
 * @param fetchApi
 * @param config
 * @param callback
 */
async function fetchMethod(fetchApi: IFetchAPI, config: IConfig, callback?: (msg: any) => any): Promise<AxiosResponse> {
  // 如果开启了mock，并且这个接口是一个websocket长链接，使用REST API接口来替代websocket，便于mockjs拦截并返回mock数据
  if (fetchApi.isWebsocket && !(config.mock || fetchApi.forceMock)) {
    const ws = await fetchWebSocket(config, fetchApi, callback);
    return <AxiosResponse<ReconnectingWebSocket>>{ data: ws };
  } else {
    // 开启mock时不用拼接url
    let protocol = '';
    if (!config.mock && !fetchApi.forceMock) {
      // 关闭mock时拼接完整url
      protocol = config.protocol + config.host + ':' + config.port;
    }

    // 根据配置的REST API method来发送请求
    if (!fetchApi.method || fetchApi.method === EMethod.GET) {
      return Axios.get(protocol + fetchApi.url);
    }

    return Axios.post(protocol + fetchApi.url);
  }
}

/**
 * 生成接口API函数
 * @param mocks
 * @param apis
 */
const fetchApi = (mocks: mocks, apis: IFetchAPIs) => (config: IConfig) => {
  Object.keys(apis).forEach(fetchApi => {
    // 检测mock开关
    if (config.mock || apis[fetchApi].forceMock) {
      // 检测是否是websocket长链接且url是否是一个完整的websocket协议
      if (!apis[fetchApi].url.includes('ws://') && !apis[fetchApi].url.includes('wss://')) {
        productionData(mocks, apis, fetchApi);
      }
    }

    fetchApis[fetchApi] = (callback?) => fetchMethod(apis[fetchApi], config, callback);
  });

  return fetchApis;
};

export const initFetchApi = fetchApi(mocks, apis);

export default fetchApis;
