import { ModelConfig } from '@rematch/core';

/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 高德地图相关类型定义
 * @Date: 2020-04-13 周一 10:18:31
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-13 周一 10:18:31
 */

declare global {
  /**
   * 地图状态
   */
  interface IAMapState {
    mapInstance: AMap.Map | null
  }

  /**
   * 地图model接口
   */
  interface IAMapModel extends ModelConfig {
    state: IAMapState,
    reducers: {
      updateMapInstance(state: IAMapState, mapInstance: AMap.Map): IAMapState
    }
  }
}
