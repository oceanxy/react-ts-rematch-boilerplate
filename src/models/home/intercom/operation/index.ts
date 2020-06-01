/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 操作对讲model
 * @Date: 2020-04-21 周二 11:14:41
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-30 周六 22:49:41
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
import moment from 'moment';

const operation: IIntercomOperationModel = {
  state: {
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
      const {intercomGroupName: {intercomId}} = state;

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
      const {intercomOperation, log, intercomTiming} = store.dispatch;

      // 成功发起电话呼叫，记录日志
      log.addLog({
        type: LogType.Call,
        id: store.getState().intercomGroupName.id
      } as IAddLogRequest);

      // 更新电话状态，触发页面更新
      intercomOperation.updateState({
        callProcessing: true,
        intercomCallProcessing: false,
        callState: false
      } as IIntercomOperationState);

      intercomTiming.updateState({
        timing: true,
        startTime: moment(),
        isCountdown: true,
        countdownDuration: 30000
      } as IIntercomTimingState);
    },
    onCallingStartResponse(response: CallingStartResponse) {
      const {log, intercomOperation, intercomTiming} = store.dispatch;

      // 主呼成功
      if (response.result === CallingStartResultEnum.CALLING_START_SUCCESS) {
        // 是否是组呼或者个呼
        const isIntercomCall = response.callMode === CallModeEnum.GROUP_CALL_MODE ||
          response.callMode === CallModeEnum.INDIVIDUAL_CALL_MODE;

        // 日志类型
        const logType = response.callMode === CallModeEnum.GROUP_CALL_MODE ?
          LogType.GroupCall :
          response.callMode === CallModeEnum.DUPLEX_CALL_MODE ?
            LogType.Call :
            response.callMode === CallModeEnum.INDIVIDUAL_CALL_MODE ?
              LogType.EntityCall :
              null;

        // 记录日志
        log.addLog({
          type: logType,
          id: store.getState().intercomGroupName.id
        } as IAddLogRequest);

        // 更新对讲操作model状态
        intercomOperation.updateState({
          callProcessing: false,
          intercomCallProcessing: isIntercomCall,
          callState: response.callMode === CallModeEnum.DUPLEX_CALL_MODE
        } as IIntercomOperationState);

        // 更新对讲计时model状态
        intercomTiming.updateState({
          timing: true,
          startTime: moment(),
          isCountdown: isIntercomCall,
          countdownDuration: isIntercomCall ? 35000 : 30000
        } as IIntercomTimingState);
      }  /** 主呼失败 */ else {
        switch (response.result) {
          case CallingStartResultEnum.CALLING_START_FAILURE_4_DUPLEX_TARGET_REJECT:
            message.info('呼叫被拒绝！');
            break;
          case CallingStartResultEnum.CALLING_START_FAILURE_4_TARGET_NOT_ONLINE:
            message.info('呼叫对象不在线');
            break;
          case CallingStartResultEnum.CALLING_START_FAILURE_4_STATUS_ERROR:
            message.info('网络故障或该对象正在进行其他呼叫');
            break;
          case CallingStartResultEnum.CALLING_START_FAILURE_4_CALL_MODE_ERROR:
            message.info('呼叫模式错误');
            break;
          case CallingStartResultEnum.CALLING_START_FAILURE_4_PRIORITY_LOW:
            message.info('呼叫优先级低');
            break;
          case CallingStartResultEnum.CALLING_START_FAILURE_4_NOT_PERMIT_CALLING:
            message.info('用户被禁言');
            break;
          case CallingStartResultEnum.CALLING_START_FAILURE_4_GROUP_NUMBER_ERROR:
            message.info('群组号码错误');
            break;
          case CallingStartResultEnum.CALLING_START_FAILURE_4_TARGET_ON_CALLING:
            message.info('呼叫对象正在忙');
            break;
          case CallingStartResultEnum.CALLING_START_FAILURE_4_TARGET_NOT_EXIST:
            message.info('呼叫对象不存在');
            break;
          case CallingStartResultEnum.CALLING_START_FAILURE_4_WAIT_DUPLEX_RING_TIMEOUT:
            message.info('双工主叫，寻呼链路建立失败');
            break;
          case CallingStartResultEnum.CALLING_START_FAILURE_4_WAIT_DUPLEX_RSP_TIMEOUT:
            message.info('双工呼叫，对方无应答');
            break;
          case CallingStartResultEnum.CALLING_START_FAILURE_4_TARGET_NO_ANSWER:
            message.info('双工呼叫，对方无法呼通');
            break;
          case CallingStartResultEnum.CALLING_START_FAILURE_4_GROUP_ID_ERROR:
            message.info('群组ID错误');
            break;
          case CallingStartResultEnum.CALLING_START_FAILURE_4_NO_ACTIVE_NETWORK:
            message.info('网络故障');
            break;
          case CallingStartResultEnum.CALLING_START_FAILURE_4_UNKNOWN:
          default:
            message.info('发生未知错误');
            break;
        }

        // 更新对讲操作model状态
        intercomOperation.updateState({
          callProcessing: false,
          intercomCallProcessing: false,
          callState: false
        } as IIntercomOperationState);

        // 更新对讲计时model状态
        intercomTiming.updateState({
          timing: false,
          startTime: undefined
        } as IIntercomTimingState);
      }
    },
    stopCall(): void {
      // 更新主呼状态
      store.dispatch.intercomOperation.updateState({
        callProcessing: false,
        intercomCallProcessing: false,
        callState: false
      } as IIntercomOperationState);

      // 更新计时组件状态
      store.dispatch.intercomTiming.updateState({timing: false});

      // 调用第三方接口停止主呼
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
