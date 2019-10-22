import { IConfig } from '@/config';
import Mock from 'mockjs';
import apis, { IFetchAPIs } from './apis';
import mocks from './models';

const fetchApis: { [fetchApiName in keyof IFetchAPIs]: string } = {};

const fetchApi = (mocks: any, apis: IFetchAPIs) => (config: IConfig) => {
  Object.keys(apis).forEach(fetchApi => {
    if (config.mock || apis[fetchApi].forceMock) {
      Mock.mock(apis[fetchApi].url, mocks[fetchApi]);
    }

    fetchApis[fetchApi] = apis[fetchApi].url;
  });

  return fetchApis;
};

export const initFetchApi = fetchApi(mocks, apis);

export default fetchApis;
