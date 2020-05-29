/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件统计类型定义
 * @Date: 2020-04-13 周一 13:57:58
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-29 周五 10:55:17
 */

import { EventStatisticsMethod } from '@/models/home/eventModel/eventDetails';
import { ModelConfig } from '@rematch/core';

declare global {
  /**
   * 事件统计状态
   */
  interface IEventStatisticsState {
    /**
     * 已完成数量
     */
    finishedNum: number
    /**
     * 处理中的数量
     */
    processingNum: number
    /**
     * 总数（未处理+处理中）
     */
    totalNum: number
    /**
     * 未处理的数量
     */
    untreatedNum: number
    /**
     * 事件统计状态
     */
    eventStatisticsMethod: EventStatisticsMethod
  }

  /**
   * 事件统计组件model
   */
  interface IEventStatisticsModel extends ModelConfig {
    state: IEventStatisticsState
    reducers: {
      updateData(state: IEventStatisticsState, data: Partial<IEventStatisticsState>): IEventStatisticsState
    },
    effects: {
      setState(payload: Partial<IEventStatisticsState>): void
    }
  }
}
