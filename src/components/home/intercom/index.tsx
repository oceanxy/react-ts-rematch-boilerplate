/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲组件
 * @Date: 2020-01-14 14:24:28
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-21 周二 16:11:30
 */

import Container from '@/components/UI/containerComp';
import { IntercomGroup, IntercomNotice, IntercomOperation } from '@/containers/home/intercom';
import React from 'react';
import './index.scss';

/**
 * 对讲面板Props
 */
interface IIntercomProps {
  active: IIntercomState['active']
  setActive: IIntercomModel['effects']['setActive']
}

/**
 * 临时组组件
 */
const Intercom = (props: Partial<IIntercomProps>) => {
  const {active, setActive} = props;

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
      close={true}
      onClose={onClose}
    >
      <IntercomGroup />
      <Container className="inter-plat-intercom-content">
        <IntercomNotice />
        {/*<IntercomMembers />*/}
        <IntercomOperation />
      </Container>
    </Container>
  ) : null;
};

export default Intercom;
