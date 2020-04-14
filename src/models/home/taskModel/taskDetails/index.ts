/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 任务详情
 * @Date: 2020-04-14 周二 09:24:12
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-14 周二 09:24:12
 */

import fetchApis from '@/apis';
import { defaultData as eventDetailsDefData } from '@/models/home/eventModel/eventDetails';
import { TaskPeriod } from '@/models/home/taskModel';
import { defaultData as entityDefData } from '@/models/UI/entity';
import { store } from '@/store';

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
      const {data} = await fetchApis.fetchTaskDetails(reqPayload);
      store.dispatch.taskDetails.updateData(data);
    }
  }
};

export default taskDetails;
