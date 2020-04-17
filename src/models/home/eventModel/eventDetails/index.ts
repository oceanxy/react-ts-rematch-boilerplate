/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件详情model
 * @Date: 2020-03-19 16:31:44
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-03 周五 17:38:01
 */

import fetchApis from '@/apis';
import { ESeverity } from '@/components/UI/itemLegend';
import { store } from '@/store';

/**
 * 事件类型文本
 * @type {string[]}
 */
export const eventTypeText = ['', '一般', '较重', '严重', '特别严重'];

// 事件类型颜色值
export const eventTypeColor = [
  ESeverity.GRAY,
  ESeverity.GENERAL_Event,
  ESeverity.RELATIVELY_Event,
  ESeverity.SEVERELY_Event,
  ESeverity.VERY_Event
];

// 事件处理状态
export enum EventStatisticsMethod {
  /**
   * 未处理
   * @type {number}
   */
  UNPROCESSED = 0,
  /**
   * 处理中
   * @type {number}
   */
  PROCESSING = 1,
  /**
   * 全部
   * @type {number}
   */
  ALL = -1
}

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
      return { data: defaultData };
    }
  },
  effects: {
    async getData(reqPayload: IEventDetailsRequest) {
      const { data } = await fetchApis.fetchEventDetails(reqPayload);
      store.dispatch.eventDetails.updateData(data);
    }
  }
};

export { defaultData };
export default eventDetails;
