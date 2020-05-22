/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 完成任务model
 * @Date: 2020-04-20 周一 17:37:50
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-21 周二 09:56:39
 */

import fetchApis from '@/apis';
import { store } from '@/store';

/**
 * 任务详情model
 * @type {ITaskDetailsModel}
 */
const editTask: ICompleteTaskModel = {
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
      store.dispatch.completeTask.updateModalState({isShowModal: isShowModal ?? true});
    },
    async completeRemoteTask(completeTask, state) {
      if (!completeTask) {
        completeTask = {taskId: state?.taskList.curSelectedTask?.taskId!};
      }

      const response = await fetchApis.completeTask(completeTask);

      if (Number(response.retCode) === 0) {
        // 完成任务后，更新任务列表
        store.dispatch.taskList.fetchData();
        // 完成任务后，更新当前选中任务的详情
        store.dispatch.taskDetails.fetchData();
      }

      return response;
    },
    setState(payload) {
      store.dispatch.completeTask.updateModalState(payload);
    }
  }
};

export default editTask;
