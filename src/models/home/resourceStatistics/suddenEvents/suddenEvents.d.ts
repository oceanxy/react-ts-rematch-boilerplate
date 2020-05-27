/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 突发事件周边资源类型定义
 * @Date: 2020-04-13 周一 11:42:37
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-27 周三 11:22:27
 */

import { ModelConfig } from '@rematch/core';

declare global {
  /**
   * 突发事件周边资源请求参数
   */
  interface ISuddenEventRequest extends IResourceStatisticsRequest {
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
  interface ISuddenEventsState {
    data: IResourceStatisticsData
  }

  interface ISuddenEventsModel extends ModelConfig {
    state: ISuddenEventsState
    reducers: {
      updateData(state: ISuddenEventsState, payload: Partial<ISuddenEventsState>): ISuddenEventsState
    }
    effects: {
      getData(reqPayload?: ISuddenEventRequest): void
      setState(payload: Partial<ISuddenEventsState>): void
    }
  }
}
