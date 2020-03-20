/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件详情model
 * @Date: 2020-03-19 16:31:44
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-03-19 16:31:44
 */

import fetchApis from '@/apis';
import { ESeverity } from '@/components/UI/eventLegend';
import { ModelConfig } from '@rematch/core';

// 事件类型
export const eventTypeText = ['一般', '较重', '严重', '特别严重'];
// 时间类型颜色值
export const eventTypeColor = [ESeverity.GENERAL, ESeverity.RELATIVELY, ESeverity.SEVERELY, ESeverity.VERY];

export interface IEventDetailsData {
  administrativeRegion: string,
  eventEndAddress: string,
  endTime: string,
  eventDurationTime: number,
  eventDurationTimeStr: string,
  eventLevel: number,
  eventName: string,
  eventProcessingTime: number,
  eventProcessingTimeStr: string,
  eventStatus: 0 | 1,
  eventType: string,
  latitude: number,
  longitude: number,
  monitorId: string,
  monitorName: string,
  startTime: string
}

const eventDetails = <ModelConfig> {
  state: <IEventDetailsData> {
    administrativeRegion: '',
    eventEndAddress: '',
    endTime: '',
    eventDurationTime: 0,
    eventDurationTimeStr: '',
    eventLevel: 1,
    eventName: '',
    eventProcessingTime: 0,
    eventProcessingTimeStr: '',
    eventStatus: 0,
    eventType: '',
    latitude: 0,
    longitude: 0,
    monitorId: '',
    monitorName: '',
    startTime: ''
  },
  reducers: {
    updateEventDetailsData: (state: any, data) => {
      return {
        ...state,
        ...data
      };
    }
  },
  effects: {
    async getEventDetailsData() {
      const {data} = await fetchApis.fetchEventDetails();
      this.updateEventDetailsData(data.data);
    }
  }
};

export { eventDetails };
