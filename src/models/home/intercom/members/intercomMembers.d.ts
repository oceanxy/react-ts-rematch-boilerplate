/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲成员model
 * @Date: 2020-04-21 周二 11:32:16
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-21 周二 11:32:16
 */

import { APIResponse } from '@/interfaces/api/mock';
import { ModelConfig } from '@rematch/core';

declare global {
  /**
   * 对讲成员请求参数
   */
  interface IIntercomMembersRequest {
    /**
     * 对讲群组ID
     */
    intercomGroupId: string
    /**
     * 对讲对象状态 0：全部 1：在线 2：离线
     */
    interlocutorStatus: 0 | 1 | 2
  }

  /**
   * 对讲成员
   */
  interface IIntercomMember {
    /**
     * 对讲成员在线状态 1:在线 ，0：不在线
     */
    audioOnlineStatus: 0 | 1
    /**
     * 对讲成员名称
     */
    userName: string
    /**
     * 设备类型 0：普通对讲设备 1：调度员 2：Ⅱ类账号
     */
    type: 0 | 1 | 2
    /**
     * 用户ID
     */
    userId: number | null
    /**
     * 设备号
     */
    deviceId: string
    /**
     * 型号名称
     */
    modelName: string

    // sensorAbility: 0
    // sensorOnlineStatus: 0
    // defaultGroupId: 4294947295
    // isApp: 0
    // gpsFunction: 1
    // fenceEnable: 0
    // patrolEnable: 0
    // videoOnlineStatus: 0
    // beStunned: 0
    // videoFunction: 0
    // iconSkin: string
    // gisAbility: 0
    // audioAbility: 1
    // custId: 94
    // userNumber: 93446
    // locatestatus:
  }

  /**
   * 对讲成员state
   */
  interface IIntercomMembersState {
    /**
     * 对讲成员数据集
     */
    data: IIntercomMember[]
  }

  /**
   * 对讲成员model
   */
  interface IIntercomMembersModel extends ModelConfig {
    state: IIntercomMembersState
    reducers: {
      /**
       * 更新本地状态
       * @param {IIntercomMembersState} state
       * @param {Partial<IIntercomMembersState>} payload
       * @returns {IIntercomMembersState}
       */
      updateState(state: IIntercomMembersState, payload: Partial<IIntercomMembersState>): IIntercomMembersState
    }
    effects: {
      /**
       * 请求服务端对讲成员数据
       * @param {IIntercomMembersRequest} reqPayload
       */
      fetchData(reqPayload?: IIntercomMembersRequest): void
      /**
       * 删除成员
       * @returns {Promise<APIResponse>}
       */
      removeMember(): Promise<APIResponse>
      addMember(): Promise<APIResponse>
    }
  }
}
