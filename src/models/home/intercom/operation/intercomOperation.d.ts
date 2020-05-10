/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 操作对讲类型定义
 * @Date: 2020-04-21 周二 11:46:04
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-10 周日 09:58:45
 */

import { CallModeEnum } from '@/models/UI/monitoringDispatch';
import { ModelConfig } from '@rematch/core';

declare global {
  /**
   * 对讲操作state
   */
  interface IIntercomOperationState {
    /**
     * 计时状态（当前是否在计时中）
     */
    timing: boolean
    /**
     * 个呼/组呼状态（与拨打电话状态不能同时为true）
     */
    intercomCallProcessing: boolean
    /**
     * 拨打电话状态（与个呼/组呼状态不能同时为true）
     */
    callProcessing: boolean
    /**
     * 电话接通状态（正在通话：true 拨打中、空闲中、个呼中、组呼中等状态均为false）
     */
    callState: boolean
  }

  /**
   * 对讲操作model
   * 某些第三方对讲方法有对应的事件，请在 model/UI/monitoringDispatch/monitoringDispatch.d.ts 查看
   */
  interface IIntercomOperationModel extends ModelConfig {
    state: IIntercomOperationState
    reducers: {
      /**
       * 更新本地状态
       * @param {IIntercomOperationState} state
       * @param {Partial<IIntercomOperationState>} payload
       */
      updateState(state: IIntercomOperationState, payload: Partial<IIntercomOperationState>): void
    }
    effects: {
      /**
       * 设置状态
       * @param {Partial<IIntercomOperationState>} payload
       */
      setState(payload: Partial<IIntercomOperationState>): void
      /**
       * 主呼 （注意不是组呼，主呼包含组呼、个呼、双工等模式）
       * @param {CallModeEnum} callMode
       */
      call(callMode: CallModeEnum): void
      /**
       * 停止主呼
       * 主动停止主呼时不会触发主呼停止事件
       */
      stopCall(): void
      onDuplexCallingRing(response: DuplexCallingRingResponse): void
      onCallingStartResponse(response: CallingStartResponse): void
      /**
       * 实体（监控对象）禁言、解除禁言
       */
      entityControl(request?: RemoteControlMsRequest): void
    }
  }
}
