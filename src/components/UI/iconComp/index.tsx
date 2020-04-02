/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: icon组件
 * @Date: 2020-03-26 13:35:50
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-03-30 周一 16:03:30
 */

import Container from '@/components/UI/containerComp';
import React from 'react';
import styled, { FlattenSimpleInterpolation } from 'styled-components';
import areaHover from './images/area-hover.png';
import area from './images/area.png';
import carHover from './images/car-hover.png';
import car from './images/car.png';
import entityHover from './images/entity-hover.png';
import entity from './images/entity.png';
import circleHover from './images/fence-circle-hover.png';
import circle from './images/fence-circle.png';
import lineHover from './images/fence-line-hover.png';
import line from './images/fence-line.png';
import pointHover from './images/fence-point-hover.png';
import point from './images/fence-point.png';
import polygonHover from './images/fence-polygon-hover.png';
import polygon from './images/fence-polygon.png';
import regionsHover from './images/fence-regions-hover.png';
import regions from './images/fence-regions.png';
import locationHover from './images/location-hover.png';
import location from './images/location.png';
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
  THING = thing,
  POLYGON = polygon,
  CIRCLE = circle,
  LINE = line,
  POINT = point,
  REGIONS = regions,
  LOCATION = location
}

/**
 * hover图标（base64）
 */
export enum IconSourceHover {
  ENTITY = entityHover,
  AREA = areaHover,
  CAR = carHover,
  PEOPLE = peopleHover,
  POSITION = positionHover,
  THING = thingHover,
  POLYGON = polygonHover,
  CIRCLE = circleHover,
  LINE = lineHover,
  POINT = pointHover,
  REGIONS = regionsHover,
  LOCATION = locationHover
}

export type IconName<T> = { readonly [K in keyof typeof IconSource]: T };

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
  THING: '物品',
  POLYGON: '多边形围栏',
  CIRCLE: '原型围栏',
  LINE: '路线围栏',
  POINT: '标注围栏',
  REGIONS: '行政区划围栏',
  LOCATION: '点'
};

/**
 * 图标接口
 */
export interface IIcon {
  icon?: IconSource;
  styled?: FlattenSimpleInterpolation;
  text?: string;
  iconHover?: IconSourceHover;
}

const StyledIcon = styled(Container)`
  .icon-img-box {
    .icon-img {
      background: url(${(props: IIcon) => props.icon}) no-repeat center / auto 100%;
    }
  }

  &:hover .icon-img {
    background-image: url(${(props: IIcon) => props.iconHover});
  }
`;

const Icon = (props: IIcon) => {
  return (
    <StyledIcon {...props} className="icon-container">
      <div className="icon-img-box">
        <span className="icon-img" />
      </div>
      {props.text ? <span className="icon-text">{props.text}</span> : null}
    </StyledIcon>
  );
};

export default Icon;
