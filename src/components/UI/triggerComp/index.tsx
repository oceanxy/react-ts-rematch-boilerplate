/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 触发器组件
 * @Date: 2020-01-14 14:45:32
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-11 周一 11:08:23
 */

import Container from '@/components/UI/containerComp';
import { px2vw } from '@/utils/helper';
import loadable from '@loadable/component';
import _ from 'lodash';
import React, { MouseEvent } from 'react';
import styled from 'styled-components';
import './index.scss';

/**
 * trigger类型
 */
export enum ETriggerType {
  TRIGGER,
  CLOSE
}

interface ITriggerProps {
  /**
   * 宽度
   * 数字或者字符串形式的百分数，其他按默认值144px处理
   */
  width?: number | string
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
   * trigger的title
   */
  triggerTitle?: string
  /**
   * 样式表名称
   * 如果className字段包含'hover'，则使用默认的css hover效果
   */
  className?: string

  /**
   * 点击事件
   */
  onClick?(event: MouseEvent): void

  /**
   * trigger组件的点击事件
   */
  onTriggerClick?(): void
}

/**
 * styled-component组件
 */
const StyledTrigger = styled(Container)`
  width: ${({width}: ITriggerProps) => _.isNumber(width) ? px2vw(width) : _.includes(String(width), '%') ? width : '144px'}
`;

/**
 * 触发器组件
 */
const Trigger = (props: ITriggerProps) => {
  const {onClick, onTriggerClick, type, name, active, triggerTitle, width, className} = props;

  let TriggerComponent = null;

  if (type === ETriggerType.TRIGGER) {
    TriggerComponent = loadable(() => import('@/components/UI/triggerComp/toggle'));
  } else if (type === ETriggerType.CLOSE) {
    TriggerComponent = loadable(() => import('@/components/UI/triggerComp/close'));
  }

  return (
    <StyledTrigger
      width={width}
      className={`inter-plat-trigger-container${
        type === ETriggerType.CLOSE ? ' hover' : ''
      }${
        active ? ' active' : ''
      }${
        className ? ` ${className}` : ''
      }`}
      onClick={_.isFunction(onClick) ? onClick : undefined}
    >
      <span className="inter-plat-trigger-name">{name}</span>
      {
        TriggerComponent ? (
          <Container className="inter-plat-trigger-type">
            <TriggerComponent
              title={triggerTitle}
              onClick={_.isFunction(onTriggerClick) ? onTriggerClick : undefined}
              active={active}
            />
          </Container>
        ) : null
      }
    </StyledTrigger>
  );
};

export default Trigger;
