/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 任务统计
 * @Date: 2020-04-14 周二 10:13:52
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-14 周二 16:35:16
 */

/**
 * 任务统计model
 * @type {ITaskStatisticsModel}
 */
const taskStatistics: ITaskStatisticsModel = {
  state: {
    totalNum: 0,
    untreatedNum: 0,
    processingNum: 0,
    finishedNum: 0
  },
  reducers: {
    updateData(state, payload) {
      return {
        ...state,
        ...payload
      };
    }
  }
};

export default taskStatistics;
