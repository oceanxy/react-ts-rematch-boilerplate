/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 任务列表
 * @Date: 2020-04-13 周一 17:18:47
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-21 周二 09:21:02
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
        const state = store.getState();

        reqPayload = {
          monitorId: state.eventList.curSelectedMonitorId,
          queryType: -1,
          taskStatus: -1,
          eventId: state.eventDetails.data.eventId,
          start: 0,
          length: 2000
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
    }
  }
};

export default taskList;
