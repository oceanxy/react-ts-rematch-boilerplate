/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲群组类型定义
 * @Date: 2020-04-21 周二 11:17:57
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-21 周二 11:17:57
 */

import { CurActiveGroupType } from '@/models/home/intercom/group/index';
import { ModelConfig } from '@rematch/core';

declare global {
  /**
   * 对讲群组state
   */
  interface IIntercomGroupState {
    /**
     * 群组名称
     */
    name: string/**
     * 【平台】群组ID或实体ID（监控对象ID）
     */
    id: string
    /**
     * 【第三方平台】对讲ID（群组/监控对象的ID）
     */
    intercomId: number,
    /**
     * 当前已激活的群组类别
     */
    curActiveGroupType: CurActiveGroupType
  }

  interface IIntercomGroupModel extends ModelConfig {
    state: IIntercomGroupState
    reducers: {
      /**
       * 更新本地状态
       * @param {IIntercomGroupState} state
       * @param {Partial<IIntercomGroupState>} payload
       * @returns {IIntercomGroupState}
       */
      updateState(state: IIntercomGroupState, payload: Partial<IIntercomGroupState>): IIntercomGroupState
    }
    effects: {
      /**
       * 设置状态
       * @param {Partial<IIntercomGroupState>} payload
       */
      setState(payload: Partial<IIntercomGroupState>): void
    }
  }
}