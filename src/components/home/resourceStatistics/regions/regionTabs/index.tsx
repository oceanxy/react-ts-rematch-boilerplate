/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 按区域统计资源tab切换组件
 * @Date: 2020-04-08 周三 10:35:53
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-08 周三 13:46:31
 */

import Container from '@/components/UI/containerComp';
import EventLegend from '@/components/UI/eventLegend';
import { ERegionSRType, IRegionTabsState } from '@/models/home/resourceStatistics/regionTabs';
import styledBlocks from '@/styled';
import React, { MouseEvent } from 'react';
import './index.scss';

const {tabTitle, tabTitleActive, flex1} = styledBlocks;

/**
 * 按区域搜索资源组件props
 */
interface IRegionTabsProps {
  type: IRegionTabsState['currentType']
  setType: (type: ERegionSRType) => void
}

/**
 * 按区域搜索资源组件
 * @param props
 * @returns {any}
 * @constructor
 */
const RegionTabs = (props: Partial<IRegionTabsProps>) => {
  const {type, setType} = props;

  const setCurrentType = (type: ERegionSRType, e: MouseEvent) => {
    setType!(type);
  };

  return (
    <Container className="resource-statistics-right-tab">
      <EventLegend
        className="no-margin-bottom"
        name="行政区划内资源"
        styled={flex1}
        nameStyled={type === ERegionSRType.AR ? tabTitleActive : tabTitle}
        icon={false}
        onClick={setCurrentType.bind(null, ERegionSRType.AR)}
      />
      <EventLegend
        className="no-margin-bottom"
        name="区域内资源"
        styled={flex1}
        nameStyled={type === ERegionSRType.FR ? tabTitleActive : tabTitle}
        icon={false}
        onClick={setCurrentType.bind(null, ERegionSRType.FR)}
      />
    </Container>
  );
};

export default RegionTabs;