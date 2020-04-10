/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 地图model
 * @Date: 2020-03-31 周二 17:03:31
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-03-31 周二 17:03:31
 */

import { ModelConfig } from '@rematch/core';

/**
 * 地图状态
 */
export interface IMapState {
  mapInstance: AMap.Map | null
}

/**
 * 地图model
 * @type {{reducers: {updateMapInstance: (state: IMapState, map: AMap.Map) => {mapInstance: AMap.Map | null; map: AMap.Map}}; state: IMapState}}
 */
const map: ModelConfig = {
  state: <IMapState>{
    mapInstance: null
  },
  reducers: {
    updateMapInstance: (state: IMapState, mapInstance: AMap.Map) => ({ ...state, mapInstance })
  }
};

export default map;