/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 开关组件
 * @Date: 2020-01-14 15:06:24
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-01-14 15:06:24
 */

import Container from '@/components/UI/containerComp';
import React from 'react';
import './index.scss';

interface IClose {
  className?: string;
}

/**
 * 导航菜单组件
 */
const TClose = (props: IClose) => {
  return (
    <Container className={`close-container${props.className ? ` ${props.className}` : ''}`}>
      <span />
    </Container>
  );
};

export default TClose;
