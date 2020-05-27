/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 突发事件周边资源model
 * @Date: 2020-04-02 周四 17:01:08
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-27 周三 11:24:36
 */

import fetchApis from '@/apis';
import { store } from '@/store';

/**
 * 突发事件周边资源model
 * @type {ISuddenEventsModel}
 */
const suddenEvents: ISuddenEventsModel = {
  state: {
    data: {
      itemName: [],
      totalNum: []
    }
  },
  reducers: {
    updateData: (state, payload: Partial<ISuddenEventsState>) => {
      return {
        ...state,
        ...payload
      };
    }
  },
  effects: {
    async getData(reqPayload) {
      let response;

      if (reqPayload) {
        response = await fetchApis.fetchAroundEvent(reqPayload);
      } else {
        const {eventDetails, rangeControl} = store.getState();

        response = await fetchApis.fetchAroundEvent({
          supportMonitorType: -1, // 默认全部
          startTime: eventDetails.data.startTime,
          monitorId: eventDetails.data.monitorId,
          eventType: eventDetails.data.eventType,
          radius: rangeControl.range! * 1000 // 单位换算
        });
      }

      store.dispatch.suddenEvents.updateData({data: response.data.statistics});
    },
    setState(payload: Partial<ISuddenEventsState>) {
      store.dispatch.suddenEvents.updateData(payload);
    }
  }
};

export default suddenEvents;
