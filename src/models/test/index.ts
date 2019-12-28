/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 测试model
 * @Date: 2019-11-06 10:34:15
 * @LastModified: Oceanxy
 * @LastModifiedTime: 2019-11-06 10:34:15
 */

import fetchApis from '@/apis';
import { ModelConfig } from '@rematch/core';
import { APIResponse } from '@/interfaces/api/mock';

export const test: ModelConfig = {
  state: {
    count: 0,
    listData: {},
    websocketData: {
      name: 'websocket',
      value: '获取服务器时间中...'
    }
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
    }
  },
  effects: {
    async incrementAsync() {
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.increment();
    },
    async getListData() {
      const {data} = await fetchApis.fetchTest();
      this.updateListData(data.data);
    },
    async getWebSocketData() {
      await fetchApis.fetchTestWebsocket((response: APIResponse) => {
        this.updateWebSocketData(response.data);
      });
    },
    async deleteData(id: string) {
      const {data} = await fetchApis.deleteData({id});
      return data.data;
    }
  }
};
