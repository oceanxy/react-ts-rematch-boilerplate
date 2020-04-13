/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 资源统计-区域内资源model
 * @Date: 2020-04-07 周二 15:59:27
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-10 周五 16:26:32
 */

import fetchApis from '@/apis';
import { store } from '@/store';

/**
 * 默认数据
 * @type {IResourceStatisticsData}
 */
const defaultData: IResourceStatisticsData = {
  itemName: [],
  totalNum: []
};

/**
 * 按区域统计资源model
 * @type {IRegionalResourcesModel}
 */
const regionalResources: IRegionalResourcesModel = {
  state: {
    data: defaultData
  },
  reducers: {
    updateData: (state, data) => {
      return {
        ...state,
        data
      };
    }
  },
  effects: {
    async fetchData(reqPayload) {
      const {currentFenceId} = store.getState().fence;

      // 检测围栏ID是否为空
      if (currentFenceId) {
        let response;

        if (reqPayload) {
          response = await fetchApis.fetchRSByFence(reqPayload);
        } else {
          response = await fetchApis.fetchRSByFence({
            supportMonitorType: -1, // 默认全部（-1）
            fenceIds: currentFenceId
          });
        }

        store.dispatch.regionalResources.updateData(response.data.statistics);
      } else {
        store.dispatch.regionalResources.updateData(defaultData);
      }
    }
  }
};

export default regionalResources;
