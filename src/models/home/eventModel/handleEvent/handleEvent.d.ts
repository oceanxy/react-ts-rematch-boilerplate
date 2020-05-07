/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 处理事件类型定义
 * @Date: 2020-05-07 周四 15:18:57
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-07 周四 15:18:57
 */

import { APIResponse } from '@/interfaces/api/mock';
import { ModelConfig } from '@rematch/core';

declare global {
  /**
   * 处理事件状态
   */
  interface IHandleEventState {
    /**
     * 监控对象
     */
    monitorId: string
    /**
     * 事件类型
     */
    eventType?: number
    /**
     * 描述信息
     */
    description?: string
    /**
     * 事件开始时间 格式:yyyy-MM-dd HH:mm:ss
     */
    startTime?: Date | null
  }

  /**
   * 处理事件request
   */
  interface IHandleEventRequest extends IHandleEventState {}

  /**
   * 处理事件response
   */
  interface IHandleEventResponse {
    handledEventList: [
      {
        description: string
        eventLevel: IEvent['eventLevel']
        eventName: string
        eventStatus: IEvent['eventStatus']
        eventType: number
        monitorId: string
        monitorName: string
        startTime: Date | null
      }
    ]
  }

  /**
   * 事件统计组件model
   */
  interface IHandleEventModel extends ModelConfig {
    state: IHandleEventState
    reducers: {
      updateData(state: IHandleEventState, data: Partial<IHandleEventState>): IHandleEventState
    }
    effects: {
      handleEvent(reqPayload: IHandleEventRequest): Promise<APIResponse<IHandleEventResponse>>
    }
  }
}
