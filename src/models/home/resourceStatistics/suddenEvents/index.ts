/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 突发事件周边资源model
 * @Date: 2020-04-02 周四 17:01:08
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-02 周四 17:01:08
 */

import fetchApis from '@/apis';
import { IEventDetailsData } from '@/models/home/eventModel/eventDetails';
import { IResourceStatisticsData, IResourceStatisticsRequest } from '@/models/home/resourceStatistics';
import { IRangeControlState } from '@/models/home/resourceStatistics/rangeControl';
import { store } from '@/store';
import { ModelConfig } from '@rematch/core';

/**
 * 突发事件周边资源请求参数
 */
export interface ISuddenEventRequest extends IResourceStatisticsRequest {
  /**
   * 事件开始时间 格式yyyy-MM-dd HH:mm:ss
   */
  startTime: Date
  /**
   * 监控对象ID
   */
  monitorId: string,
  /**
   * 事件类型
   */
  eventType: number
  /**
   * 半径，单位m
   */
  radius: number
}

/**
 * 突发事件周边资源状态
 */
export interface ISuddenEventsState {
  data: IResourceStatisticsData
}

/**
 * 突发事件周边资源model
 * @type {ModelConfig}
 */
const suddenEvents: ModelConfig = {
  state: <ISuddenEventsState> {
    data: {
      itemName: [],
      totalNum: []
    }
  },
  reducers: {
    updateData: (state: any, data: IResourceStatisticsData) => {
      return {
        ...state,
        data
      };
    }
  },
  effects: {
    async getData(reqPayload?: ISuddenEventRequest) {
      let response;

      if (reqPayload) {
        response = await fetchApis.fetchAroundEvent(reqPayload);
      } else {
        const {eventDetails, rangeControl}: {
          eventDetails: IEventDetailsData,
          rangeControl: IRangeControlState
        } = store.getState();

        response = await fetchApis.fetchAroundEvent({
          supportMonitorType: -1, // 默认全部
          startTime: eventDetails.startTime,
          monitorId: eventDetails.monitorId,
          eventType: eventDetails.eventType,
          radius: rangeControl.range! * 1000 // 千米转米
        });
      }

      this.updateData(response.data.statistics);
    }
  }
};

export default suddenEvents;
