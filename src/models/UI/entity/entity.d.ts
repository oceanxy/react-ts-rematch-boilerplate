/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 实体（监控对象）类型定义
 * @Date: 2020-04-13 周一 14:16:31
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-13 周一 14:16:31
 */

import { APIResponse } from '@/interfaces/api/mock';
import { ModelConfig } from '@rematch/core';

declare global {
  /**
   * 实体接口
   */
  interface IEntity {
    /**
     * 监控对象ID
     */
    monitorId: string
    /**
     * 监控对象名称
     */
    monitorName: string
    /**
     * 监控对象类型
     * -1：全部 0：车；1：人；2：物；9：静态物资；10：调度员
     */
    monitorType: -1 | 0 | 1 | 2 | 9 | 10
    /**
     * 所属分组名称
     */
    assignmentName: string
    /**
     * 设备号
     */
    deviceNum: number
    /**
     * 所属组织名称
     */
    groupName: string
    /**
     * SIM卡号
     */
    simCardNum: number
    /**
     * 对讲平台使用的监控对象ID
     */
    userId: number | string
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
   * 围栏model接口
   */
  interface IEntityModel extends ModelConfig {
    state: IEntityState,
    reducers: {
      updateState(state: IEntityState, payload: Partial<IEntityState>): IEntityState
    },
    effects: {
      fetchData(reqPayload: IEntityRequest): void
      fetchDataByCircle(reqPayload?: IEntityByCircleRequest): Promise<APIResponse<{monitors: IEntity[]}>>
      setEntityId(id?: IEntityState['currentEntityId']): void
    }
  }
}
