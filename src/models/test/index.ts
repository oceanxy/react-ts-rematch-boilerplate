/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 测试model
 * @Date: 2019-11-06 10:34:15
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-03-28 00:30:10
 */

import fetchApis from '@/apis';
import { APIResponse } from '@/interfaces/api/mock';
import { ModelConfig } from '@rematch/core';

const test = <ModelConfig> {
  state: {
    count: 0,
    listData: {},
    websocketData: {
      name: 'websocket',
      value: '获取服务器时间中...'
    },
    eChartsData: []
  },
  reducers: {
    increment: (state: {count: number}) => {
      const {count} = state || {count: 0};

      return {
        ...state,
        count: count + 1
      };
    },
    updateListData: (state: any, data: {}) => {
      return {
        ...state,
        listData: data
      };
    },
    updateWebSocketData: (state: any, websocketData: {}) => {
      return {
        ...state,
        websocketData
      };
    },
    updateEChartsData: (state: any, data) => {
      return {
        ...state,
        eChartsData: data
      };
    }
  },
  effects: {
    async incrementAsync() {
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.increment();
    },
    async getListData() {
      const {data} = await fetchApis.fetchTest();
      this.updateListData(data);
    },
    async getWebSocketData() {
      return await fetchApis.fetchTestWebsocket((response: APIResponse) => {
        this.updateWebSocketData(response.data);
      });
    },
    async getEChartsData() {
      let {data} = await fetchApis.fetchECharts();
      this.updateEChartsData(data);
    },
    async deleteData(id: string) {
      const {data} = await fetchApis.deleteData({id});
      return data;
    }
  }
};

export { test };
