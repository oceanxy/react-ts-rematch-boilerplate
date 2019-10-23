import { EProtocal, IConfig } from '@/config';
import apis, { EMethod, IFetchAPI, IFetchAPIs } from './apis';
import mocks, { productionData } from './models';
import Axios, { AxiosPromise } from 'axios';

type fetchApis = { [fetchApiName in keyof IFetchAPIs]: () => AxiosPromise | WebSocket };

const fetchApis: fetchApis = {};

/**
 * 处理请求的方式
 * @param fetchApi
 * @param config
 */
const fetchMethod = (fetchApi: IFetchAPI, config: IConfig): AxiosPromise | WebSocket => {
  // 如果开启了mock，并且这个接口是一个websocket长链接，同样走REST API接口
  if (fetchApi.isWebsocket && !(config.mock || fetchApi.forceMock)) {
    const protocol = config.protocol === EProtocal.HTTP ? 'ws://' : 'wss://';
    return new WebSocket('protocol + config.host + \':\' + config.port + fetchApi.url');
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
};

/**
 * 生成接口API函数
 * @param mocks
 * @param apis
 */
const fetchApi = (mocks: mocks, apis: IFetchAPIs) => (config: IConfig) => {
  Object.keys(apis).forEach(fetchApi => {
    if (config.mock || apis[fetchApi].forceMock) {
      productionData(mocks, apis, fetchApi);
    }

    fetchApis[fetchApi] = () => fetchMethod(apis[fetchApi], config);
  });

  return fetchApis;
};

export const initFetchApi = fetchApi(mocks, apis);

export default fetchApis;
