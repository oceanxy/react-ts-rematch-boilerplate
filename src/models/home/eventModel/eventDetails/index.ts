/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件详情model
 * @Date: 2020-03-19 16:31:44
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-01 周三 11:04:01
 */

import fetchApis from '@/apis';
import { ModelConfig } from '@rematch/core';

/**
 * 事件类型文本
 * @type {string[]}
 */
export const eventTypeText = ['', '一般', '较重', '严重', '特别严重'];

/**
 * 事件详情请求参数
 */
export interface IEventDetailsRequest {
  /**
   * 事件开始时间 格式yyyy-MM-dd HH:mm:ss
   */
  startTime: Date | null;
  /**
   * 监控对象ID
   */
  monitorId: string;
  /**
   * 事件类型
   */
  eventType: number;
}

/**
 * 事件详情数据
 */
export interface IEventDetailsData extends IEventDetailsRequest {
  /**
   * 行政区块 到区县，如"重庆市沙坪坝区"
   */
  administrativeRegion: string;
  /**
   * 位置
   */
  eventEndAddress: string;
  /**
   * 事件结束时间 格式yyyy-MM-dd HH:mm:ss
   */
  endTime: Date | null;
  /**
   * 事件持续时长 单位s
   */
  eventDurationTime: number;
  /**
   * 事件持续时长 x天x小时x分钟x秒
   */
  eventDurationTimeStr: string;
  /**
   * 事件等级 1：一般 2：较重 3：严重 4：特别严重 0：没有时间详情数据
   */
  eventLevel: 0 | 1 | 2 | 3 | 4;
  /**
   * 事件名称
   */
  eventName: string;
  /**
   * 事件处理时长 单位s
   */
  eventProcessingTime: number;
  /**
   * 事件处理时长 x天x小时x分钟x秒
   */
  eventProcessingTimeStr: string;
  /**
   * 事件处理状态 0:未处理 1：处理中
   */
  eventStatus: 0 | 1;
  /**
   * 纬度
   */
  latitude: number;
  /**
   * 经度
   */
  longitude: number;
  /**
   * 监控对象名称
   */
  monitorName: string;
}

/**
 * 事件详情状态
 */
export interface IEventDetailsState {
  data: IEventDetailsData;
}

/**
 * 事件详情默认数据
 * @type {{monitorId: string; monitorName: string; latitude: number; eventType: number; eventDurationTime: number; eventLevel: number; eventProcessingTime: number; eventProcessingTimeStr: string; eventStatus: number; eventName: string; startTime: null; endTime: null; administrativeRegion: string; eventEndAddress: string; eventDurationTimeStr: string; longitude: number}}
 */
const defaultData: IEventDetailsState = {
  data: {
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
    startTime: null
  }
};

const eventDetails = <ModelConfig>{
  state: defaultData,
  reducers: {
    updateData: (state: any, data: IEventDetailsData) => {
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
    async getData(reqPayload: IEventDetailsRequest) {
      const { data } = await fetchApis.fetchEventDetails(reqPayload);
      this.updateData(data);
    }
  }
};

export default eventDetails;
