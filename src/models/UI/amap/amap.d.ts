/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 高德地图相关类型定义
 * @Date: 2020-04-13 周一 10:18:31
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-26 周日 14:25:39
 */

import { ModelConfig } from '@rematch/core';

declare global {
  /**
   * 地图状态
   */
  interface IAMapState {
    mapInstance: AMap.Map | null,
    /**
     * 当前鼠标工具类型
     */
    mouseToolType: 'circle' | 'polygon' | null
    /**
     * 触发鼠标事件，且鼠标事件操作完成后需要执行的回调函数
     */
    callback?: (type: any, overlay: AMap.Circle) => void
  }

  /**
   * 地图model接口
   */
  interface IAMapModel extends ModelConfig {
    /**
     * 地图状态
     */
    state: IAMapState,
    reducers: {
      /**
       * 更新本地状态
       * @param {IAMapState} state
       * @param {Partial<IAMapState>} payload
       * @returns {IAMapState}
       */
      updateState(state: IAMapState, payload: Partial<IAMapState>): IAMapState
    }
    effects: {
      /**
       * 设置状态
       * @param {Partial<IAMapState>} payload
       */
      setState(payload: Partial<IAMapState>): void
    }
  }
}
