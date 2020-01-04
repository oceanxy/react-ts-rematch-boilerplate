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
  [K in APIName]: APIResponse;
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
      name: 'websocket',
      'value|1-10': 1
    }
  },
  // 测试删除数据接口
  deleteData: {
    code: 0,
    msg: '',
    data: null
  },
  fetchECharts: {
    code: 0,
    msg: '',
    data: [
      [
        [28604, 77, 17096869, 'Australia', 1990],
        [31163, 77.4, 27662440, 'Canada', 1990],
        [1516, 68, 1154605773, 'China', 1990],
        [13670, 74.7, 10582082, 'Cuba', 1990],
        [28599, 75, 4986705, 'Finland', 1990],
        [29476, 77.1, 56943299, 'France', 1990],
        [31476, 75.4, 78958237, 'Germany', 1990],
        [28666, 78.1, 254830, 'Iceland', 1990],
        [1777, 57.7, 870601776, 'India', 1990],
        [29550, 79.1, 122249285, 'Japan', 1990],
        [2076, 67.9, 20194354, 'North Korea', 1990],
        [12087, 72, 42972254, 'South Korea', 1990],
        [24021, 75.4, 3397534, 'New Zealand', 1990],
        [43296, 76.8, 4240375, 'Norway', 1990],
        [10088, 70.8, 38195258, 'Poland', 1990],
        [19349, 69.6, 147568552, 'Russia', 1990],
        [10670, 67.3, 53994605, 'Turkey', 1990],
        [26424, 75.7, 57110117, 'United Kingdom', 1990],
        [37062, 75.4, 252847810, 'United States', 1990]
      ],
      [
        [44056, 81.8, 23968973, 'Australia', 2015],
        [43294, 81.7, 35939927, 'Canada', 2015],
        [13334, 76.9, 1376048943, 'China', 2015],
        [21291, 78.5, 11389562, 'Cuba', 2015],
        [38923, 80.8, 5503457, 'Finland', 2015],
        [37599, 81.9, 64395345, 'France', 2015],
        [44053, 81.1, 80688545, 'Germany', 2015],
        [42182, 82.8, 329425, 'Iceland', 2015],
        [5903, 66.8, 1311050527, 'India', 2015],
        [36162, 83.5, 126573481, 'Japan', 2015],
        [1390, 71.4, 25155317, 'North Korea', 2015],
        [34644, 80.7, 50293439, 'South Korea', 2015],
        [34186, 80.6, 4528526, 'New Zealand', 2015],
        [64304, 81.6, 5210967, 'Norway', 2015],
        [24787, 77.3, 38611794, 'Poland', 2015],
        [23038, 73.13, 143456918, 'Russia', 2015],
        [19360, 76.5, 78665830, 'Turkey', 2015],
        [38225, 81.4, 64715810, 'United Kingdom', 2015],
        [53354, 79.1, 321773631, 'United States', 2015]
      ]
    ]
  }
};

export default mocks;
