/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件列表model
 * @Date: 2020-03-23 14:59:49
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-07 周四 10:43:13
 */

import fetchApis from '@/apis';
import { store } from '@/store';

/**
 * 事件列表model
 * @type {IEventListModel}
 */
const eventList: IEventListModel = {
  state: {
    data: [],
    curSelectedMonitorId: ''
  },
  reducers: {
    updateData: (state, data) => {
      return {
        ...state,
        data
      };
    },
    updateCurId: (state, curSelectedMonitorId) => {
      return {
        ...state,
        curSelectedMonitorId
      };
    }
  },
  effects: {
    async fetchData(reqPayload) {
      const response = await fetchApis.fetchEventList(reqPayload);
      const {latestEventDetails, eventStatistics, eventList}: IEventData = response.data;

      // 更新事件详情
      if (eventList?.length && !reqPayload.isStatisticsMethodChanged) {
        store.dispatch.eventDetails.updateData({data: latestEventDetails});
      }

      // 更新事件数量
      store.dispatch.eventStatistics.updateData(eventStatistics);
      // 更新事件列表
      store.dispatch.eventList.updateData(eventList);
    },
    async setCurId(curSelectedMonitorId) {
      store.dispatch.eventList.updateCurId(curSelectedMonitorId);
    }
  }
};

export default eventList;
