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
  membersData: IIntercomMembersState['data']
  timingState: IIntercomTimingState
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
    curMassPoint, state, monitoringDispatchConfig, membersData, timingState
  } = props;
  const {intercomCallProcessing, callProcessing, callState} = state!;
  const {active, value} = intercomNoticeState!;
  const {setState: setNoticeState, sendData} = intercomNoticeDispatch!;
  const {call, stopCall, entityControl} = dispatches!;
  const {curActiveGroupType, intercomId} = intercomGroupNameState!;
  const {value: timingValue} = timingState!;
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
    if (callProcessing || intercomCallProcessing || callState) {
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

  // 超时退出组呼/个呼/电话状态
  useEffect(() => {
    // 当且仅当电话已接通时不执行以下逻辑
    if (!callState) {
      if (
        // 当组呼/个呼时，且剩余时间小于0时
        (intercomCallProcessing && timingValue <= 0) ||
        // 当电话处于正在接通中状态，且剩余时间小于0时
        (callProcessing && timingValue <= 0)
      ) {
        // 退出组呼/退出个呼/挂断电话（此时未接通）
        stopCall();
      }
    }
  }, [timingValue]);

  // 检测全员在离线的状态，来处理按钮禁用状态
  useEffect(() => {
    if (membersData?.length) {
      const isMemberOnline = _.findIndex(membersData, (entity: IEntity) => +entity.onlineStatus! === 1);

      if (isMemberOnline === -1 && curActiveGroupType !== CurActiveGroupType.Entity) {
        setDisabledAllButton(true);
      } else {
        setDisabledAllButton(false);
      }
    } else {
      curActiveGroupType !== CurActiveGroupType.Entity && setDisabledAllButton(true);
    }
  }, [membersData]);

  return (
    <Container className="inter-plat-intercom-operation">
      <Container className="inter-plat-intercom-button-container">{buttons()}</Container>
    </Container>
  );
};

export default IntercomOperation;
