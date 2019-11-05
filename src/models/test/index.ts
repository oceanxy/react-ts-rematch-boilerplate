import { AxiosResponse } from 'axios';
import fetchApis from '@/mock';
import { ModelConfig } from '@rematch/core';

export const test = <ModelConfig>{
  state: {
    count: 0,
    data: {},
    websocketData: -1
  },
  reducers: {
    increment: (state: {count: number}) => {
      const {count} = state || {count: 0};

      return {
        ...state,
        count: count + 1
      };
    },
    updateData: (state: any, data: {}) => {
      return {
        ...state,
        data
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
    async getData() {
      const {data} = await fetchApis.fetchTest();
      this.updateData(data.data);
    },
    getWebSocketData() {
      fetchApis.fetchTestWebsocket((axiosResponse: AxiosResponse) => {
        this.updateWebSocketData(axiosResponse.data);
      });
    },
    async deleteData(id: string) {
      return await fetchApis.deleteData({id});
    }
  }
};
