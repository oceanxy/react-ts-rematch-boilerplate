/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 任务列表类型定义
 * @Date: 2020-04-13 周一 17:21:16
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-13 周一 17:21:16
 */

import { ModelConfig } from '@rematch/core';

declare global {
  /**
   * 任务列表后台返回的数据
   */
  interface ITaskListData {
    /**
     * 返回任务列表分页信息
     */
    taskPageInfo: {
      /**
       * 任务列表
       */
      records: ITask[]
      /**
       * 总记录数
       */
      totalRecords: number
      /**
       * 总页数
       */
      totalPages: number
      /**
       * 每页记录数
       */
      pageSize: number
      /**
       * 当前页数
       */
      page: number
      /**
       * 当前查询结束行（可用于下一次查询的起始记录）
       */
      end: number
    }
    /**
     * 任务数量统计查询
     */
    taskStatistics: ITaskStatisticsState
  }

  /**
   * 任务列表状态
   */
  interface ITaskListState {
    /**
     * 数据
     */
    data: ITaskListData['taskPageInfo']
    /**
     * 当前选中的任务ID
     */
    curSelectedTaskId: string
  }

  /**
   * 任务列表请求参数
   */
  interface ITaskListRequest {
    /**
     * 触发事件的监控对象
     */
    monitorId: string
    /**
     * 查询方式
     * -1:全部（默认） 0:按监控对象查询 1:按事件查询
     */
    queryType: -1 | 0 | 1
    /**
     * 任务状态
     * -1:全部（默认） 0:未开始任务 1:进行中 2:已完成
     */
    taskStatus: -1 | 0 | 1 | 2
    /**
     * 事件ID
     */
    eventId: string
    /**
     * 起始页码 默认为0
     */
    start: number
    /**
     * 返回记录数 默认为20
     */
    length: number
  }

  /**
   * 任务列表model
   */
  interface ITaskListModel extends ModelConfig {
    state: ITaskListState
    reducers: {
      updateState(state: ITaskListState, payload: Partial<ITaskListState>): ITaskListState
    }
    effects: {
      fetchData(reqPayload?: ITaskListRequest): void
      setState(payload: Partial<ITaskListState>): void
    }
  }
}
