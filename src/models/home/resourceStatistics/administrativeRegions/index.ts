/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 资源统计-按行政区划
 * @Date: 2020-04-07 周二 15:39:30
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-07 周二 15:39:30
 */

import fetchApis from '@/apis';
import { IResourceStatisticsData, IResourceStatisticsRequest } from '@/models/home/resourceStatistics';
import { ModelConfig } from '@rematch/core';
import LngLat = AMap.LngLat;

/**
 * 按行政区划统计资源模块请求参数
 */
export interface IAdministrativeRegionRequest extends IResourceStatisticsRequest {
  /**
   * 行政区块边界值
   * 多个边界值数组用“-”隔开
   */
  administrativeLngLat: string
}

/**
 * 按行政区划统计资源状态
 */
export interface IAdministrativeRegionState {
  /**
   * 渲染图表的数据
   */
  data: IResourceStatisticsData
  /**
   * 当前行政区划级联数据
   * 依次为 省/直辖市、市、区/县
   */
  value: [string?, string?, string?]
  /**
   * 当前选中的行政区划的边界值（来自高德地图）
   */
  bounds: LngLat[][] | undefined
}

/**
 * 默认数据
 * @type {{itemName: any[]; totalNum: any[]}}
 */
const defaultState: IAdministrativeRegionState = {
  data: {
    itemName: [],
    totalNum: []
  },
  value: [],
  bounds: []
};

/**
 * 按行政区划统计资源model
 * @type {ModelConfig}
 */
const administrativeRegion: ModelConfig = {
  state: defaultState,
  reducers: {
    updateData: (state: any, data: IResourceStatisticsData) => {
      return {
        ...state,
        data
      };
    },
    updateValue: (state: any, value: IAdministrativeRegionState['value']) => {
      return {
        ...state,
        value
      };
    },
    updateBounds: (state: any, bounds: IAdministrativeRegionState['bounds']) => {
      return {
        ...state,
        bounds
      };
    },
    clearData: () => {
      return defaultState;
    }
  },
  effects: {
    async getData(reqPayload?: IAdministrativeRegionRequest) {
      let response;

      if (reqPayload) {
        response = await fetchApis.fetchAdministrativeRegions(reqPayload);
      } else {
        response = await fetchApis.fetchAdministrativeRegions({
          supportMonitorType: -1, // 默认全部
          administrativeLngLat: []
        });
      }

      this.updateData(response.data.statistics);
    }
  }
};

export default administrativeRegion;
