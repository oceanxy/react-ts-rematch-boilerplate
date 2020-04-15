/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 任务详情
 * @Date: 2020-04-14 周二 09:24:12
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-14 周二 09:24:12
 */

import fetchApis from '@/apis';
import { ESeverity } from '@/components/UI/itemLegend';
import { defaultData as eventDetailsDefData } from '@/models/home/eventModel/eventDetails';
import { defaultData as entityDefData } from '@/models/UI/entity';
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
 * 任务状态
 * 0：未开始 1：执行中 2: 已完成
 */
export enum TaskStatus {
  NotStart,
  Processing,
  Completed
}

/**
 * 任务类型状态对应文字
 * @type {string[]}
 */
export const taskTypeStatus = ['未开始', '执行中', '已完成'];

/**
 * 任务类型文本
 * @type {string[]}
 */
export const taskTypeText = ['', '一般', '重要', '紧急'];

/**
 * 任务类型颜色值
 * @type {(ESeverity.GENERAL_TASK | ESeverity.IMPORTANT_TASK | ESeverity.URGENT_TASK)[]}
 */
export const taskTypeColor = [
  ESeverity.GRAY,
  ESeverity.GENERAL_TASK,
  ESeverity.IMPORTANT_TASK,
  ESeverity.URGENT_TASK
];

/**
 * 任务详情默认数据
 * @type {ITask}
 */
const defaultData: ITask = {
  address: '',
  remark: '',
  createDataTime: null,
  createDataUsername: '',
  description: '',
  endTime: null,
  eventNames: '',
  events: eventDetailsDefData,
  executors: entityDefData,
  groupId: '',
  groupName: '',
  realEndTime: null,
  realStartTime: null,
  startTime: null,
  status: 0,
  taskId: '',
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
    updateData: (state, data) => {
      return {
        ...state,
        data
      };
    },
    clearData() {
      return {
        data: defaultData
      };
    }
  },
  effects: {
    async fetchData(reqPayload: ITaskDetailsRequest) {
      const response = await fetchApis.fetchTaskDetails(reqPayload);
      store.dispatch.taskDetails.updateData(response.data.taskInfo);
    }
  }
};

export default taskDetails;
