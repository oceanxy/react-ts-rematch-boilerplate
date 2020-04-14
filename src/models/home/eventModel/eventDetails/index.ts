/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件详情model
 * @Date: 2020-03-19 16:31:44
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-03 周五 17:38:01
 */

import fetchApis from '@/apis';
import { store } from '@/store';

/**
 * 事件详情默认数据
 * @type {IEventDetailsData}
 */
const defaultData: IEventDetailsData = {
  administrativeRegion: '',
  eventEndAddress: '',
  endTime: null,
  eventDurationTime: 0,
  eventDurationTimeStr: '',
  eventLevel: 0,
  eventName: '',
  eventProcessingTime: 0,
  eventProcessingTimeStr: '',
  eventStatus: 0,
  eventType: 0,
  latitude: 0,
  longitude: 0,
  monitorId: '',
  monitorName: '',
  startTime: null,
  eventId: ''
};

const eventDetails: IEventDetailsModel = {
  state: {
    data: defaultData
  },
  reducers: {
    updateData: (state, data) => {
      return {
        ...state,
        data
      };
    },
    clearData() {
      return {data: defaultData};
    }
  },
  effects: {
    async getData(reqPayload: IEventDetailsRequest) {
      const {data} = await fetchApis.fetchEventDetails(reqPayload);
      store.dispatch.eventDetails.updateData(data);
    }
  }
};

export { defaultData };
export default eventDetails;
