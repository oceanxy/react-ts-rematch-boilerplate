/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: mock数据模版
 * @Date: 2019-10-17 10:04:40
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2019-12-24 11:56:04
 */

import apis, { APIName, APIRequestConfig } from '@/apis/api';
import { APIResponse } from '@/interfaces/api/mock';
import { mock } from 'mockjs';

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
    retCode: 0,
    retMsg: '',
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
    retCode: 0,
    retMsg: '',
    data: {
      name: 'websocket',
      'value|1-10': 1
    }
  },
  // 测试删除数据接口
  deleteData: {
    retCode: 0,
    retMsg: '',
    data: null
  },
  fetchECharts: {
    retCode: 0,
    retMsg: '',
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
  },
  // 事件详情
  fetchEventDetails: {
    retCode: 0,
    retMsg: 'success',
    data: {
      // 行政区块 到区县，如"重庆市沙坪坝区"
      'administrativeRegion': '@county',
      // 位置
      'eventEndAddress': '@county(true)',
      // 事件结束时间 格式yyyy-MM-dd HH:mm:ss
      'endTime': '@datetime',
      // 事件持续时长 单位s
      'eventDurationTime': 19500,
      // 事件持续时长 x天x小时x分钟x秒
      'eventDurationTimeStr': '5小时25分0秒',
      // 事件等级 1：一般 2：较重 3：严重 4：特别严重
      'eventLevel': 1,
      // 事件名称
      'eventName': '上班未到岗',
      // 事件处理时长 单位s
      'eventProcessingTime': 3892,
      // 事件处理时长 x天x小时x分钟x秒
      'eventProcessingTimeStr': '1小时4分52秒',
      // 事件处理状态 0:未处理 1：处理中
      'eventStatus': '1',
      // 事件类型
      'eventType': '152',
      // 纬度
      'latitude': '29.893485',
      // 经度
      'longitude': '111.730631',
      // 监控对象ID
      'monitorId': '@guid',
      // 监控对象名称
      monitorName() {
        const p = ['皖', '京', '渝', '闽', '甘', '粤', '区', '黔', '琼', '冀', '豫', '黑', '蒙', '区', '青', '鲁', '晋', '陕', '沪', '川', '津', '藏', '新', '滇', '浙', '港', '澳'][Math.floor(Math.random() * 27)];
        const r = mock(/[\dA-Z]{5}/);

        return `${p}${r}`;
      },
      // 事件开始时间 格式yyyy-MM-dd HH:mm:ss
      'startTime': '@datetime'
    }
  }
};

export default mocks;
