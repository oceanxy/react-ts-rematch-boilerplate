/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 容器组件
 * @Date: 2020-01-09 09:42:30
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-16 周四 09:52:30
 */

import styledBlocks, { ContainerTheme } from '@/styled/styledBlocks';
import React, { CSSProperties, HTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import styled, { FlattenSimpleInterpolation } from 'styled-components';
import './index.scss';

/**
 * 容器组件Props
 */
export interface IContainerProps<T> extends HTMLAttributes<any> {
  onClick?: MouseEventHandler<T>;
  className?: string;
  /**
   * CSS样式
   */
  style?: CSSProperties;
  /**
   * 样式化组件CSS样式（CSSProperties）
   */
  styled?: FlattenSimpleInterpolation;
  /**
   * DOM title
   */
  title?: string;
  /**
   * 容器主题 可选'style1'、'style2'、'style3'
   */
  conTheme?: ContainerTheme;
  /**
   * 同React的children
   */
  readonly children?: ReactNode | ReactNode[];
}

/**
 * 被styled-component包装后的容器组件
 * @type {any}
 */
const StyledContainer = styled.div(styledBlocks.containerTheme);

/**
 * 容器组件
 */
const Container = (props: IContainerProps<any>) => {
  return (
    <StyledContainer {...props} className={`global-container${props.className ? ` ${props.className}` : ''}`}>
      {props.children}
    </StyledContainer>
  );
};

export default Container;
