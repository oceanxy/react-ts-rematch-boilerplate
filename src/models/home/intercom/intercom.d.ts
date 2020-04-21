/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲类型定义
 * @Date: 2020-04-21 周二 16:32:06
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-21 周二 16:32:06
 */

import { ModelConfig } from '@rematch/core';

declare global {
  /**
   * 对讲状态
   */
  interface IIntercomState {
    active: boolean
  }

  interface IIntercomModel extends ModelConfig {
    state: IIntercomState,
    reducers: {
      /**
       * 更新本地状态
       * @param {IIntercomState} state
       * @param {Partial<IIntercomState>} payload
       * @returns {IIntercomState}
       */
      updateState(state: IIntercomState, payload: Partial<IIntercomState>): IIntercomState
    }
    effects: {
      /**
       * 设置状态
       * @param {Partial<IIntercomState>} payload
       */
      setState(payload: Partial<IIntercomState>): void
    }
  }
}
