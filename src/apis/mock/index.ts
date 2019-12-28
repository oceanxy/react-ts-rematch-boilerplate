/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: mock数据模版
 * @Date: 2019-10-17 10:04:40
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2019-12-24 11:56:04
 */

import { APIName } from '@/apis';
import apis, { APIRequestConfig } from '@/apis/api';
import { mock } from 'mockjs';
import { APIResponse } from '@/interfaces/api/mock';

/**
 * mock数据集
 */
export type Mocks = {
  [K in APIName]: APIResponse
};

/**
 * 按接口生成mock数据
 * @param fetchName {keyof FetchAPIs} 接口名
 * @param isWebsocket {boolean} 是否是websocket访问
 */
export const productionData = (fetchName: keyof APIRequestConfig, isWebsocket?: boolean) => {
  // 如果是websocket长链接，则自定义请求路径，以便采用HTTP轮询的方式模拟数据
  if (isWebsocket) {
    mock(`/${fetchName}`, mocks[fetchName]);
  }

  mock(apis[fetchName].url, mocks[fetchName]);
};

/**
 * Mock数据生成规则
 * 注意返回对象内的fetchAPI名称需要与api目录内的相应名称对应
 */
const mocks: Mocks = {
  // 测试接口
  fetchTest: {
    code: 0,
    msg: '',
    data: {
      'name|+1': ['苹果', 'OPPO', '三星', '华为', '小米'],
      'value|10-100': 1,
      'child|2-5': [
        {
          name: '@cname',
          'value|10-100': 1
        }
      ]
    }
  },
  // 测试websocket接口
  fetchTestWebsocket: {
    code: 0,
    msg: '',
    data: {
      'name': 'websocket',
      'value|1-10': 1
    }
  },
  // 测试删除数据接口
  deleteData: {
    code: 0,
    msg: '',
    data: null
  }
};

export default mocks;
