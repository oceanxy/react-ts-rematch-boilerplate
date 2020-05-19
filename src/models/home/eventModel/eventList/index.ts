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
    curSelectedEvent: {}
  },
  reducers: {
    updateState: (state, payload) => {
      return {
        ...state,
        ...payload
      };
    }
  },
  effects: {
    async fetchData(reqPayload) {
      if (!reqPayload) {
        reqPayload = {
          sortType: 0,
          isReturnEventDetails: 1
        };
      }

      const response = await fetchApis.fetchEventList(reqPayload);
      const {latestEventDetails, eventStatistics, eventList}: IEventData = response.data;

      // 更新事件详情
      if (eventList?.length && !reqPayload.isStatisticsMethodChanged) {
        store.dispatch.eventDetails.setState({data: latestEventDetails});
      }

      // 更新事件数量
      store.dispatch.eventStatistics.updateData(eventStatistics);
      // 更新事件列表
      store.dispatch.eventList.updateState({data: eventList});
    },
    async setState(payload) {
      store.dispatch.eventList.updateState(payload);
    }
  }
};

export default eventList;
