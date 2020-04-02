/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 触发器组件
 * @Date: 2020-01-14 14:45:32
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-01-14 14:45:32
 */

import Container from '@/components/UI/containerComp';
import loadable from '@loadable/component';
import React from 'react';
import './index.scss';

export enum ETriggerType {
  TRIGGER,
  CLOSE
}

interface ITrigger {
  name?: string;
  type?: ETriggerType;
}

/**
 * 导航菜单组件
 */
const Trigger = (props: ITrigger) => {
  let TypeComponent = null;
  if (props.type === ETriggerType.TRIGGER) {
    TypeComponent = loadable(() => import('@/components/UI/triggerComp/toggle'));
  } else if (props.type === ETriggerType.CLOSE) {
    TypeComponent = loadable(() => import('@/components/UI/triggerComp/close'));
  }

  return (
    <Container className="inter-plat-trigger-container">
      <span className="inter-plat-trigger-name">{props.name}</span>
      <Container className="inter-plat-trigger-type">
        <TypeComponent />
      </Container>
    </Container>
  );
};

export default Trigger;
