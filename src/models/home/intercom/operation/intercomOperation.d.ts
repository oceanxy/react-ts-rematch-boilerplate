/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 操作对讲类型定义
 * @Date: 2020-04-21 周二 11:46:04
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-21 周二 11:46:04
 */

import { ModelConfig } from '@rematch/core';

declare global {
  interface IIntercomOperationState {

  }

  interface IIntercomOperationModel extends ModelConfig {
    state: IIntercomOperationState,
    reducers: {
      // updateState(state: IIntercomOperationState, payload: Partial<IIntercomOperationState>): IIntercomOperationState
    }
    effects: {
      /**
       * 组呼
       */
      intercomGroupCall(): void
    }
  }
}
