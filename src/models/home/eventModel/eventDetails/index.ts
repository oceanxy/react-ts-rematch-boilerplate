/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件详情model
 * @Date: 2020-03-19 16:31:44
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-18 周一 15:35:04
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
  startTime: '',
  eventId: ''
};

const eventDetails: IEventDetailsModel = {
  state: {
    data: defaultData
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
      const {startTime, monitorId, eventType} = store.getState().eventList.curSelectedEvent!;

      if (!reqPayload) {
        reqPayload = {
          startTime: startTime!,
          monitorId: monitorId!,
          eventType: eventType!
        };
      }

      const response = await fetchApis.fetchEventDetails(reqPayload);

      if (+response.retCode === 0) {
        // 检测是否是临时获取事件详情数据，如果是则返回这个临时数据，否则更新事件详情组件的数据
        if (!reqPayload || !('updateEventDetails' in reqPayload) || reqPayload.updateEventDetails) {
          store.dispatch.eventDetails.setState({data: response.data.eventDetails});
        }

        return response.data.eventDetails;
      } else {
        throw new Error(response.retMsg);
      }
    },
    setState(payload) {
      if (payload) {
        store.dispatch.eventDetails.updateState(payload);
      } else {
        store.dispatch.eventDetails.updateState({data: defaultData});
      }
    }
  }
};

export { defaultData };
export default eventDetails;
