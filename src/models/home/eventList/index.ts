/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件列表model
 * @Date: 2020-03-23 14:59:49
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-03-28 00:27:38
 */

import fetchApis from '@/apis';
import {EventDetailsData, EventDetailsRequest} from '@/models/home/eventDetails';
import {EventStatisticsData} from '@/models/home/eventStatistics';
import {store} from '@/store';
import {ModelConfig} from '@rematch/core';

export type EventItemData = {
  monitorId: string, // 监控对象ID
  monitorName: string, // 监控对象名称
  eventType: number, // 事件类型
  eventName: string, // 事件名称
  eventLevel: 0 | 1 | 2 | 3 | 4, // 事件等级 1：一般 2：较重 3：严重 4：特别严重 0：没有事件详情数据
  eventStatus: 0 | 1, // 处理状态 0:未处理 1：处理中
  startTime: Date | null // 事件开始时间
}

type EventData = {
  latestEventDetails: EventDetailsData
  eventStatistics: EventStatisticsData
  eventList: EventItemData[]
}

export type EventListRequest = {
  eventStatus?: -1 | 0 | 1 | null // -1或不传:全部；0:未处理；1处理中
  monitorId?: string | null // 监控对象ID，不传查询全部
  sortType: 0 | 1 // 排序：默认按时间 0 ：按时间 1：按监控对象
  isReturnEventDetails: 0 | 1 // 是否返回首条事件的详情信息 0 不返回 1返回 默认为0
  isStatisticsMethodChanged?: boolean // 请求数据时，事件统计方式较上一次请求是否发生改变，即eventStatus字段是否改变
}

const eventList = <ModelConfig>{
  state: {
    data: <EventItemData[]>[],
    curSelectedMonitorId: ''
  },
  reducers: {
    updateData: (state: any, data) => {
      return {
        ...state,
        data
      };
    },
    updateCurId: (state: any, curSelectedMonitorId) => {
      return {
        ...state,
        curSelectedMonitorId
      };
    }
  },
  effects: {
    async getData(reqPayload: EventListRequest) {
      const response = await fetchApis.fetchEventList(reqPayload);
      const {latestEventDetails, eventStatistics, eventList}: EventData = response.data;

      // 更新事件详情
      if (eventList?.length && !reqPayload.isStatisticsMethodChanged) {
        store.dispatch.eventDetails.updateData(latestEventDetails);
      }

      // 更新事件数量
      store.dispatch.eventStatistics.updateData(eventStatistics);
      // 更新事件列表
      this.updateData(eventList);
    },
    async itemClick(reqPayload: EventDetailsRequest) {
      // 根据请求参数获取事件详情数据
      await store.dispatch.eventDetails.getData(reqPayload);
    },
    async setCurId(curSelectedMonitorId) {
      this.updateCurId(curSelectedMonitorId);
    }
  }
};

export default eventList;
