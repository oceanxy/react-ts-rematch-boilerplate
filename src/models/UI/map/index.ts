/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 地图model
 * @Date: 2020-03-31 周二 17:03:31
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-03-31 周二 17:03:31
 */

import { ModelConfig } from '@rematch/core';

interface IMapState {
  map: AMap.Map | null
}

const map: ModelConfig = {
  state: <IMapState> {
    map: null
  },
  reducers: {
    updateMapInstance: (state: IMapState, map: AMap.Map) => ({...state, map})
  }
};

export default map;