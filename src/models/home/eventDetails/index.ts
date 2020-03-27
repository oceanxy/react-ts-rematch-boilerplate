/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件详情model
 * @Date: 2020-03-19 16:31:44
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-03-19 16:31:44
 */

import fetchApis from '@/apis';
import { ModelConfig } from '@rematch/core';

// 事件类型
export const eventTypeText = ['', '一般', '较重', '严重', '特别严重'];

// 请求参数
export type EventDetailsRequest = {
  startTime: Date | null,
  monitorId: string,
  eventType: number
}

// 数据
export type EventDetailsData = {
  administrativeRegion: string,
  eventEndAddress: string,
  endTime: Date | null,
  eventDurationTime: number,
  eventDurationTimeStr: string,
  eventLevel: 0 | 1 | 2 | 3 | 4,
  eventName: string,
  eventProcessingTime: number,
  eventProcessingTimeStr: string,
  eventStatus: 0 | 1,
  latitude: number,
  longitude: number,
  monitorName: string
} & EventDetailsRequest

const defaultData = {
  administrativeRegion: '', // 行政区块 到区县，如"重庆市沙坪坝区"
  eventEndAddress: '', // 位置
  endTime: null, // 事件结束时间 格式yyyy-MM-dd HH:mm:ss
  eventDurationTime: 0, // 事件持续时长 单位s
  eventDurationTimeStr: '', // 事件持续时长 x天x小时x分钟x秒
  eventLevel: 0, // 事件等级 1：一般 2：较重 3：严重 4：特别严重 0：没有时间详情数据
  eventName: '', // 事件名称
  eventProcessingTime: 0, // 事件处理时长 单位s
  eventProcessingTimeStr: '', // 事件处理时长 x天x小时x分钟x秒
  eventStatus: 0, // 事件处理状态 0:未处理 1：处理中
  eventType: 0, // 事件类型
  latitude: 0, // 纬度
  longitude: 0, // 经度
  monitorId: '', // 监控对象ID
  monitorName: '', // 监控对象名称
  startTime: null // 事
} as EventDetailsData;

const eventDetails = <ModelConfig> {
  state: defaultData,
  reducers: {
    updateData: (state: any, data) => {
      return {
        ...state,
        ...data
      };
    },
    clearData() {
      return defaultData;
    }
  },
  effects: {
    async getData(reqPayload: EventDetailsRequest) {
      const {data: {data}} = await fetchApis.fetchEventDetails(reqPayload);
      this.updateData(data);
    }
  }
};

export default eventDetails;
