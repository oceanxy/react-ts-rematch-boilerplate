/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 任务统计类型定义
 * @Date: 2020-04-14 周二 09:45:05
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-14 周二 16:33:42
 */
import { ModelConfig } from '@rematch/core';

declare global {
  interface ITaskStatisticsState {
    /**
     * 总任务数
     */
    totalNum: number
    /**
     * 未开始的任务数
     */
    untreatedNum: number
    /**
     * 进行中的任务数
     */
    processingNum: number
    /**
     * 已完成任务数
     */
    finishedNum: number
  }

  interface ITaskStatisticsModel extends ModelConfig {
    state: ITaskStatisticsState
    reducers: {
      updateData(state: ITaskStatisticsState, payload: ITaskStatisticsState): ITaskStatisticsState
    }
  }
}
