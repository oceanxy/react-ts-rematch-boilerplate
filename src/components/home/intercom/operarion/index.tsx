/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲组名称组件
 * @Date: 2020-04-21 周二 15:07:10
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-21 周二 16:08:04
 */

import Container from '@/components/UI/containerComp';
import Icon, { IconSource } from '@/components/UI/iconComp';
import { CurActiveGroupType } from '@/models/home/intercom/group';
import React from 'react';
import './index.scss';

interface IIntercomOperationProps {
  curActiveGroupType: IIntercomGroupState['curActiveGroupType']
}

const IntercomOperation = (props: Partial<IIntercomOperationProps>) => {
  const {curActiveGroupType} = props;

  const onNotice = () => {

  };

  /**
   * 根据当前激活的组别（临时组/任务组/个呼）渲染不同的按钮
   * @returns {any}
   */
  const buttons = () => {
    if (curActiveGroupType === CurActiveGroupType.Task || curActiveGroupType === CurActiveGroupType.Temporary) {
      return (<>
        <Icon icon={IconSource.INTERCOMCALL} title="组呼" />
      </>);
    } else if (curActiveGroupType === CurActiveGroupType.Entity) {
      return (<>
        <Icon icon={IconSource.INTERCOMCALL} title="个呼" />
        <Icon icon={IconSource.CALL} title="电话" />
        <Icon icon={IconSource.FORBIDDEN} title="禁言" />
      </>);
    }

    return null;
  };

  return (
    <Container className="inter-plat-intercom-button-container">
      {buttons()}
      <Icon icon={IconSource.NOTICE} onClick={onNotice} title="通知" />
    </Container>
  );
};

export default IntercomOperation;
