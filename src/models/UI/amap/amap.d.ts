/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 高德地图相关类型定义
 * @Date: 2020-04-13 周一 10:18:31
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-30 周四 17:52:46
 */

import { APIResponse } from '@/interfaces/api/mock';
import { ModelConfig } from '@rematch/core';

declare global {
  /**
   * 弹窗request
   */
  interface InfoWindowRequest {
    /**
     * 监控对象ID
     */
    monitorId: string
    /**
     * 监控对象类型
     */
    monitorType: IEntity['monitorType']
    /**
     * 默认0。0:按监控对象 1:按事件
     */
    queryType?: 0 | 1
    /**
     * 事件开始时间，按事件查询时必填
     */
    startTime?: Date | null
    /**
     * 事件类型，按事件查询时必填
     */
    eventType?: IEvent['eventType']
  }

  interface InfoWindowResponse {
    /**
     * 监控对象详情
     */
    monitor: {
      /**
       * 监控对象ID
       */
      monitorId: string
      /**
       * 监控对象类型 0：车 1 :人 2 :动态物品 9:静态物资 10:调度员
       */
      monitorType: 0 | 1 | 2 | 9 | 10
      /**
       * 监控对象名称
       */
      monitorName: string
      /**
       * 当前群组
       */
      curAssignmentName: string
      /**
       * 当前组类型，1：固定组 2：任务组 3：临时组
       */
      curAssignmentType: 1 | 2 | 3
      /**
       * 设备在线状态 0：离线 1：在线
       */
      onlineStatus: 0 | 1
      /**
       * 是否被禁言
       */
      hasForbiddenWord: boolean
      /**
       * 物资类型名称
       */
      thingTypeName: string
    }
    /**
     * 定位信息
     */
    location: {
      /**
       * 定位时间
       */
      gpsTime: string
      /**
       * 地址
       */
      address: string
      /**
       * 经度
       */
      longitude: number
      /**
       * 纬度
       */
      latitude: number
    }
    /**
     * 任务列表
     */
    tasks: ITask[]
    /**
     * 告警事件名称（多个用逗号隔开）
     */
    eventNames: string
    /**
     * 事件列表
     */
    eventList: IEvent[]
  }

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
      /**
       * 获取海量点数据
       * @param {IEntity["monitorType"]} monitorType
       */
      fetchMassPoint(monitorType: IEntity['monitorType']): void
      /**
       * 获取弹窗信息
       * @param {InfoWindowRequest} reqPayload
       * @returns {Promise<APIResponse<InfoWindowResponse>>}
       */
      fetchWindowInfo(reqPayload: InfoWindowRequest): Promise<APIResponse<InfoWindowResponse>>
    }
  }
}
