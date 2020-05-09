/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲组件
 * @Date: 2020-01-14 14:24:28
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-09 周六 11:57:05
 */

import Container from '@/components/UI/containerComp';
import {
  IntercomEntityCall,
  IntercomGroup,
  IntercomMembers,
  IntercomNotice,
  IntercomOperation
} from '@/containers/home/intercom';
import { CurActiveGroupType } from '@/models/home/intercom/group';
import React from 'react';
import './index.scss';

/**
 * 对讲面板Props
 */
interface IIntercomProps {
  active: IIntercomState['active']
  setActive: IIntercomModel['effects']['setActive']
  isIntercomNoticeActive: IIntercomNoticeState['active']
  curActiveGroupType: IIntercomGroupState['curActiveGroupType']
}

/**
 * 临时组组件
 */
const Intercom = (props: Partial<IIntercomProps>) => {
  const {active, setActive, isIntercomNoticeActive, curActiveGroupType} = props;

  /**
   * 关闭事件
   */
  const onClose = () => {
    setActive!(false);
  };

  return active ? (
    <Container
      className="inter-plat-intercom-container"
      conTheme="style3"
      close={!isIntercomNoticeActive}
      onClose={onClose}
    >
      <IntercomGroup />
      <Container className="inter-plat-intercom-content">
        {isIntercomNoticeActive ?
          <IntercomNotice /> :
          curActiveGroupType === CurActiveGroupType.Entity ?
            <IntercomEntityCall /> :
            <IntercomMembers />
        }
        <IntercomOperation />
      </Container>
    </Container>
  ) : null;
};

export default Intercom;
