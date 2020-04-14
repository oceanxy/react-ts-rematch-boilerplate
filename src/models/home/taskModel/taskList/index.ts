/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 任务列表
 * @Date: 2020-04-13 周一 17:18:47
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-14 周二 17:22:59
 */

import fetchApis from '@/apis';
import { store } from '@/store';

const taskList: ITaskListModel = {
  state: {
    data: {
      records: [],
      totalRecords: 0,
      totalPages: 0,
      pageSize: 100,
      page: 1,
      end: 0
    },
    curSelectedTaskId: ''
  },
  reducers: {
    updateState(state, payload) {
      return {
        ...state,
        ...payload
      };
    }
  },
  effects: {
    async fetchData(reqPayload?) {
      if (!reqPayload) {
        reqPayload = {
          monitorId: '',
          queryType: 0,
          taskStatus: -1,
          eventId: '',
          start: 0,
          length: 200
        };
      }

      const response = await fetchApis.fetchTaskList(reqPayload);
      // 更新任务列表
      store.dispatch.taskList.updateState({data: response.data.taskPageInfo});
      // 更新任务统计数量
      store.dispatch.taskStatistics.updateData(response.data.taskStatistics);
    },
    async setState(payload) {
      store.dispatch.taskList.updateState(payload);
    },
    async itemClick(reqPayload) {
      // 根据请求参数获取事件详情数据
      await store.dispatch.taskDetails.fetchData(reqPayload);
    }
  }
};

export default taskList;
