/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲组名称组件
 * @Date: 2020-04-21 周二 15:07:10
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-27 周三 10:35:46
 */

import Container from '@/components/UI/containerComp';
import Icon, { iconName, IconSource } from '@/components/UI/iconComp';
import { CurActiveGroupType } from '@/models/home/intercom/groupName';
import { CallModeEnum, ControlCmd } from '@/models/UI/monitoringDispatch';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import Timing from '../timing';
import './index.scss';

/**
 * 对讲操作组件Render Props
 */
interface IIntercomOperationProps {
  state: IIntercomOperationState
  intercomGroupNameState: IIntercomGroupNameState
  intercomNoticeState: IIntercomNoticeState
  intercomNoticeDispatch: IIntercomNoticeModel['effects']
  dispatches: IIntercomOperationModel['effects']
  curMassPoint: IAMapState['curMassPoint']
  monitoringDispatchConfig: IMonitoringDispatchState['config']
  startTime: IIntercomOperationState['startTime']
  membersData: IIntercomMembersState['data']
}

/**
 * 对讲操作组件
 * @param {Partial<IIntercomOperationProps>} props
 * @returns {any}
 * @constructor
 */
const IntercomOperation = (props: Partial<IIntercomOperationProps>) => {
  const {
    intercomGroupNameState, intercomNoticeState, intercomNoticeDispatch, dispatches,
    curMassPoint, state, monitoringDispatchConfig, startTime, membersData
  } = props;
  const {timing, intercomCallProcessing, callProcessing, callState} = state!;
  const {active, value} = intercomNoticeState!;
  const {setState: setNoticeState, sendData} = intercomNoticeDispatch!;
  const {call, stopCall, entityControl} = dispatches!;
  const {curActiveGroupType, intercomId} = intercomGroupNameState!;
  /**
   * 当前监控对象禁言状态
   */
  const [ban, setBan] = useState(curMassPoint?.monitor.hasForbiddenWord);
  /**
   * 禁用全部按钮状态（当全员离线时）
   */
  const [disabledAllButton, setDisabledAllButton] = useState(false);

  /**
   * 对讲通知组件状态控制
   * @param {boolean} isShowNotice 是否显示对讲通知组件
   */
  const onNotice = (isShowNotice: boolean) => {
    setNoticeState!({active: isShowNotice, value: ''});
  };

  /**
   * 发送消息/通知
   */
  const sendSMS = () => {
    sendData();
  };

  /**
   * 处理个呼、组呼、电话（双工）的呼叫或挂断
   * @constructor
   */
  const handleCallModel = (callMode: CallModeEnum) => {
    if (callProcessing || intercomCallProcessing) {
      stopCall();
    } else {
      call(callMode);
    }
  };

  /**
   * 禁言/解除禁言
   */
  const onBan = () => {
    entityControl({
      controlCmd: ban ? ControlCmd.LIFT_BAN : ControlCmd.BAN,
      targetMsId: intercomId // 对讲ID（第三方平台）
    });
    setBan(!ban);
  };

  /**
   * 超时退出组呼/个呼/电话
   * @param {number} timing
   */
  const exitCallingWhenTimeout = (timing: number) => {
    if (!callState) {
      if ((intercomCallProcessing && timing <= 0) || (callProcessing && timing <= 0)) {
        stopCall();
      }
    }
  };

  /**
   * 根据当前激活的组别（临时组/任务组/个呼）渲染不同的按钮
   * @returns {any}
   */
  const buttons = () => {
    if (active) {
      // 通知面板按钮
      return (
        <>
          <Icon icon={IconSource.RETURN} onClick={onNotice.bind(null, false)} title={iconName.RETURN} />
          <Icon icon={IconSource.SEND} onClick={sendSMS} title={iconName.SEND} disabled={!value} />
        </>
      );
    } else {
      if (curActiveGroupType !== CurActiveGroupType.Null) {
        return (
          <>
            <Icon
              icon={!intercomCallProcessing ? IconSource.INTERCOMCALL : IconSource.INTERCOMCALLING}
              onClick={handleCallModel.bind(
                null,
                curActiveGroupType === CurActiveGroupType.Entity
                  ? CallModeEnum.INDIVIDUAL_CALL_MODE
                  : CallModeEnum.GROUP_CALL_MODE
              )}
              title={
                intercomCallProcessing ? '停止' : curActiveGroupType === CurActiveGroupType.Entity ? '个呼' : '组呼'
              }
              disabled={disabledAllButton || callProcessing}
            />
            {curActiveGroupType === CurActiveGroupType.Entity ? (
              <>
                <Icon
                  icon={callProcessing ? IconSource.HANGUP : IconSource.CALL}
                  onClick={handleCallModel.bind(null, CallModeEnum.DUPLEX_CALL_MODE)}
                  title={callProcessing ? '挂断' : '电话'}
                  disabled={disabledAllButton || intercomCallProcessing}
                />
                <Icon
                  icon={ban ? IconSource.BANNED : IconSource.BAN}
                  onClick={onBan}
                  title={ban ? '解除禁言' : '禁言'}
                  disabled={disabledAllButton || !monitoringDispatchConfig?.isOwnPreventSpeechRole}
                />
              </>
            ) : null}
            <Icon
              icon={IconSource.NOTICE}
              onClick={onNotice.bind(null, true)}
              title="通知"
              disabled={disabledAllButton}
            />
          </>
        );
      }
    }

    return null;
  };

  // 检测全员在离线的状态，来处理按钮禁用状态
  useEffect(() => {
    if (membersData?.length) {
      const isMemberOnline = _.findIndex(membersData, (entity: IEntity) => +entity.onlineStatus! === 1);

      if (isMemberOnline === -1 && curActiveGroupType !== CurActiveGroupType.Entity) {
        setDisabledAllButton(true);
      }
    }
  }, [membersData]);

  return (
    <Container className="inter-plat-intercom-operation">
      {timing ? (
        <Timing
          isCountdown={!callState} // 个呼/组呼/电话呼叫中为true，电话接通后为false
          countdownDuration={callProcessing ? 30000 : 35000} // 持续时长：个呼/组呼默认35秒；电话呼叫状态30秒；电话接通后，该字段无意义
          startTime={startTime}
          getTiming={exitCallingWhenTimeout}
          timingTextFormat={!callProcessing ? '' : callState ? '通话中 {timing}' : '连接中 {timing}'}
        />
      ) : null}
      <Container className="inter-plat-intercom-button-container">{buttons()}</Container>
    </Container>
  );
};

export default IntercomOperation;
