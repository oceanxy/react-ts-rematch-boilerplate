/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 任务详情
 * @Date: 2020-04-14 周二 09:24:12
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-21 周四 17:08:20
 */

import fetchApis from '@/apis';
import { ESeverity } from '@/components/UI/itemLegend';
import { store } from '@/store';

/**
 * 任务周期
 */
export enum TaskPeriod {
  /**
   * 即时
   * @type {number}
   */
  Immediate = 1,
  /**
   * 定时
   * @type {number}
   */
  Timing = 2
}

/**
 * 定时任务周期
 */
export enum DateDuplicateType {
  /**
   * 星期一
   * @type {number}
   */
  Monday = 1,
  /**
   * 星期二
   */
  Tuesday,
  /**
   * 星期三
   */
  Wednesday,
  /**
   * 星期四
   */
  Thursday,
  /**
   * 星期五
   */
  Friday,
  /**
   * 星期六
   */
  Saturday,
  /**
   * 星期日
   */
  Sunday
}

/**
 * 定时任务周期显示文本
 * @type {string[]}
 */
export const dateDuplicateTypeText = ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日'];

/**
 * 任务周期显示文本
 * @type {string[]}
 */
export const taskPeriodText = ['', '即时', '定时'];

/**
 * 任务状态
 * 0：未开始 1：执行中 2: 已完成
 */
export enum TaskStatus {
  NotStart,
  Processing,
  Completed
}

/**
 * 任务状态对应文字
 * @type {string[]}
 */
export const taskTypeStatus = ['未开始', '执行中', '已完成'];

/**
 * 任务类型文本
 * @type {string[]}
 */
export const taskLevelText = ['', '一般', '重要', '紧急'];

/**
 * 任务等级 （0:没有数据 1:一般、2:重要、3:紧急）
 */
export enum TaskLevel {
  Null = 0,
  General = 1,
  Important = 2,
  Urgent = 3
}

/**
 * 任务类型颜色值
 * @type {(ESeverity.GENERAL_TASK | ESeverity.IMPORTANT_TASK | ESeverity.URGENT_TASK)[]}
 */
export const taskTypeColor = [ESeverity.GRAY, ESeverity.GENERAL_TASK, ESeverity.IMPORTANT_TASK, ESeverity.URGENT_TASK];

/**
 * 任务详情默认数据
 * @type {ITask}
 */
const defaultData: ITask = {
  address: '',
  createDataTime: null,
  createDataUsername: '',
  description: '',
  endTime: null,
  eventNames: '',
  events: [],
  executors: [],
  groupId: '',
  groupName: '',
  realEndTime: null,
  realStartTime: null,
  startTime: null,
  status: 0,
  taskId: '',
  intercomId: -1,
  taskLevel: 0,
  taskName: '',
  taskPeriod: TaskPeriod.Immediate,
  dateDuplicateType: '',
  updateDataTime: null,
  updateDataUsername: '',
  taskDurationTime: 0,
  taskDurationTimeStr: ''
};

/**
 * 任务详情model
 * @type {ITaskDetailsModel}
 */
const taskDetails: ITaskDetailsModel = {
  state: {
    data: defaultData
  },
  reducers: {
    updateData: (state, payload) => {
      return {
        ...state,
        ...payload
      };
    }
  },
  effects: {
    async fetchData(reqPayload?: ITaskDetailsRequest) {
      if (!reqPayload) {
        reqPayload = {taskId: store.getState().taskList.curSelectedTask!.taskId};
      }

      const response = await fetchApis.fetchTaskDetails(reqPayload);
      store.dispatch.taskDetails.updateData({data: response.data.taskInfo});
    },
    setState(payload?: Partial<ITaskDetailsState>) {
      if (payload) {
        store.dispatch.taskDetails.updateData(payload);
      } else {
        store.dispatch.taskDetails.updateData({data: defaultData});
      }
    }
  }
};

export default taskDetails;
