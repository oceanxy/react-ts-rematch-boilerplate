/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 任务详情类型定义
 * @Date: 2020-04-14 周二 09:20:19
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-14 周二 09:20:19
 */

import { TaskPeriod } from '@/models/home/taskModel';
import { TaskStatus } from '@/models/home/taskModel/taskDetails/index';
import { ModelConfig } from '@rematch/core';

declare global {
  /**
   * 任务接口
   */
  interface ITask {
    /**
     * 任务地址
     */
    address: string
    /**
     * 任务描述
     */
    remark: string
    /**
     * 创建时间
     */
    createDataTime: Date | null,
    /**
     * 创建人
     */
    createDataUsername: string,
    /**
     * 任务描述
     */
    description: string,
    /**
     * 结束时间 格式：yyyy-MM-dd HH:mm:ss
     */
    endTime: Date | null,
    /**
     * 事件名称 多个用逗号隔开
     */
    eventNames: string,
    /**
     * 任务关联事件
     */
    events: IEvent,
    /**
     * 任务执行者（实体、监控对象）
     */
    executors: IEntity,
    /**
     * 组织ID
     */
    groupId: string,
    /**
     * 组织名称
     */
    groupName: string,
    /**
     * 实际结束时间 格式：yyyy-MM-dd HH:mm:ss
     */
    realEndTime: Date | null,
    /**
     * 实际开始时间 格式：yyyy-MM-dd HH:mm:ss
     */
    realStartTime: Date | null,
    /**
     * 开始时间 格式：yyyy-MM-dd HH:mm:ss
     */
    startTime: Date | null,
    /**
     * 任务状态
     */
    status: TaskStatus,
    /**
     * 任务ID
     */
    taskId: string,
    /**
     * 任务等级 （0:没有数据 1:一般、2:重要、3:紧急）
     */
    taskLevel: 0 | 1 | 2 | 3,
    /**
     * 任务名称
     */
    taskName: string,
    /**
     * 任务周期 1:即时 2:定时
     */
    taskPeriod: TaskPeriod,
    /**
     * 任务周期为定时要选择的一周内的某几天。（周一至周日分别对应1至7，多个用逗号分隔）
     */
    dateDuplicateType: string,
    /**
     * 任务更新时间
     */
    updateDataTime: Date | null,
    /**
     * 任务更新人
     */
    updateDataUsername: string,
    /**
     * 任务执行时长 单位秒
     */
    taskDurationTime: number,
    /**
     * 任务执行时长 格式：x天x小时x分钟x秒
     */
    taskDurationTimeStr: string
  }

  /**
   * 任务详情请求参数
   */
  interface ITaskDetailsRequest {
    /**
     * 任务ID
     */
    taskId: ITask['taskId']
  }

  interface ITaskDetailsState {
    data: ITask
  }

  interface ITaskDetailsModel extends ModelConfig {
    state: ITaskDetailsState
    reducers: {
      updateData(state: ITaskDetailsState, data: ITask): ITaskDetailsState
      clearData(): ITaskDetailsState
    }
    effects: {
      fetchData(reqPayload: ITaskDetailsRequest): void
    }
  }
}
