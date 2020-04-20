/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 完成任务model
 * @Date: 2020-04-20 周一 17:37:50
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-20 周一 17:37:50
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
    async completeRemoteTask(completeTask) {
      return await fetchApis.completeTask(completeTask);
    },
    setState(payload) {
      store.dispatch.completeTask.updateModalState(payload);
    }
  }
};

export default editTask;
