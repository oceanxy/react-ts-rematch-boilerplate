/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 实体（监控对象）类型定义
 * @Date: 2020-04-13 周一 14:16:31
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-29 周三 15:54:21
 */

import { APIResponse } from '@/interfaces/api/mock';
import { EntityType } from '@/models/UI/entity/index';
import { ModelConfig } from '@rematch/core';

declare global {
  /**
   * 实体接口
   */
  interface IEntity {
    /**
     * 监控对象ID（平台ID）
     * 若是调度员时，是用户uuid
     */
    monitorId?: string
    /**
     * 监控对象ID（第三方对讲服务ID）
     */
    userId?: number
    /**
     * 监控对象名称
     */
    monitorName?: string
    /**
     * 监控对象类型
     * -1：全部 0：车；1：人；2：物；9：静态物资；10：调度员
     */
    monitorType?: -1 | EntityType
    /**
     * 所属分组名称
     */
    assignmentName?: string
    /**
     * 所属分组名称
     */
    curAssignmentName: string
    /**
     * 所属分组类型
     * 1 固定组 2 任务组 3 临时组
     */
    curAssignmentType: 1 | 2 | 3
    /**
     * 设备号
     */
    deviceNum?: number
    /**
     * 所属组织名称
     */
    groupName?: string
    /**
     * SIM卡号
     */
    simCardNum?: number
    /**
     * 型号名称
     */
    modelName?: string
    /**
     * 设备类型 0：普通对讲设备 1：调度员 2：Ⅱ类账号
     */
    type?: 0 | 1 | 2
    /**
     * 对讲成员在线状态 1:在线 ，0：不在线
     */
    onlineStatus?: 0 | 1
    /**
     * 对讲成员名称
     */
    userName?: string
    /**
     * 是否被禁言
     */
    hasForbiddenWord: boolean
    /**
     * 图标url
     */
    iconUrl: string
    /**
     * 车牌颜色
     * 当监控对象为车辆时有效
     */
    plateColor: string
  }

  // 请求参数
  interface IEntityRequest {
    /**
     * 监控对象名称关键字
     */
    simpleQueryParam?: string
    /**
     * 起始记录 默认为0
     */
    start?: number
    /**
     * 返回记录数 默认为10
     */
    length?: number
    /**
     * 多个用逗号隔开, -1 全部 0：车 1 :人 2 :动态物品 9:静态物资 10:调度员
     */
    supportMonitorType: -1 | 0 | 1 | 2 | 9 | 10
  }

  /**
   * 按圆形搜索监控对象
   */
  interface IEntityByCircleRequest extends IEntityRequest {
    /**
     * 在/离线状态
     */
    onlineStatus?: -1 | 0 | 1
    /**
     * 半径 ，单位m
     */
    radius: number
    /**
     * 圆心经度
     */
    longitude: number
    /**
     * 圆心纬度
     */
    latitude: number
    /**
     * 分组ID
     */
    assignmentId?: string
  }

  /**
   * 实体状态
   */
  interface IEntityState {
    /**
     * 所有实体
     */
    entities: IEntity[]
    /**
     * 搜索框根据关键字获取的实体（监控对象）数据
     */
    searchEntities: IEntity[]
    /**
     * 当前实体ID
     */
    currentEntityId: string
  }

  /**
   * 实体（监控对象）model
   */
  interface IEntityModel extends ModelConfig {
    state: IEntityState,
    reducers: {
      /**
       * 更新本地状态
       * @param {IEntityState} state
       * @param {Partial<IEntityState>} payload
       * @returns {IEntityState}
       */
      updateState(state: IEntityState, payload: Partial<IEntityState>): IEntityState
    },
    effects: {
      /**
       * 获取实体（监控对象）数据
       * @param {IEntityRequest} reqPayload
       */
      fetchData(reqPayload: IEntityRequest): void
      /**
       * 根据地图圆形圈选获取实体数据
       * @param {IEntityByCircleRequest} reqPayload
       * @returns {Promise<APIResponse<{monitors: IEntity[]}>>}
       */
      fetchDataByCircle(reqPayload?: IEntityByCircleRequest): Promise<APIResponse<{monitors: IEntity[]}>>
      /**
       * 获取固定的监控对象
       * @param {IEntityByCircleRequest} reqPayload
       * @returns {Promise<APIResponse<{monitors: IEntity[]}>>}
       */
      fetchFixedData(reqPayload?: IEntityRequest): Promise<APIResponse<{monitors: IEntity[]}>>
      /**
       * 设置状态
       * @param {Partial<IEntityState>} payload
       */
      setState(payload: Partial<IEntityState>): void
    }
  }
}
