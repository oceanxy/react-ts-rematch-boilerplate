/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 地图model
 * @Date: 2020-03-31 周二 17:03:31
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-26 周日 14:25:31
 */

import { store } from '@/store';

/**
 * 地图model
 * @type {{reducers: {updateMapInstance: (state: IMapState, map: AMap.Map) => {mapInstance: AMap.Map | null; map: AMap.Map}}; state: IMapState}}
 */
const map: IAMapModel = {
  state: {
    mapInstance: null,
    mouseToolType: null,
    callback: undefined
  },
  reducers: {
    updateState: (state: IAMapState, payload: Partial<IAMapState>): IAMapState => ({
      ...state,
      ...payload
    })
  },
  effects: {
    setState(payload: Partial<IAMapState>): void {
      store.dispatch.map.updateState(payload);
    }
  }
};

export default map;
