/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件/任务统计model
 * @Date: 2020-03-23 16:17:59
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-03-23 16:17:59
 */

import { ModelConfig } from '@rematch/core';

export type EventStatisticsData = {
  finnishedNum: number,
  processingNum: number,
  totalNum: number,
  untreatedNum: number
}

const eventStatistics = <ModelConfig> {
  state: <EventStatisticsData> {
    finnishedNum: 0, // 已完成数量
    processingNum: 0, // 处理中的数量
    totalNum: 0, // 总数（未处理+处理中）
    untreatedNum: 0 // 未处理的数量
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
    async getData() {
    }
  }
};

export default eventStatistics;
