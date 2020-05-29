/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件/任务统计model
 * @Date: 2020-03-23 16:17:59
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-29 周五 10:56:02
 */

import { EventStatisticsMethod } from '@/models/home/eventModel/eventDetails';
import { store } from '@/store';

/**
 * 事件统计model
 * @type {IEventStatisticsModel}
 */
const eventStatistics: IEventStatisticsModel = {
  state: {
    data: {
      finishedNum: 0,
      processingNum: 0,
      totalNum: 0,
      untreatedNum: 0
    },
    eventStatisticsMethod: EventStatisticsMethod.ALL
  },
  reducers: {
    updateData: (state, payload) => {
      return {
        ...state,
        ...payload
      };
    }
  },
  effects: {
    setState(payload: Partial<IEventStatisticsState>) {
      store.dispatch.eventStatistics.updateData(payload);
    }
  }
};

export default eventStatistics;
