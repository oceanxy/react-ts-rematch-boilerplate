/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲组名称组件
 * @Date: 2020-04-21 周二 15:07:10
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-21 周二 16:08:04
 */

import Container from '@/components/UI/containerComp';
import Icon, { iconName, IconSource } from '@/components/UI/iconComp';
import { CurActiveGroupType } from '@/models/home/intercom/group';
import React from 'react';
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
  const {intercomGroupCall} = dispatches!;

  /**
   * 对讲通知组件状态控制
   * @param {boolean} isShowNotice 是否显示对讲通知组件
   */
  const onNotice = (isShowNotice: boolean) => {
    setState!({active: isShowNotice});
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
          onClick={sendData}
          title={iconName.SEND}
          disabled={!value}
        />
      </>);
    } else {
      if (curActiveGroupType === CurActiveGroupType.Task || curActiveGroupType === CurActiveGroupType.Temporary) {
        return (<>
          <Icon icon={IconSource.INTERCOMCALL} onClick={intercomGroupCall} title="组呼" />
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
    <Container className="inter-plat-intercom-button-container">
      {buttons()}
    </Container>
  );
};

export default IntercomOperation;
