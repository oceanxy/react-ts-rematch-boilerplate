/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 触发器组件
 * @Date: 2020-01-14 14:45:32
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-23 周四 16:13:05
 */

import Container from '@/components/UI/containerComp';
import loadable from '@loadable/component';
import _ from 'lodash';
import React from 'react';
import './index.scss';

export enum ETriggerType {
  TRIGGER,
  CLOSE
}

interface ITriggerProps {
  /**
   * 组件显示文本
   */
  name?: string
  /**
   * 组件类型
   */
  type?: ETriggerType
  /**
   * 是否处于选中状态
   */
  active?: boolean

  /**
   * 点击事件
   */
  onClick?(): void

  /**
   * trigger组件的点击事件
   */
  onTriggerClick?(): void
}

/**
 * 导航菜单组件
 */
const Trigger = (props: ITriggerProps) => {
  const {onClick, onTriggerClick, type, name, active} = props;

  let TriggerComponent = null;

  if (type === ETriggerType.TRIGGER) {
    TriggerComponent = loadable(() => import('@/components/UI/triggerComp/toggle'));
  } else if (type === ETriggerType.CLOSE) {
    TriggerComponent = loadable(() => import('@/components/UI/triggerComp/close'));
  }

  return (
    <Container
      className={`inter-plat-trigger-container${
        type === ETriggerType.CLOSE ? ' temporaryGroup' : ''
      }${
        active ? ' active' : ''
      }`}
      onClick={_.isFunction(onClick) ? onClick : undefined}
    >
      <span className="inter-plat-trigger-name">{name}</span>
      <Container className="inter-plat-trigger-type">
        <TriggerComponent title="解散临时组" onClick={_.isFunction(onTriggerClick) ? onTriggerClick : undefined} />
      </Container>
    </Container>
  );
};

export default Trigger;
