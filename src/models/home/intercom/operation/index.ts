/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 操作对讲model
 * @Date: 2020-04-21 周二 11:14:41
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-10 周日 09:58:40
 */

import { LogType } from '@/models/UI/log';
import {
  CallingStartResultEnum,
  CallModeEnum,
  ControlCmd,
  GroupIDTypeEnum,
  UserIDTypeEnum
} from '@/models/UI/monitoringDispatch';
import { store } from '@/store';
import { message } from 'antd';

const operation: IIntercomOperationModel = {
  state: {
    timing: false,
    callProcessing: false,
    intercomCallProcessing: false,
    callState: false
  },
  reducers: {
    updateState(state: IIntercomOperationState, payload: Partial<IIntercomOperationState>) {
      return {
        ...state,
        ...payload
      };
    }
  },
  effects: {
    setState(payload: Partial<IIntercomOperationState>) {
      store.dispatch.intercomOperation.updateState(payload);
    },
    async call(callMode: CallModeEnum) {
      const state = store.getState();
      const {
        intercomGroupName: {intercomId}
      } = state;

      const request = {
        callMode: callMode,
        targetIdType: callMode === CallModeEnum.GROUP_CALL_MODE ?
          GroupIDTypeEnum.GROUP_ID_TYPE_ID :
          UserIDTypeEnum.USER_ID_TYPE_ID,
        targetId: intercomId
      };

      store.dispatch.monitoringDispatch.startCalling(request);
    },
    onDuplexCallingRing(response: DuplexCallingRingResponse): void {
      const {intercomOperation, log} = store.dispatch;

      // 成功发起电话呼叫，记录日志
      log.addLog({
        type: CallModeEnum.DUPLEX_CALL_MODE,
        id: store.getState().intercomGroupName.id
      });

      // 更新电话状态，触发页面更新
      intercomOperation.updateState({
        timing: true,
        callProcessing: true,
        intercomCallProcessing: false
      });
    },
    onCallingStartResponse(response: CallingStartResponse) {
      const {log, intercomOperation} = store.dispatch;

      // 根据呼叫结果，处理状态
      if (response.result !== CallingStartResultEnum.CALLING_START_SUCCESS) {
        message.error('呼叫失败，请稍候重试！');
      } else {
        let type = null;
        const state = {timing: true} as IIntercomOperationState;

        switch (response.callMode) {
          case CallModeEnum.GROUP_CALL_MODE:
            type = LogType.GroupCall;
            state.intercomCallProcessing = true;
            state.callProcessing = false;
            state.callState = false;
            break;
          case CallModeEnum.DUPLEX_CALL_MODE:
            type = LogType.Call;
            state.callState = true;
            state.callProcessing = true;
            state.intercomCallProcessing = false;
            break;
          case CallModeEnum.INDIVIDUAL_CALL_MODE:
          default:
            type = LogType.EntityCall;
            state.intercomCallProcessing = true;
            state.callProcessing = false;
            state.callState = false;
            break;
        }

        // 记录日志
        log.addLog({type, id: store.getState().intercomGroupName.id});
        // 更新状态
        intercomOperation.updateState(state);
      }
    },
    stopCall(): void {
      // 更新电话状态，触发页面更新
      store.dispatch.intercomOperation.updateState({
        timing: false,
        callProcessing: false,
        intercomCallProcessing: false,
        callState: false
      });

      store.dispatch.monitoringDispatch.stopCalling();
    },
    entityControl(request: RemoteControlMsRequest): void {
      if (!request) {
        request = {
          controlCmd: ControlCmd.BAN,
          targetMsId: store.getState().intercomGroupName.intercomId
        };
      }

      store.dispatch.monitoringDispatch.remoteControlMs(request);
    }
  }
};

export default operation;
