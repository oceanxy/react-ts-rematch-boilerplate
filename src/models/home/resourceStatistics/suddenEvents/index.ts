/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 突发事件周边资源model
 * @Date: 2020-04-02 周四 17:01:08
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-02 周四 17:01:08
 */

import fetchApis from '@/apis';
import { ModelConfig } from '@rematch/core';

/**
 * 突发事件周边资源接口
 */
export interface ISuddenEvent {
  /**
   * 突发事件周边资源名称
   */
  itemName: string[],
  /**
   * 突发事件周边资源数量
   */
  totalNum: number[]
}

/**
 * 突发事件周边资源请求参数
 */
export interface ISuddenEventRequest {
  /**
   * 监控对象类型多个用逗号隔开, -1 全部 0：车 1 :人 2 :动态物品 9:静态物资 10:调度员
   */
  supportMonitorType: -1 | 0 | 1 | 2 | 9 | 10 | string
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
  radius: string
}

/**
 * 突发事件周边资源状态
 */
export interface ISuddenEventsState {
  data: ISuddenEvent
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
    updateData: (state: any, data: ISuddenEvent) => {
      return {
        ...state,
        data
      };
    }
  },
  effects: {
    async getData(reqPayload: ISuddenEventRequest) {
      const response = await fetchApis.fetchSourcesStatistics(reqPayload);
      this.updateData(response.data.statistics);
    }
  }
};

export default suddenEvents;
