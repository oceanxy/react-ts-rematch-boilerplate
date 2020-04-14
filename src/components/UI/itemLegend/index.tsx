/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 图例组件
 * @Date: 2020-01-06 11:42:36
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-14 周二 15:19:50
 */

import Container from '@/components/UI/containerComp';
import { eventTypeColor } from '@/models/home/eventModel';
import React, { CSSProperties, MouseEvent, useEffect, useState } from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import './index.scss';

/**
 * 事件/任务严重程度颜色标识
 */
export enum ESeverity {
  VERY_Event = '#c50100',
  SEVERELY_Event = '#da5d00',
  RELATIVELY_Event = '#d0b800',
  GENERAL_Event = '#0074c7',
  GRAY = '#999999',
  GENERAL_TASK = '#0052FE',
  IMPORTANT_TASK = '#FA0512',
  URGENT_TASK = '#BB068E'
}

/**
 * 图例组件接口
 */
interface IItemLegend {
  className?: string,
  name: string, // 图例文字
  nameStyled?: FlattenSimpleInterpolation, // 图例文字CSS样式
  icon?: boolean, // 是否显示图标
  iconColor?: string | ESeverity, // 图标颜色
  shapeRadius?: number, // 图标半径
  style?: CSSProperties // 图例容器CSS样式
  styled?: FlattenSimpleInterpolation, // 图例容器CSS样式
  onClick?: (e: MouseEvent) => void
}

/**
 * 图例图标样式组件
 */
const StyledShape = styled.span`
  background-color: ${(props: IItemLegend) => props.iconColor ? props.iconColor : eventTypeColor[0]};
  box-shadow: ${(props: IItemLegend) => props.iconColor ? props.iconColor : eventTypeColor[0]} 0 0 4px 2px;
  width: ${(props: IItemLegend) => props.shapeRadius ? props.shapeRadius * 2 : 8}px;
  height: ${(props: IItemLegend) => props.shapeRadius ? props.shapeRadius * 2 : 8}px;
  border-radius:  ${(props: IItemLegend) => props.shapeRadius ? props.shapeRadius : 4}px;
`;

/**
 * 图例名称样式组件
 */
const StyledName = styled.span((props: IItemLegend) => css`
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
const ItemLegend = (props: IItemLegend) => {
  const {className, icon: iconProps, onClick} = props;
  const [icon, setIcon] = useState(true);

  useEffect(() => {
    setIcon(iconProps ?? true);
  }, [iconProps]);

  return (
    <Container
      className={`legend-container${className ? ` ${className}` : ''}`}
      style={props.style}
      styled={props.styled}
      title={props.name}
      onClick={onClick}
    >
      {
        icon ? <StyledShape {...props} className="legend-shape" /> : null
      }
      <StyledName className="legend-name" {...props}>{props.name}</StyledName>
    </Container>
  );
};

export default ItemLegend;
