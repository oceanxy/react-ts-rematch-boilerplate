/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 临时组类型定义
 * @Date: 2020-04-23 周四 13:53:48
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-23 周四 13:53:48
 */

import { APIResponse } from '@/interfaces/api/mock';
import { ModelConfig } from '@rematch/core';

declare global {
  /**
   * 临时组接口
   */
  interface ITemporaryGroup {
    /**
     * 临时组ID（第三方的对讲组ID）
     */
    intercomGroupId: string
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
   * 临时组状态
   */
  interface ITemporaryGroupState {
    /**
     * 临时组数据列表
     */
    data: ITemporaryGroup[]
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
      unbindTemporaryGroup(intercomGroupId: string): Promise<APIResponse>
      /**
       * 创建临时组
       * @returns {Promise<APIResponse>}
       */
      createTemporaryGroup(): Promise<APIResponse>
    }
  }
}
