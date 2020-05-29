/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 即时更新控制组件
 * @Date: 2020-05-29 周五 13:55:00
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-05-29 周五 13:55:00
 */

import { RootState } from '@/store';
import { ModelConfig } from '@rematch/core';
import { Client } from 'stompjs';

declare global {
  interface IEvenUpdateControlState {
    stompClient?: Client
  }

  interface IEvenUpdateControlRequest {
    desc: {
      /**
       * 一个随机的消息ID
       */
      MsgId: number
      /**
       * 接收消息的用户名
       */
      UserName: string
      TaskId?: string
      SysTime?: Date | string
      ProtocolType?: string
      ProtocolVersion?: string
    }
  }

  interface IEvenUpdateControlModel extends ModelConfig {
    state: IEvenUpdateControlState,
    reducers: {
      updateState(state: IEvenUpdateControlState, payload: Partial<IEvenUpdateControlState>): IEvenUpdateControlState
    },
    effects: {
      open(request?: IEvenUpdateControlRequest, state?: RootState): void
      setState(reqPayload: Partial<IEvenUpdateControlState>): void
    }
  }
}
