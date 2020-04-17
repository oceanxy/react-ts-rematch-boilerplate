/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 编辑任务model
 * @Date: 2020-04-15 周三 16:10:48
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-15 周三 16:10:48
 */

import fetchApis from '@/apis';
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
    updateModalState: (state, isShowModal) => {
      return {
        ...state,
        isShowModal
      };
    }
  },
  effects: {
    async showModal(isShowModal) {
      store.dispatch.editTask.updateModalState(isShowModal ?? true);
    },
    async updateTask(task) {
      return await fetchApis.updateTask(task);
    },
    getEventIds(events) {
      return events.map((event) => event.eventId);
    },
    getEntityIds(entities) {
      return entities.map((entity) => entity.monitorId);
    }
  }
};

export default editTask;
