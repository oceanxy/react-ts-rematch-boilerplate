/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 关闭组件
 * @Date: 2020-01-14 15:06:24
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-23 周四 15:58:56
 */

import Container from '@/components/UI/containerComp';
import _ from 'lodash';
import React, { MouseEvent } from 'react';
import './index.scss';

interface ICloseProps {
  title?: string
  className?: string

  onClick?(): void
}

/**
 * 关闭组件
 */
const TClose = (props: ICloseProps) => {
  const {className, title, onClick} = props;

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();

    if (_.isFunction(onClick)) {
      onClick();
    }
  };

  return (
    <Container onClick={handleClick} className={`close-container${className ? ` ${className}` : ''}`}>
      <span title={title} />
    </Container>
  );
};

export default TClose;
