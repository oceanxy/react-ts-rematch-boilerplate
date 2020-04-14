/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件列表类型定义
 * @Date: 2020-04-13 周一 13:32:43
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-13 周一 13:32:43
 */

import { IEventStatisticsState } from '@/models/home/eventModel/eventStatistics';
import { ModelConfig } from '@rematch/core';

declare global {
  /**
   * 事件接口
   */
  interface IEvent {
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
  interface IEventData {
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
  interface IEventListRequest {
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
  interface IEventListState {
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
   */
  interface IEventListModel extends ModelConfig {
    state: IEventListState
    reducers: {
      updateData(state: IEventListState, data: IEvent[]): IEventListState
      updateCurId(state: IEventListState, curSelectedMonitorId: IEventListState['curSelectedMonitorId']): IEventListState
    }
    effects: {
      fetchData(reqPayload: IEventListRequest): void
      itemClick(reqPayload: IEventDetailsRequest): void
      setCurId(curSelectedMonitorId: IEventListState['IEventListState']): void
    }
  }
}