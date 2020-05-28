/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 测试model
 * @Date: 2019-11-06 10:34:15
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-28 周四 15:26:29
 */

import fetchApis from '@/apis';
import { APIResponse } from '@/interfaces/api/mock';
import { ModelConfig } from '@rematch/core';
import { Client, Frame } from 'stompjs';

const test = <ModelConfig> {
  state: {
    count: 0,
    listData: {},
    sockJsData: {
      name: 'sockJs',
      value: '正在连接服务器...'
    },
    websocketData: {
      name: 'websocket',
      value: '正在连接服务器...'
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
    updateSockJsData: (state: any, sockJsData: {}) => {
      return {
        ...state,
        sockJsData
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
    async getSockJsData() {
      return await fetchApis.fetchTestSockJs((stompClient: Client, frame?: Frame) => {
        // setTimeout(() => {
        //   const requestStr = {
        //     'desc': {
        //       'MsgId': 40968,
        //       'TaskId': null,
        //       'UserName': 'admin',
        //       'SysTime': '2020/04/14 10:45:43',
        //       'ProtocolType': null,
        //       'ProtocolVersion': null
        //     }
        //   };
        //   // stompClient.subscribe('/user/admin/eventInfo', (res) => {
        //   //   debugger;
        //   // });
        //   //
        //   // stompClient.subscribe('/user/xieyang/taskInfo', (res) => {
        //   //   debugger;
        //   // });
        //   stompClient.send('/app/taskStatusInfo', {}, JSON.stringify(requestStr)); //订阅任务信息
        //   stompClient.send('/app/vehicle/subscribeStatus', {}, JSON.stringify(requestStr));
        // }, 1000);

        this.updateSockJsData({name: 'SockJs', value: 'SockJs通道已打开，但还未订阅消息。'});
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
