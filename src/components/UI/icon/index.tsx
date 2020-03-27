/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: icon组件
 * @Date: 2020-03-26 13:35:50
 * @LastModified: Oceanxy
 * @LastModifiedTime: 2020-03-26 13:35:50
 */

import Container from '@/components/UI/container';
import React from 'react';
import styled, { FlattenSimpleInterpolation } from 'styled-components';
import areaHover from './images/area-hover.png';
import area from './images/area.png';
import carHover from './images/car-hover.png';
import car from './images/car.png';
import entityHover from './images/entity-hover.png';
import entity from './images/entity.png';
import peopleHover from './images/people-hover.png';
import people from './images/people.png';
import positionHover from './images/position-hover.png';
import position from './images/position.png';
import thingHover from './images/thing-hover.png';
import thing from './images/thing.png';
import './index.scss';

/**
 * 图标（base64）
 */
export enum IconSource {
  ENTITY = entity,
  AREA = area,
  CAR = car,
  PEOPLE = people,
  POSITION = position,
  THING = thing
}

/**
 * hover图标（base64）
 */
export enum IconSourceHover {
  ENTITY_HOVER = entityHover,
  AREA_HOVER = areaHover,
  CAR_HOVER = carHover,
  PEOPLE_HOVER = peopleHover,
  POSITION_HOVER = positionHover,
  THING_HOVER = thingHover
}

export type IconName<T> = { readonly [K in keyof typeof IconSource]: T }

/**
 * 图标名称
 * @type {{POSITION: string; ENTITY_HOVER: string; ENTITY: string; AREA: string; POSITION_HOVER: string; AREA_HOVER: string; CAR: string; PEOPLE: string; CAR_HOVER: string; PEOPLE_HOVER: string; THING: string; THING_HOVER: string}}
 */
export const iconName: IconName<string> = {
  ENTITY: '对象',
  AREA: '区域',
  CAR: '车辆',
  PEOPLE: '人员',
  POSITION: '位置',
  THING: '物品'
};

/**
 * 图标接口
 */
export interface IIcon {
  icon?: IconSource,
  styled?: FlattenSimpleInterpolation,
  text?: string,
  iconHover?: IconSourceHover
}

const StyledIcon = styled(Container)`
  .icon-img-box {
    .icon-img {
      background: url(${(props: IIcon) => props.icon}) no-repeat center / 100% 100%;
    }  
  }
  
  &:hover .icon-img {
    background-image: url(${(props: IIcon) => props.iconHover});
  }
`;

const Icon = (props: IIcon) => {
  return (
    <StyledIcon
      {...props}
      className="icon-container"
    >
      <div className="icon-img-box">
        <span className="icon-img" />
      </div>
      {
        props.text ? <span className="icon-text">{props.text}</span> : null
      }
    </StyledIcon>
  );
};

export default Icon;