/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 编辑任务类型定义
 * @Date: 2020-04-15 周三 16:14:28
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-15 周三 16:14:28
 */

import { APIResponse } from '@/interfaces/api/mock';
import { DateDuplicateType, TaskLevel, TaskPeriod } from '@/models/home/taskModel/taskDetails';
import { ModelConfig } from '@rematch/core';

declare global {
  /**
   * 任务编辑请求参数 或 用于表单回填的值
   */
  interface IEditTaskRequest {
    /**
     * 任务名称
     */
    taskName: string;
    /**
     * 任务等级1：一般 2：重要 3：紧急
     */
    taskLevel: TaskLevel;
    /**
     * 任务开始时间 格式：yyyy-MM-dd HH:mm:ss
     */
    startTime: Date | null;
    /**
     * 任务结束时间 格式：yyyy-MM-dd HH:mm:ss
     */
    endTime: Date | null;
    /**
     * 任务地址
     */
    taskAddress: string;
    /**
     * 任务周期
     */
    taskPeriod: TaskPeriod;
    /**
     * 定时任务的周期值（1-7）。1-7分别对应周一到周日
     */
    dateDuplicateType?: DateDuplicateType[];
    /**
     * 任务描述
     */
    remark: string;
    /**
     * 指派的监控对象ID
     */
    designateMonitorIds: IEntity['monitorId'][];
    /**
     * 事件ID
     */
    eventIds: IEvent['eventId'][];
    /**
     * 修改的任务ID
     */
    taskId: string;
  }

  /**
   * 任务编辑组件状态
   */
  interface IEditTaskState {
    /**
     * 是否显示编辑任务对话框
     */
    isShowModal: boolean
  }

  /**
   * 任务编辑组件model
   */
  interface IEditTaskModel extends ModelConfig {
    state: IEditTaskState;
    reducers: {
      /**
       * 更新组件状态
       * @param {IEditTaskState} state
       * @param {Partial<IEditTaskState>} payload
       * @returns {IEditTaskState}
       */
      updateModalState(state: IEditTaskState, payload: Partial<IEditTaskState>): IEditTaskState;
    };
    effects: {
      /**
       * 显示/隐藏任务编辑框
       * @param {IEditTaskState["isShowModal"]} isShowModal
       */
      showModal(isShowModal?: IEditTaskState['isShowModal']): void
      /**
       * 向服务端发送更新任务信息请求
       * @param {ITask} task
       * @returns {Promise<APIResponse>}
       */
      updateRemoteTask(task: IEditTaskRequest): Promise<APIResponse>;
      /**
       * 设置状态
       * @param {Partial<IEditTaskState>} payload
       */
      setState(payload: Partial<IEditTaskState>)
    };
  }
}
