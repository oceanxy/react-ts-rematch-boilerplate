/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件详情类型定义
 * @Date: 2020-04-13 周一 11:49:28
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-07 周四 10:32:40
 */

import { ModelConfig } from '@rematch/core';

declare global {
  /**
   * 事件详情请求参数
   */
  interface IEventDetailsRequest {
    /**
     * 事件开始时间 格式yyyy-MM-dd HH:mm:ss
     */
    startTime: Date | null
    /**
     * 监控对象ID
     */
    monitorId: string
    /**
     * 事件类型
     */
    eventType: number
  }

  /**
   * 事件详情数据
   */
  interface IEventDetailsData extends IEventDetailsRequest {
    /**
     * 行政区块 到区县，如"重庆市沙坪坝区"
     */
    administrativeRegion: string
    /**
     * 位置
     */
    eventEndAddress: string
    /**
     * 事件结束时间 格式yyyy-MM-dd HH:mm:ss
     */
    endTime: Date | null
    /**
     * 事件持续时长 单位s
     */
    eventDurationTime: number
    /**
     * 事件持续时长 x天x小时x分钟x秒
     */
    eventDurationTimeStr: string
    /**
     * 事件等级 1：一般 2：较重 3：严重 4：特别严重 0：没有事件详情数据
     */
    eventLevel: 0 | 1 | 2 | 3 | 4
    /**
     * 事件名称
     */
    eventName: string
    /**
     * 事件处理时长 单位s
     */
    eventProcessingTime: number
    /**
     * 事件处理时长 x天x小时x分钟x秒
     */
    eventProcessingTimeStr: string
    /**
     * 事件处理状态 0:未处理 1：处理中
     */
    eventStatus: 0 | 1
    /**
     * 纬度
     */
    latitude: number
    /**
     * 经度
     */
    longitude: number
    /**
     * 监控对象名称
     */
    monitorName: string
    /**
     * 事件ID
     */
    eventId: string
  }

  /**
   * 事件详情状态
   */
  interface IEventDetailsState {
    /**
     * 用于查询数据的参数（注意：此对象内的monitorId暂未使用，现在统一使用的是eventList里面的curSelectedMonitorId）
     */
    queryParams: Partial<IEventDetailsRequest>
    /**
     * 数据
     */
    data: IEventDetailsData
  }

  interface IEventDetailsModel extends ModelConfig {
    state: IEventDetailsState
    reducers: {
      /**
       * 更新本地状态
       * @param {IEventDetailsState} state
       * @param {Partial<IEventDetailsState>} payload
       * @returns {IEventDetailsState}
       */
      updateData(state: IEventDetailsState, payload: Partial<IEventDetailsState>): IEventDetailsState
      /**
       * 快速清除数据
       * @returns {IEventDetailsState}
       */
      clearData(): IEventDetailsState
    }
    effects: {
      /**
       * 设置状态
       * @param {Partial<IEventDetailsState>} payload
       */
      setState(payload: Partial<IEventDetailsState>): void
      /**
       * 获取数据
       * @param {IEventDetailsRequest} reqPayload
       */
      fetchData(reqPayload?: IEventDetailsRequest): void
    }
  }
}
