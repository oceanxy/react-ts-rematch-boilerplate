/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 完成任务类型定义
 * @Date: 2020-04-20 周一 17:38:15
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-20 周一 17:38:15
 */

import { APIResponse } from '@/interfaces/api/mock';
import { RootState } from '@/store';
import { ModelConfig } from '@rematch/core';

declare global {
  /**
   * 任务编辑请求参数
   */
  interface ICompleteTaskRequest {
    /**
     * 要完成任务的ID
     */
    taskId: ITask['taskId']
  }

  /**
   * 任务编辑组件状态
   */
  interface ICompleteTaskState {
    /**
     * 是否显示完成任务对话框
     */
    isShowModal: boolean
  }

  /**
   * 任务编辑组件model
   */
  interface ICompleteTaskModel extends ModelConfig {
    state: ICompleteTaskState
    reducers: {
      /**
       * 更新组件状态
       * @param {IEditTaskState} state
       * @param {Partial<IEditTaskState>} payload
       * @returns {IEditTaskState}
       */
      updateModalState(state: ICompleteTaskState, payload: Partial<ICompleteTaskState>): ICompleteTaskState
    };
    effects: {
      /**
       * 显示/隐藏完成任务对话框
       * @param {IEditTaskState["isShowModal"]} isShowModal
       */
      showModal(isShowModal?: ICompleteTaskState['isShowModal']): void
      /**
       * 向服务端发送完成任务的请求
       * @param {ICompleteTaskRequest} completeTask
       * @param {RootState} state
       * @returns {Promise<APIResponse>}
       */
      completeRemoteTask(completeTask?: ICompleteTaskRequest, state?: RootState): Promise<APIResponse>
      /**
       * 设置状态
       * @param {Partial<IEditTaskState>} payload
       */
      setState(payload: Partial<IEditTaskState>)
    };
  }
}
