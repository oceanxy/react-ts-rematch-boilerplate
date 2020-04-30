/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 操作对讲类型定义
 * @Date: 2020-04-21 周二 11:46:04
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-29 周三 11:30:40
 */

import { CallModeEnum } from '@/models/UI/monitoringDispatch';
import { ModelConfig } from '@rematch/core';

declare global {
  /**
   * 对讲操作model
   * 某些第三方对讲方法有对应的事件，请在 model/UI/monitoringDispatch/monitoringDispatch.d.ts 查看
   */
  interface IIntercomOperationModel extends ModelConfig {
    effects: {
      /**
       * 主呼 （注意不是组呼，主呼包含组呼、个呼、双工等模式）
       * @param {CallModeEnum} callMode
       */
      intercomGroupCall(callMode: CallModeEnum): void
      /**
       * 停止主呼
       * 主动停止主呼时不会触发主呼停止事件
       */
      stopIntercomGroupCall(): void
      /**
       * 实体（监控对象）禁言、解除禁言
       */
      entityControl(request?: RemoteControlMsRequest): void
    }
  }
}
