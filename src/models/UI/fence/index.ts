/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 围栏model
 * @Date: 2020-04-09 周四 09:40:08
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-11 周一 16:39:09
 */

import fetchApis from '@/apis';
import { APIResponse } from '@/interfaces/api/mock';
import { store } from '@/store';

/**
 * 围栏种类
 */
export enum FenceType {
  /**
   * 圆形围栏
   * @type {string}
   */
  Circle = 'zw_m_circle',
  /**
   * 多边形围栏
   * @type {string}
   */
  Polygon = 'zw_m_polygon',
  /**
   * 路径围栏
   * @type {string}
   */
  Line = 'zw_m_line',
  /**
   * 标注围栏
   * @type {string}
   */
  Marker = 'zw_m_marker',
  /**
   * 行政区划围栏
   * @type {string}
   */
  Administration = 'zw_m_administration'
}

/**
 * 围栏model
 * @type {IFenceModel}
 */
const fence: IFenceModel = {
  state: {
    fences: [],
    searchFences: [],
    currentFenceId: '',
    mapFences: undefined
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
    setState(payload): void {
      store.dispatch.fence.updateState(payload);
    },
    async fetchAreaData() {
      const response: APIResponse<IFenceAreaResponse> = await fetchApis.fetchUserFence();

      store.dispatch.fence.updateState({mapFences: response.data});
    },
    async fetchDetails(reqPayload: IFenceDetailsRequest): Promise<APIResponse<IFenceDetailsResponse>> {
      store.dispatch.panelControl.setState({loading: true});
      const response = await fetchApis.fetchFenceDetails(reqPayload);
      store.dispatch.panelControl.setState({loading: false});

      return response;
    }
  }
};

export default fence;
