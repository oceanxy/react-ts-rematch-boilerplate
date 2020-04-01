/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件列表model
 * @Date: 2020-03-23 14:59:49
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-01 周三 11:04:01
 */

import fetchApis from '@/apis';
import { IEventStatisticsState } from '@/models/home/eventModel/eventStatistics';
import { store } from '@/store';
import { ModelConfig } from '@rematch/core';
import { IEventDetailsData, IEventDetailsRequest } from '../eventDetails';

/**
 * 事件接口
 */
export interface IEvent {
  /**
   * 监控对象ID
   */
  monitorId: string;
  /**
   * 监控对象名称
   */
  monitorName: string;
  /**
   * 事件类型
   */
  eventType: number;
  /**
   * 事件名称
   */
  eventName: string;
  /**
   * 事件等级 1：一般 2：较重 3：严重 4：特别严重 0：没有事件详情数据
   */
  eventLevel: 0 | 1 | 2 | 3 | 4;
  /**
   * 处理状态 0:未处理 1：处理中
   */
  eventStatus: 0 | 1;
  /**
   * 事件开始时间
   */
  startTime: Date | null;
}

/**
 * 事件模块数据
 */
export interface IEventData {
  /**
   * 最新的事件详情数据
   */
  latestEventDetails: IEventDetailsData;
  /**
   * 事件统计数据
   */
  eventStatistics: IEventStatisticsState;
  /**
   * 事件列表数据集
   */
  eventList: IEvent[];
}

/**
 * 事件列表请求参数
 */
export interface IEventListRequest {
  /**
   * 事件处理状态 -1或不传:全部；0:未处理；1处理中
   */
  eventStatus?: -1 | 0 | 1 | null;
  /**
   * 监控对象ID 不传查询全部
   */
  monitorId?: string | null;
  /**
   * 排序：默认按时间 0 ：按时间 1：按监控对象
   */
  sortType: 0 | 1;
  /**
   * 是否返回首条事件的详情信息 0 不返回 1返回 默认为0
   */
  isReturnEventDetails: 0 | 1;
  /**
   * 请求数据时，事件统计方式较上一次请求是否发生改变，即eventStatus字段是否改变
   */
  isStatisticsMethodChanged?: boolean;
}

/**
 * 事件列表状态
 */
export interface IEventListState {
  /**
   * 事件列表数据
   */
  data: IEvent[];
  /**
   * 事件列表当前选中项（当前选中的监控对象）的ID
   */
  curSelectedMonitorId: IEventDetailsRequest['monitorId'];
}

/**
 * 事件列表model
 * @type {ModelConfig}
 */
const eventList: ModelConfig = <ModelConfig>{
  state: <IEventListState>{
    data: [],
    curSelectedMonitorId: ''
  },
  reducers: {
    updateData: (state: any, data: IEventData) => {
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
    async getData(reqPayload: IEventListRequest) {
      const response = await fetchApis.fetchEventList(reqPayload);
      const { latestEventDetails, eventStatistics, eventList }: IEventData = response.data;

      // 更新事件详情
      if (eventList?.length && !reqPayload.isStatisticsMethodChanged) {
        store.dispatch.eventDetails.updateData(latestEventDetails);
      }

      // 更新事件数量
      store.dispatch.eventStatistics.updateData(eventStatistics);
      // 更新事件列表
      this.updateData(eventList);
    },
    async itemClick(reqPayload: IEventDetailsRequest) {
      // 根据请求参数获取事件详情数据
      await store.dispatch.eventDetails.getData(reqPayload);
    },
    async setCurId(curSelectedMonitorId) {
      this.updateCurId(curSelectedMonitorId);
    }
  }
};

export default eventList;
