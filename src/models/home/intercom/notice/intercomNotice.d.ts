/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲通知model
 * @Date: 2020-04-22 周三 17:08:06
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-23 周四 10:42:12
 */

import { ModelConfig } from '@rematch/core';

declare global {
  /**
   * 对讲通知state
   */
  interface IIntercomNoticeState {
    /**
     * 通知面板激活状态
     */
    active: boolean,
    /**
     * 通知内容
     */
    value: string
  }

  /**
   * 对讲通知model
   */
  interface IIntercomNoticeModel extends ModelConfig {
    state: IIntercomNoticeState
    reducers: {
      /**
       * 更新本地状态
       * @param {IIntercomNoticeState} state
       * @param {Partial<IIntercomNoticeState>} payload
       * @returns {IIntercomNoticeState}
       */
      updateState(state: IIntercomNoticeState, payload: Partial<IIntercomNoticeState>): IIntercomNoticeState
    }
    effects: {
      /**
       * 请求服务端对讲成员数据
       * @param {SMSRequest} reqPayload
       */
      sendData(reqPayload?: SMSRequest): void
      setState(payload: Partial<IIntercomNoticeState>): void
    }
  }
}
