/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 高德地图相关类型定义
 * @Date: 2020-04-13 周一 10:18:31
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-30 周四 17:52:46
 */

import { ModelConfig } from '@rematch/core';

declare global {
  /**
   * 海量点
   */
  interface MassPoint extends IEntity {
    /**
     * 经纬度
     */
    lnglat: AMap.LngLat | [number, number]
    /**
     * 点的图标索引
     */
    style: number
    /**
     * 0:无事件发生，1：有事件发生
     *（1：存在24小时内未处理事件或30天内处理中的事件，否则无事件发生）
     */
    happenEvent: 0 | 1
    /**
     * 图标URL
     */
    iconUrl: string
  }

  /**
   * 海量点response
   */
  interface MassPointResponse {
    /**
     * 海量点集合
     */
    positionList: MassPoint[]
    /**
     * 图片URL集合，positionList中的style对应该数组的下标
     */
    iconSortList: string[]
  }

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
    /**
     * 海量点数据
     */
    massPoints: MassPointResponse
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
      fetchMassPoint(monitorType: IEntity['monitorType']): void
    }
  }
}
