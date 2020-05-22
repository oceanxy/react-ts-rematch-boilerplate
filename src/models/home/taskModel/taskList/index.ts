/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 任务列表
 * @Date: 2020-04-13 周一 17:18:47
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-21 周四 15:46:33
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
    curSelectedTask: undefined
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
      let {selectFirstData, byMonitorId, ...rest} = reqPayload!;
      const {eventId, monitorId} = state!.eventList.curSelectedEvent;
      let defaultReqPayload: any;

      // 指定按监控对象查
      if (byMonitorId) {
        defaultReqPayload = rest;
      } /** 按事件查或查全部 */ else {
        // 如果选中了事件，则按照事件查任务
        if (eventId) {
          defaultReqPayload = <ITaskListRequest> {
            monitorId: monitorId!,
            queryType: 1,
            taskStatus: -1,
            eventId,
            start: 0,
            length: 2000
          };
        } /** 如果未选中事件，则查询全部任务 */ else {
          defaultReqPayload = <ITaskListRequest> {
            length: 2000
          };
        }

        // 如果组件传入了除selectFirstData之外的其余参数，则合并之
        rest = {
          ...defaultReqPayload,
          ...rest
        };
      }

      // 调用后端接口并获取数据
      const response: APIResponse<ITaskListResponse> = await fetchApis.fetchTaskList(rest);

      if (+response.retCode === 0) {
        // 清空当前选中事件（按监控对象查，与按事件查互斥）
        if (byMonitorId) {
          store.dispatch.eventList.setState({curSelectedEvent: {}});
        }

        const {taskPageInfo, taskStatistics: tsData} = response.data;
        const records = taskPageInfo?.records;

        // 更新任务列表
        const {taskList, taskStatistics} = store.dispatch;
        // 更新任务列表
        taskList.updateState({data: taskPageInfo});
        // 更新任务统计数量
        taskStatistics.updateData(tsData);

        // 自动选中当前第一条数据
        if (records?.length && selectFirstData) {
          taskList.updateState({curSelectedTask: records[0]});
        } else {
          taskList.updateState({curSelectedTask: undefined});
        }
      } else {
        throw new Error(response.retMsg);
      }
    },
    async setState(payload) {
      store.dispatch.taskList.updateState(payload);
    }
  }
};

export default taskList;
