/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 资源统计
 * @Date: 2020-01-04 15:03:43
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-03 周五 11:22:13
 */

import ByRange from '@/components/home/resourceStatistics/byRange';
import Container from '@/components/UI/containerComp';
import EventLegend from '@/components/UI/eventLegend';
import Title from '@/components/UI/title';
import { RangeControl, SuddenEvents } from '@/containers/home/resourceStatistics';
import styledBlocks from '@/styled';
import Select from 'antd/es/select';
import React from 'react';
import './index.scss';

const ResourceStatistics = () => {
  return (
    <Title name="资源统计" styled={styledBlocks.flexNone}>
      <Container theme="style1" style={{marginTop: 10}} className="resource-statistics-container">
        <Container className="resource-statistics-left">
          <EventLegend
            name="突发事件周边资源"
            nameStyled={styledBlocks.subtitle}
            styled={styledBlocks.marginBottom10}
            icon={false}
          />
          <RangeControl />
          <SuddenEvents />
        </Container>
        <Container className="resource-statistics-right">
          <Container className="resource-statistics-right-tab">
            <EventLegend
              name="行政区划类资源"
              styled={styledBlocks.flex1}
              nameStyled={styledBlocks.tabTitleActive}
              icon={false}
            />
            <EventLegend
              name="区域内资源"
              styled={styledBlocks.flex1}
              nameStyled={styledBlocks.tabTitle}
              icon={false}
            />
          </Container>
          <Select placeholder="防火区域" />
          <ByRange />
        </Container>
      </Container>
    </Title>
  );
};

export default ResourceStatistics;
