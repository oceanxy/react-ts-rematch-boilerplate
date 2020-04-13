/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 资源统计-按行政区划
 * @Date: 2020-04-07 周二 15:39:30
 * @Date: 2020-04-13 周一 10:12:41
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-13 周一 10:12:41
 */

import fetchApis from '@/apis';
import { store } from '@/store';
import { boundsToString } from '@/utils/helper';

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
    async fetchData(reqPayload) {
      let response;

      if (reqPayload) {
        response = await fetchApis.fetchRSByAdminRegions(reqPayload);
      } else {
        const boundsStr = boundsToString(store.getState().adminDivisionResources.bounds);

        response = await fetchApis.fetchRSByAdminRegions({
          supportMonitorType: -1, // 默认全部
          administrativeLngLat: boundsStr
        });
      }

      store.dispatch.adminDivisionResources.updateState({data: response.data.statistics});
    },
    resetState(payload): void {
      if (payload && Object.keys(payload).length) {
        store.dispatch.adminDivisionResources.updateState(payload);
      } else {
        store.dispatch.adminDivisionResources.updateState(defaultState);
      }
    }
  }
};

export default adminDivisionResources;
