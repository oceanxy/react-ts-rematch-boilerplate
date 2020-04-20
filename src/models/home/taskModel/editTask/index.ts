/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 编辑任务model
 * @Date: 2020-04-15 周三 16:10:48
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-15 周三 16:10:48
 */

import fetchApis from '@/apis';
import { TaskLevel, TaskPeriod } from '@/models/home/taskModel/taskDetails';
import { store } from '@/store';

/**
 * 任务详情model
 * @type {ITaskDetailsModel}
 */
const editTask: IEditTaskModel = {
  state: {
    isShowModal: false
  },
  reducers: {
    updateModalState: (state, payload) => {
      return {
        ...state,
        ...payload
      };
    }
  },
  effects: {
    async showModal(isShowModal) {
      store.dispatch.editTask.updateModalState({isShowModal: isShowModal ?? true});
    },
    async updateRemoteTask(task) {
      return await fetchApis.updateTask(task);
    },
    setState(payload: Partial<IEditTaskState>) {
      store.dispatch.editTask.updateModalState(payload);
    }
  }
};

export default editTask;
