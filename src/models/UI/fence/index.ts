/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 围栏model
 * @Date: 2020-04-09 周四 09:40:08
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-13 周一 14:37:26
 */

import fetchApis from '@/apis';
import { store } from '@/store';

/**
 * 围栏model
 * @type {IFenceModel}
 */
const fence: IFenceModel = {
  state: {
    fences: [],
    searchFences: [],
    currentFenceId: ''
  },
  reducers: {
    updateState(state, payload) {
      return {
        ...state,
        ...payload
      };
    }
  },
  effects: {
    async fetchData(reqPayload) {
      const response = await fetchApis.fetchFences(reqPayload);
      // 按围栏名称搜索时（默认）
      let params: Partial<IFenceState> = {searchFences: response.data.fenceTreeNodes || []};

      // 根据搜索条件更新对应的状态
      if (!reqPayload.queryParam) {
        // 获取全部围栏时
        params = {fences: response.data.fenceTreeNodes || []};
      }

      store.dispatch.fence.updateState(params);
    },
    setFenceId(id): void {
      store.dispatch.fence.updateState({currentFenceId: id || ''});
    }
  }
};

export default fence;
