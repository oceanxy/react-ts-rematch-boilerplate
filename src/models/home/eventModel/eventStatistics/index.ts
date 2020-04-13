/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件/任务统计model
 * @Date: 2020-03-23 16:17:59
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-13 周一 14:02:43
 */

/**
 * 事件统计model
 * @type {IEventStatisticsModel}
 */
const eventStatistics: IEventStatisticsModel = {
  state: {
    finishedNum: 0,
    processingNum: 0,
    totalNum: 0,
    untreatedNum: 0
  },
  reducers: {
    updateData: (state, data) => {
      return {
        ...state,
        ...data
      };
    }
  }
};

export default eventStatistics;
