/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 任务列表
 * @Date: 2020-04-13 周一 17:18:47
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-11 周一 11:02:14
 */

import fetchApis from '@/apis';
import { APIResponse } from '@/interfaces/api/mock';
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
    async fetchData(reqPayload, state) {
      let {selectFirstData, ...rest} = reqPayload!;
      const defaultReqPayload: ITaskListRequest = {
        monitorId: state!.eventList.curSelectedMonitorId,
        queryType: -1,
        taskStatus: -1,
        eventId: state!.eventDetails.data.eventId,
        start: 0,
        length: 2000
      };

      if (!rest) {
        rest = defaultReqPayload;
      } else {
        rest = {
          ...defaultReqPayload,
          ...rest
        };
      }

      const response: APIResponse<ITaskListResponse> = await fetchApis.fetchTaskList(rest);
      const {taskList, taskStatistics} = store.dispatch;
      const {taskPageInfo, taskStatistics: tsData} = response.data;
      const {records} = taskPageInfo;

      // 更新任务列表
      taskList.updateState({data: taskPageInfo});
      // 更新任务统计数量
      taskStatistics.updateData(tsData);

      // 自动选中当前第一条数据
      if (records.length && selectFirstData) {
        taskList.updateState({curSelectedTaskId: records[0].taskId});
      }
    },
    async setState(payload) {
      store.dispatch.taskList.updateState(payload);
    }
  }
};

export default taskList;
