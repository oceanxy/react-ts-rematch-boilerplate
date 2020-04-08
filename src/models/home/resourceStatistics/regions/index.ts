/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 资源统计-按区域（围栏）
 * @Date: 2020-04-07 周二 15:59:27
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-07 周二 15:59:27
 */

import fetchApis from '@/apis';
import { IResourceStatisticsData, IResourceStatisticsRequest } from '@/models/home/resourceStatistics';
import { ModelConfig } from '@rematch/core';

/**
 * 按区域统计资源模块请求参数
 */
export interface IRegionsRequest extends IResourceStatisticsRequest {
  /**
   * 围栏ID。
   */
  fenceIds: string[]
}

/**
 * 按区域统计资源状态
 */
export interface IRegionsState {
  data: IResourceStatisticsData
}

/**
 * 按区域统计资源model
 * @type {ModelConfig}
 */
const regions: ModelConfig = {
  state: <IRegionsState> {
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
    async getData(reqPayload?: IRegionsRequest) {
      let response;

      if (reqPayload) {
        response = await fetchApis.fetchFence(reqPayload);
      } else {
        response = await fetchApis.fetchFence({
          supportMonitorType: -1, // 默认全部
          fenceIds: []
        });
      }

      this.updateData(response.data.statistics);
    }
  }
};

export default regions;
