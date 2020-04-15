/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: icon组件
 * @Date: 2020-03-26 13:35:50
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-15 周三 13:56:48
 */

import Container from '@/components/UI/containerComp';
import carHover from '@/components/UI/iconComp/images/entity/car-hover.png';
import car from '@/components/UI/iconComp/images/entity/car.png';
import peopleHover from '@/components/UI/iconComp/images/entity/people-hover.png';
import people from '@/components/UI/iconComp/images/entity/people.png';
import thingHover from '@/components/UI/iconComp/images/entity/thing-hover.png';
import thing from '@/components/UI/iconComp/images/entity/thing.png';
import circleHover from '@/components/UI/iconComp/images/fence/fence-circle-hover.png';
import circle from '@/components/UI/iconComp/images/fence/fence-circle.png';
import lineHover from '@/components/UI/iconComp/images/fence/fence-line-hover.png';
import line from '@/components/UI/iconComp/images/fence/fence-line.png';
import pointHover from '@/components/UI/iconComp/images/fence/fence-point-hover.png';
import point from '@/components/UI/iconComp/images/fence/fence-point.png';
import polygonHover from '@/components/UI/iconComp/images/fence/fence-polygon-hover.png';
import polygon from '@/components/UI/iconComp/images/fence/fence-polygon.png';
import regionsHover from '@/components/UI/iconComp/images/fence/fence-regions-hover.png';
import regions from '@/components/UI/iconComp/images/fence/fence-regions.png';
import areaHover from '@/components/UI/iconComp/images/search/area-hover.png';
import area from '@/components/UI/iconComp/images/search/area.png';
import entityHover from '@/components/UI/iconComp/images/search/entity-hover.png';
import entity from '@/components/UI/iconComp/images/search/entity.png';
import locationHover from '@/components/UI/iconComp/images/search/location-hover.png';
import location from '@/components/UI/iconComp/images/search/location.png';
import positionHover from '@/components/UI/iconComp/images/search/position-hover.png';
import position from '@/components/UI/iconComp/images/search/position.png';
import taskComplete from '@/components/UI/iconComp/images/taskDetails/task_details_complete.png';
import taskEdit from '@/components/UI/iconComp/images/taskDetails/task_details_edit.png';
import taskIntercom from '@/components/UI/iconComp/images/taskDetails/task_details_intercom.png';
import React, { MouseEvent } from 'react';
import styled, { FlattenSimpleInterpolation } from 'styled-components';
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
  LOCATION = location,
  TASKINTERCOM = taskIntercom,
  TASKCOMPLETE = taskComplete,
  TASKEDIT = taskEdit
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
  LOCATION = locationHover,
  TASKINTERCOM = taskIntercom,
  TASKCOMPLETE = taskComplete,
  TASKEDIT = taskEdit
}

export type IconName<T> = { readonly [K in keyof typeof IconSource]: T };

/**
 * 图标名称
 * @type {IconName<string>}
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
  LOCATION: '点',
  TASKCOMPLETE: '完成任务',
  TASKEDIT: '编辑任务',
  TASKINTERCOM: '对讲'
};

/**
 * 图标props
 */
export interface IIconProps {
  title?: string
  key?: string
  icon?: IconSource
  styled?: FlattenSimpleInterpolation
  text?: string
  iconHover?: IconSourceHover
  className?: string

  onClick?(event: MouseEvent): void
}

const StyledIcon = styled(Container)`
  .icon-img-box {
    .icon-img {
      background: url(${(props: IIconProps) => props.icon}) no-repeat center / auto 100%;
    }
  }

  &:hover .icon-img {
    background-image: url(${(props: IIconProps) => props.iconHover});
  }
`;

const Icon = (props: IIconProps) => {
  const {className} = props;

  return (
    <StyledIcon {...props} className={`icon-container${className ? ` ${className}` : ''}`}>
      <div className="icon-img-box">
        <span className="icon-img" />
      </div>
      {props.text ? <span className="icon-text">{props.text}</span> : null}
    </StyledIcon>
  );
};

export default Icon;
