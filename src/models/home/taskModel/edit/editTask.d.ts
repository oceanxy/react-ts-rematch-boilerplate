/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 编辑任务类型定义
 * @Date: 2020-04-15 周三 16:14:28
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-15 周三 16:14:28
 */

import { APIResponse } from '@/interfaces/api/mock';
import { TaskLevel, TaskPeriod } from '@/models/home/taskModel/taskDetails';
import { ModelConfig } from '@rematch/core';

declare global {
  /**
   * 任务编辑请求参数
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
     * 定时任务的周期值（1-7），以逗号分割。1-7分别对应周一到周日
     */
    dateDuplicateType: string;
    /**
     * 任务描述
     */
    remark: string;
    /**
     * 指派的监控对象ID，多个用逗号分割
     */
    designateMonitorIds: string;
    /**
     * 事件ID，多个用逗隔开
     */
    eventIds: string;
    /**
     * 修改的任务ID
     */
    taskId: string;
  }

  /**
   * 任务编辑组件状态
   */
  interface IEditTaskState {
    isShowModal: boolean;
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
       * @param {IEditTaskState["isShowModal"]} isShowModal
       * @returns {IEditTaskState}
       */
      updateModalState(state: IEditTaskState, isShowModal: IEditTaskState['isShowModal']): IEditTaskState;
    };
    effects: {
      /**
       * 显示/隐藏任务编辑框
       * @param {IEditTaskState["isShowModal"]} isShowModal
       */
      showModal(isShowModal?: IEditTaskState['isShowModal']): void;
      /**
       * 向服务端发送更新任务信息请求
       * @param {ITask} task
       * @returns {Promise<APIResponse>}
       */
      updateTask(task: ITask): Promise<APIResponse>;
      /**
       * 获取任务关联事件的ID（用逗号分割）
       * @param {IEvent[]} events
       * @returns {string}
       */
      getEventIds(events: IEvent[]): IEvent['eventId'][];
      /**
       * 获取任务关联实体（监控对象）的ID（用逗号分割）
       * @param {IEntity} entities
       * @returns {string}
       */
      getEntityIds(entities: IEntity[]): IEntity['monitorId'][];
    };
  }
}
