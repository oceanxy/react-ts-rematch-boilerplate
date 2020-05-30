/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲面板计时model
 * @Date: 2020-05-30 周六 22:46:36
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-05-30 周六 22:46:36
 */

import { ModelConfig } from '@rematch/core';
import moment from 'moment';

declare global {
  /**
   * 对讲操作state
   */
  interface IIntercomTimingState {
    /**
     * 计时状态（是否开启计时）
     */
    timing: boolean
    /**
     * 计时开始时刻的时间
     */
    startTime: moment.Moment
    /**
     * 是否开启倒计时，默认关闭
     * 个呼/组呼/电话呼叫中为true，电话接通后为false
     */
    isCountdown?: boolean
    /**
     * 倒计时时长，isCountdown为true时生效。单位：毫秒
     * 个呼/组呼默认35秒；电话呼叫状态30秒；电话接通后，该字段无意义
     */
    countdownDuration?: number
    /**
     * 当前值，会随着计时不断变化
     */
    value: number
    /**
     * 当前值对应的显示文本
     * 如倒计时，value=5 -> text='00:00:05'
     */
    text: string
  }

  /**
   * 对讲计时model
   * 某些第三方对讲方法有对应的事件，请在 model/UI/monitoringDispatch/monitoringDispatch.d.ts 查看
   */
  interface IIntercomTimingModel extends ModelConfig {
    state: IIntercomTimingState
    reducers: {
      /**
       * 更新本地状态
       * @param {IIntercomOperationState} state
       * @param {Partial<IIntercomOperationState>} payload
       */
      updateState(state: IIntercomTimingState, payload: Partial<IIntercomTimingState>): void
    }
    effects: {
      /**
       * 设置状态
       * @param {Partial<IIntercomOperationState>} payload
       */
      setState(payload: Partial<IIntercomTimingState>): void
    }
  }
}
