/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 资源统计-按行政区划
 * @Date: 2020-04-07 周二 15:39:30
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-10 周五 17:16:25
 */

import fetchApis from '@/apis';
import { store } from '@/store';

/**
 * 默认数据
 * @type {{itemName: any[]; totalNum: any[]}}
 */
const defaultState: IAdminDivisionResourcesState = {
  data: {
    itemName: [],
    totalNum: []
  },
  value: [],
  bounds: []
};

/**
 * 按行政区划统计资源model
 * @type {IAdminDivisionResourcesModel}
 */
const adminDivisionResources: IAdminDivisionResourcesModel = {
  state: defaultState,
  reducers: {
    updateState: (state, payload) => {
      return {
        ...state,
        ...payload
      };
    }
  },
  effects: {
    async fetchData(reqPayload?: IAdminDivisionResourcesRequest) {
      let response;

      if (reqPayload) {
        response = await fetchApis.fetchRSByAdminRegions(reqPayload);
      } else {
        response = await fetchApis.fetchRSByAdminRegions({
          supportMonitorType: -1, // 默认全部
          administrativeLngLat: []
        });
      }

      store.dispatch.adminDivisionResources.updateState(response.data.statistics);
    },
    resetState(): void {
      store.dispatch.adminDivisionResources.updateState({});
    }
  }
};

export default adminDivisionResources;
