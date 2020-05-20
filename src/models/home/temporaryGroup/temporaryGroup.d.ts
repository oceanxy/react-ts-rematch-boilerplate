/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 临时组类型定义
 * @Date: 2020-04-23 周四 13:53:48
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-14 周四 15:33:52
 */

import { APIResponse } from '@/interfaces/api/mock';
import { MouseToolType } from '@/models/UI/amap';
import { ModelConfig } from '@rematch/core';

declare global {
  import LngLat = AMap.LngLat;
  /**
   * 触发编辑临时组或临时组成员的条件
   */
  type EditTempGroupType =
    {
      readonly mouseToolType: Exclude<MouseToolType, MouseToolType.Null>
      readonly byCondition: IEntityState['byCondition']
    } | {readonly byFixedEntity: true}

  /**
   * 临时组接口
   */
  interface ITemporaryGroup {
    /**
     * 临时组ID（第三方的对讲组ID）
     */
    intercomGroupId: number
    /**
     * 临时组名称
     */
    name: string
    /**
     * 临时组ID（平台ID）
     */
    id: string
  }

  /**
   * 创建临时组请求参数（平台）
   */
  interface ICreateTemporaryGroupRequest {
    /**
     * 临时组名称
     */
    temporaryGroup: string,
    /**
     * 对讲组id （第三方返回的对讲组ID）
     */
    intercomGroupId?: number,
    /**
     * 临时组内人员id（第三方返回的userId），逗号分隔
     */
    userIds: number[]
  }

  /**
   * 临时组状态
   */
  interface ITemporaryGroupState {
    /**
     * 临时组数据列表
     */
    data: ITemporaryGroup[]
    /**
     * 临时组编辑框显示状态
     */
    isShowEditModal: boolean
    /**
     * 创建时临时组时，按钮的loading状态
     */
    loading: boolean
    /**
     * 编辑对话框名称
     */
    title: string
    /**
     * 编辑时的回填信息
     */
    backFillInfo: {
      /**
       * 临时组名称
       */
      name?: string
      /**
       * 半径
       */
      radius?: number
      /**
       * 中心点
       */
      center?: LngLat
      /**
       * 边界值
       */
      bounds?: string
      /**
       * 圆心精度
       */
      longitude?: number
      /**
       * 圆心纬度
       */
      latitude?: number
      /**
       * 矩形西北角坐标
       */
      northWest?: LngLat
      /**
       * 矩形东南角坐标
       */
      southEast?: LngLat
    }
  }

  /**
   * 临时组model
   */
  interface ITemporaryGroupModel extends ModelConfig {
    state: ITemporaryGroupState
    reducers: {
      /**
       * 更新本地状态
       * @param {ITemporaryGroupState} state
       * @param {Partial<ITemporaryGroupState>} payload
       * @returns {ITemporaryGroupState}
       */
      updateState(state: ITemporaryGroupState, payload: Partial<ITemporaryGroupState>): ITemporaryGroupState
    }
    effects: {
      /**
       * 获取服务端临时组数据
       */
      fetchData(): void
      /**
       * 更新状态
       * @param {Partial<ITemporaryGroupState>} payload
       */
      setState(payload: Partial<ITemporaryGroupState>): void
      /**
       * 解散临时组
       * @param {string} intercomGroupId
       * @returns {Promise<APIResponse>}
       */
      unbindTemporaryGroup(intercomGroupId: number): Promise<APIResponse>
      /**
       * 创建临时组
       * @returns {Promise<APIResponse>}
       */
      createTemporaryGroup(reqPayload: ICreateTemporaryGroupRequest): void
    }
  }
}
