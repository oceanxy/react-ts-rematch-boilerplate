/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲成员model
 * @Date: 2020-04-21 周二 11:32:16
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-30 周四 09:15:59
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
     * 对讲对象id集合
     */
    userIds: IEntity['userId'][]
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
    /**
     * 提交按钮loading状态（因第三方API的缘故，需要一个全局状态来控制）
     */
    loading: boolean
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
       * 设置本地状态
       * @param {Partial<IIntercomMembersState>} payload
       */
      setState(payload: Partial<IIntercomMembersState>): void
      /**
       * 删除成员
       * @returns {Promise<APIResponse>}
       */
      removeMember(member: IEntity): Promise<APIResponse>
      /**
       * 添加成员
       * @param {number[]} memberIds
       */
      addMember(memberIds: number[]): Promise<APIResponse>
    }
  }
}
