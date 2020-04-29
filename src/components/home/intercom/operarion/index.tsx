/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲组名称组件
 * @Date: 2020-04-21 周二 15:07:10
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-29 周三 11:29:09
 */

import Container from '@/components/UI/containerComp';
import Icon, { iconName, IconSource } from '@/components/UI/iconComp';
import { CurActiveGroupType } from '@/models/home/intercom/group';
import moment from 'moment';
import React, { useState } from 'react';
import Timing from '../timing';
import './index.scss';

/**
 * 对讲操作组件Render Props
 */
interface IIntercomOperationProps {
  curActiveGroupType: IIntercomGroupState['curActiveGroupType']
  intercomNoticeState: IIntercomNoticeState
  intercomNoticeDispatch: IIntercomNoticeModel['effects']
  dispatches: IIntercomOperationModel['effects']
}

/**
 * 对讲操作组件
 * @param {Partial<IIntercomOperationProps>} props
 * @returns {any}
 * @constructor
 */
const IntercomOperation = (props: Partial<IIntercomOperationProps>) => {
  const {curActiveGroupType, intercomNoticeState, intercomNoticeDispatch, dispatches} = props;
  const {active, value} = intercomNoticeState!;
  const {setState, sendData} = intercomNoticeDispatch!;
  const {intercomGroupCall, stopIntercomGroupCall} = dispatches!;
  /**
   * 计时状态
   */
  const [timing, setTiming] = useState(false);
  /**
   * 组呼状态
   */
  const [intercomCallProcessing, setIntercomCallProcessing] = useState(false);

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
   * 组呼
   * @constructor
   */
  const onIntercomGroupCall = () => {
    if (!intercomCallProcessing) {
      setIntercomCallState(true);
      intercomGroupCall();
    } else {
      setIntercomCallState(false);
      stopIntercomGroupCall();
    }
  };

  /**
   * 设置组呼状态
   * @param {boolean} state
   */
  const setIntercomCallState = (state: boolean) => {
    setTiming(state);
    setIntercomCallProcessing(state);
  };

  /**
   * 超时退出组呼
   * @param {number} timing
   */
  const exitCallingWhenTimeout = (timing: number) => {
    if (timing > 35) {
      setIntercomCallState(false);
    }
  };

  /**
   * 根据当前激活的组别（临时组/任务组/个呼）渲染不同的按钮
   * @returns {any}
   */
  const buttons = () => {
    if (active) {
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
      if (curActiveGroupType === CurActiveGroupType.Task || curActiveGroupType === CurActiveGroupType.Temporary) {
        return (<>
          <Icon
            icon={!intercomCallProcessing ? IconSource.INTERCOMCALL : IconSource.INTERCOMCALLING}
            onClick={onIntercomGroupCall}
            title={!intercomCallProcessing ? '组呼' : '停止组呼'}
          />
          <Icon icon={IconSource.NOTICE} onClick={onNotice.bind(null, true)} title="通知" />
        </>);
      } else if (curActiveGroupType === CurActiveGroupType.Entity) {
        return (<>
          <Icon icon={IconSource.INTERCOMCALL} title="个呼" />
          <Icon icon={IconSource.CALL} title="电话" />
          <Icon icon={IconSource.FORBIDDEN} title="禁言" />
          <Icon icon={IconSource.NOTICE} onClick={onNotice.bind(null, true)} title="通知" />
        </>);
      }
    }

    return null;
  };

  return (
    <Container className="inter-plat-intercom-operation">
      {timing ? <Timing startTime={moment()} getTiming={exitCallingWhenTimeout} /> : null}
      <Container className="inter-plat-intercom-button-container">{buttons()}</Container>
    </Container>
  );
};

export default IntercomOperation;
