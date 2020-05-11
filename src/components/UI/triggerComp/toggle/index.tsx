/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 开关组件
 * @Date: 2020-01-14 15:06:24
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-01-14 15:06:24
 */

import Container from '@/components/UI/containerComp';
import _ from 'lodash';
import React, { MouseEvent } from 'react';
import './index.scss';

interface IToggle {
  className?: string;
  /**
   * 开启状态
   */
  active: boolean

  onClick?(): void
}

/**
 * 开关组件
 */
const Toggle = (props: IToggle) => {
  const {active, onClick} = props;

  /**
   * 处理点击事件
   * @param {React.MouseEvent} e
   */
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();

    if (_.isFunction(onClick)) {
      onClick();
    }
  };

  return (
    <Container
      onClick={handleClick}
      className={`toggle-container${props.className ? ` ${props.className}` : ''}${active ? ' active' : ''}`}
    >
      <span />
    </Container>
  );
};

export default Toggle;
