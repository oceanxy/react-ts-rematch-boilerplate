/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲组名称组件
 * @Date: 2020-04-21 周二 15:07:10
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-09 周六 15:31:08
 */

import Container from '@/components/UI/containerComp';
import Icon, { iconName, IconSource } from '@/components/UI/iconComp';
import { CurActiveGroupType } from '@/models/home/intercom/group';
import { CallModeEnum, ControlCmd } from '@/models/UI/monitoringDispatch';
import moment from 'moment';
import React, { useState } from 'react';
import Timing from '../timing';
import './index.scss';

/**
 * 对讲操作组件Render Props
 */
interface IIntercomOperationProps {
  intercomGroupState: IIntercomGroupState
  intercomNoticeState: IIntercomNoticeState
  intercomNoticeDispatch: IIntercomNoticeModel['effects']
  dispatches: IIntercomOperationModel['effects']
  curMassPoint: IAMapState['curMassPoint']
}

/**
 * 对讲操作组件
 * @param {Partial<IIntercomOperationProps>} props
 * @returns {any}
 * @constructor
 */
const IntercomOperation = (props: Partial<IIntercomOperationProps>) => {
  const {intercomGroupState, intercomNoticeState, intercomNoticeDispatch, dispatches, curMassPoint} = props;
  const {active, value} = intercomNoticeState!;
  const {setState, sendData} = intercomNoticeDispatch!;
  const {intercomGroupCall, stopIntercomGroupCall, entityControl} = dispatches!;
  const {curActiveGroupType, intercomId} = intercomGroupState!;
  /**
   * 计时状态
   */
  const [timing, setTiming] = useState(false);
  /**
   * 个呼、组呼状态
   */
  const [intercomCallProcessing, setIntercomCallProcessing] = useState(false);
  /**
   * 电话状态
   */
  const [callProcessing, setCallProcessing] = useState(false);
  /**
   * 当前监控对象禁言状态
   */
  const [ban, setBan] = useState(curMassPoint?.monitor.hasForbiddenWord);

  /**
   * 对讲通知组件状态控制
   * @param {boolean} isShowNotice 是否显示对讲通知组件
   */
  const onNotice = (isShowNotice: boolean) => {
    setState!({active: isShowNotice});
  };

  /**
   * 发送消息/通知
   */
  const sendSMS = () => {
    sendData();
  };

  /**
   * 处理个呼、组呼、电话（双工）
   * @constructor
   */
  const handleCallModel = (callMode: CallModeEnum) => {
    if (callMode === CallModeEnum.DUPLEX_CALL_MODE) {
      onCall();
    } else {
      onIntercomGroupCall(callMode);
    }
  };

  /**
   * 组呼、个呼
   * @param {CallModeEnum} callMode
   */
  const onIntercomGroupCall = (callMode: CallModeEnum) => {
    if (!intercomCallProcessing) {
      setIntercomCallState(true);
      intercomGroupCall(callMode);
    } else {
      setIntercomCallState(false);
      stopIntercomGroupCall();
    }
  };

  /**
   * 拨打电话
   */
  const onCall = () => {
    if (!callProcessing) {
      setTiming(true);
      setCallProcessing(true);
      intercomGroupCall(CallModeEnum.DUPLEX_CALL_MODE);
    } else {
      setTiming(false);
      setCallProcessing(false);
      stopIntercomGroupCall();
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
   * 设置个呼、组呼、电话状态
   * @param {boolean} state
   */
  const setIntercomCallState = (state: boolean) => {
    setTiming(state);
    setIntercomCallProcessing(state);
  };

  /**
   * 超时退出组呼/个呼/电话
   * @param {number} timing
   */
  const exitCallingWhenTimeout = (timing: number) => {
    if (intercomCallProcessing && timing <= 0) {
      setIntercomCallState(false);
    }

    if (callProcessing && timing <= 0) {
      setTiming(false);
      setCallProcessing(false);
    }
  };

  /**
   * 根据当前激活的组别（临时组/任务组/个呼）渲染不同的按钮
   * @returns {any}
   */
  const buttons = () => {
    if (active) {
      // 通知面板按钮
      return (<>
        <Icon
          icon={IconSource.RETURN}
          onClick={onNotice.bind(null, false)}
          title={iconName.RETURN}
        />
        <Icon
          icon={IconSource.SEND}
          onClick={sendSMS}
          title={iconName.SEND}
          disabled={!value}
        />
      </>);
    } else {
      if (curActiveGroupType !== CurActiveGroupType.Null) {
        return (<>
          <Icon
            icon={!intercomCallProcessing ? IconSource.INTERCOMCALL : IconSource.INTERCOMCALLING}
            onClick={handleCallModel.bind(
              null,
              curActiveGroupType === CurActiveGroupType.Entity ?
                CallModeEnum.INDIVIDUAL_CALL_MODE :
                CallModeEnum.GROUP_CALL_MODE
            )}
            title={
              intercomCallProcessing ?
                '停止' :
                curActiveGroupType === CurActiveGroupType.Entity ? '个呼' : '组呼'
            }
            disabled={callProcessing}
          />
          {
            curActiveGroupType === CurActiveGroupType.Entity ? (<>
              <Icon
                icon={callProcessing ? IconSource.HANGUP : IconSource.CALL}
                onClick={handleCallModel.bind(null, CallModeEnum.DUPLEX_CALL_MODE)}
                title={callProcessing ? '挂断' : '电话'}
                disabled={intercomCallProcessing}
              />
              <Icon
                icon={ban ? IconSource.BANNED : IconSource.BAN}
                onClick={onBan}
                title={ban ? '解除禁言' : '禁言'}
              />
            </>) : null
          }
          <Icon icon={IconSource.NOTICE} onClick={onNotice.bind(null, true)} title="通知" />
        </>);
      }
    }

    return null;
  };

  return (
    <Container className="inter-plat-intercom-operation">
      {timing ? (
        <Timing
          isCountdown={true}
          countdownDuration={callProcessing ? 30000 : 35000} // 持续时长：个呼/组呼默认35秒，电话30秒
          startTime={moment()}
          getTiming={exitCallingWhenTimeout}
        />
      ) : null}
      <Container className="inter-plat-intercom-button-container">{buttons()}</Container>
    </Container>
  );
};

export default IntercomOperation;
