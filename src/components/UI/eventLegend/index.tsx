/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 图例组件
 * @Date: 2020-01-06 11:42:36
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-03-20 15:52:18
 */

import Container from '@/components/UI/container';
import React, { CSSProperties, useEffect, useState } from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import './index.scss';

/**
 * 事件/任务严重程度颜色标识
 */
export enum ESeverity {
  VERY = '#c50100',
  SEVERELY = '#da5d00',
  RELATIVELY = '#d0b800',
  GENERAL = '#0074c7'
}

/**
 * 图例组件接口
 */
interface IEventLegend {
  name: string, // 图例文字
  nameStyled?: FlattenSimpleInterpolation, // 图例文字CSS样式
  icon?: boolean, // 是否颜色显示图标
  iconColor?: string | ESeverity, // 图标颜色
  shapeRadius?: number, // 图标半径
  style?: CSSProperties // 图例容器CSS样式
  styled?: FlattenSimpleInterpolation // 图例容器CSS样式
}

/**
 * 图例图标样式组件
 */
const StyledShape = styled.span`
  background-color: ${(props: IEventLegend) => props.iconColor ? props.iconColor : ESeverity.GENERAL};
  box-shadow: ${(props: IEventLegend) => props.iconColor ? props.iconColor : ESeverity.GENERAL} 0 0 4px 2px;
  width: ${(props: IEventLegend) => props.shapeRadius ? props.shapeRadius * 2 : 8}px;
  height: ${(props: IEventLegend) => props.shapeRadius ? props.shapeRadius * 2 : 8}px;
  border-radius:  ${(props: IEventLegend) => props.shapeRadius ? props.shapeRadius : 4}px;
`;

/**
 * 图例名称样式组件
 */
const StyledName = styled.span((props: IEventLegend) => css`
  font-size: ${(10.11 / 1920 * 100).toFixed(3)}vw;
  color: #cccccc;
  ${props.nameStyled};
  
  .legend-shape + & {
    margin-left: ${(8 / 1920 * 100).toFixed(3)}vw;
  }
`);

/**
 * 图例组件
 */
const EventLegend = (props: IEventLegend) => {
  const [icon, setIcon] = useState(true);

  useEffect(() => {
    setIcon(props.icon ?? true);
  }, [props.icon]);

  return (
    <Container
      className="legend-container"
      style={props.style}
      styled={props.styled}
      title={props.name}
    >
      {
        icon ? <StyledShape {...props} className="legend-shape" /> : null
      }
      <StyledName className="legend-name" {...props}>{props.name}</StyledName>
    </Container>
  );
};

export default EventLegend;
