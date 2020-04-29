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
   * 临时组拉人request
   */
  interface IIntercomAddMembersRequest {
    /**
     * 对讲组id
     */
    intercomGroupId: IIntercomGroupState['id']
    /**
     * 对讲对象id 逗号分隔
     */
    interlocutorIds: IEntity['monitorId']
  }

  /**
   * 临时组踢人request
   */
  interface IIntercomRemoveMembersRequest {
    /**
     * 对讲组id
     */
    intercomGroupId: IIntercomGroupState['id']
    /**
     * 对讲对象id
     */
    interlocutorId: IEntity['monitorId']
  }

  /**
   * 对讲成员state
   */
  interface IIntercomMembersState {
    /**
     * 对讲成员数据集
     */
    data: IEntity[]
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
      removeMember(member: IEntity): Promise<APIResponse>
      addMember(member: IEntity): Promise<APIResponse>
    }
  }
}
