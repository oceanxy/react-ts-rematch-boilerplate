/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 编辑任务类型定义
 * @Date: 2020-04-15 周三 16:14:28
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-15 周三 16:14:28
 */

import { APIResponse } from '@/interfaces/api/mock';
import { ModelConfig } from '@rematch/core';

declare global {
  interface IEditTaskState {
    isShowModal: boolean
  }

  interface IEditTaskModel extends ModelConfig {
    state: IEditTaskState
    reducers: {
      updateModalState(state: IEditTaskState, isShowModal: IEditTaskState['isShowModal']): IEditTaskState
    }
    effects: {
      showModal(isShowModal?: IEditTaskState['isShowModal']): void
      updateTask(task: ITask): Promise<APIResponse>
    }
  }
}
