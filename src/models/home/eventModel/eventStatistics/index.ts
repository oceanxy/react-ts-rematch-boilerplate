/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件/任务统计model
 * @Date: 2020-03-23 16:17:59
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-01 周三 11:04:01
 */

import { ModelConfig } from '@rematch/core';

/**
 * 事件统计状态
 */
export interface IEventStatisticsState {
  /**
   * 已完成数量
   */
  finishedNum: number;
  /**
   * 处理中的数量
   */
  processingNum: number;
  /**
   * 总数（未处理+处理中）
   */
  totalNum: number;
  /**
   * 未处理的数量
   */
  untreatedNum: number;
}

/**
 * 事件统计model
 * @type {ModelConfig}
 */
const eventStatistics: ModelConfig = {
  state: <IEventStatisticsState>{
    finishedNum: 0,
    processingNum: 0,
    totalNum: 0,
    untreatedNum: 0
  },
  reducers: {
    updateData: (state: any, data) => {
      return {
        ...state,
        ...data
      };
    }
  },
  effects: {
    async getData() {}
  }
};

export default eventStatistics;
