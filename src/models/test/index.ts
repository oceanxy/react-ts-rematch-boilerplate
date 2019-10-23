import Axios from 'axios';
import { createModel } from '@rematch/core';
import fetchApis from '@/mock';

export type TestState = {count: number; data: any};

export const test = createModel({
  state: {
    count: 0,
    data: {}
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
      // debugger
      return {
        ...state,
        data
      };
    }
  },
  effects: {
    async incrementAsync() {
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.increment();
    },
    async getData() {
      const response: any = await fetchApis.fetchTest();
      this.updateData(response.data.data);
    },
    async deleteData(id: string) {
      return await Axios.post('/testDelete', id);
    }
  }
});
