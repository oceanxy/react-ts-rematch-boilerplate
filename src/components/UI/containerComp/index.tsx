/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 容器组件
 * @Date: 2020-01-09 09:42:30
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-01-10 11:38:57
 */

import ItemBorderImageHover from '@/images/event-item-border-hover.png';
import ItemBorderImage from '@/images/event-item-border.png';
import React, { CSSProperties, HTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import ContainerBorderImage from './images/container-border-bg.png';
import ContainerBorderImage2 from './images/container-border-bg2.png';
import './index.scss';

export interface IContainer<T> extends HTMLAttributes<any> {
  onClick?: MouseEventHandler<T>;
  className?: string;
  style?: CSSProperties; // CSS样式
  styled?: FlattenSimpleInterpolation; // 样式化组件CSS样式（CSSProperties）
  title?: string; // DOM title
  readonly children?: ReactNode | ReactNode[];
  readonly theme?: 'style1' | 'style2' | 'style3' | never;
}

const StyledContainer = styled.div((props: IContainer<any>) => {
  if (props.theme === 'style1') {
    return css`
      border-width: 15px 22px 30px 30px;
      border-style: solid;
      border-color: transparent;
      border-image-source: url(${ContainerBorderImage});
      border-image-slice: 15 22 30 30 fill;
      border-image-repeat: round;
      ${props.styled}
    `;
  } else if (props.theme === 'style2') {
    return css`
      border: 13px solid transparent;
      border-image-source: url(${ItemBorderImage});
      border-image-slice: 13 fill;
      border-image-repeat: round;
      ${props.styled}

      &:hover, &.active {
        border-image-source: url(${ItemBorderImageHover});
        border-image-outset: 3px;
      }
      
      &.active:hover {
        transform: scale(1.01);
      }
    `;
  } else if (props.theme === 'style3') {
    return css`
      border: 20px solid transparent;
      border-image-source: url(${ContainerBorderImage2});
      border-image-slice: 20 fill;
      border-image-repeat: round;
      ${props.styled}
    `;
  }

  return `
    ${props.styled}
  `;
});

/**
 * 容器组件
 */
const Container = (props: IContainer<any>) => {
  return (
    <StyledContainer {...props} className={`global-container${props.className ? ` ${props.className}` : ''}`}>
      {props.children}
    </StyledContainer>
  );
};

export default Container;
