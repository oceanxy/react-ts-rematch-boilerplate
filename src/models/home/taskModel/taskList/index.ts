/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 任务列表
 * @Date: 2020-04-13 周一 17:18:47
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-18 周一 10:45:48
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
      const {eventId, monitorId} = state!.eventList.curSelectedEvent;

      if (eventId) {
        const defaultReqPayload: ITaskListRequest = {
          monitorId: monitorId!,
          queryType: -1,
          taskStatus: -1,
          eventId,
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
        const records = taskPageInfo?.records;

        // 更新任务列表
        taskList.updateState({data: taskPageInfo});
        // 更新任务统计数量
        taskStatistics.updateData(tsData);

        // 自动选中当前第一条数据
        if (records?.length && selectFirstData) {
          taskList.updateState({curSelectedTaskId: records[0].taskId});
        }
      } else {
        throw new Error('获取任务列表的参数有误，请确认！');
      }
    },
    async setState(payload) {
      store.dispatch.taskList.updateState(payload);
    }
  }
};

export default taskList;
