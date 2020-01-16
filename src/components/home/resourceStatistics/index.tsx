/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 资源统计
 * @Date: 2020-01-04 15:03:43
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-01-13 14:59:15
 */

import ResourcesAroundSuddenEventsChart from '@/components/home/resourceStatistics/resourcesAroundSuddenEventsChart';
import Container from '@/components/UI/container';
import EventLegend from '@/components/UI/eventLegend';
import styledComponents from '@/styled/styledComponents';
import Select from 'antd/es/select';
import React from 'react';
import './index.scss';

const ResourceStatistics = (props: any) => {
  return (
    <Container theme="style1" style={{ marginTop: 10 }} className="resource-statistics-container">
      <Container className="resource-statistics-left">
        <EventLegend
          name="突发事件周边资源"
          nameStyled={styledComponents.subtitle}
          styled={styledComponents.marginBottom10}
          icon={false}
        />
        <Container className="resource-statistics-left-range">
          <span className="highlight">事件动态2</span>
          <span>周边</span>
          <span className="highlight">1</span>
          <span>公里</span>
        </Container>
        <ResourcesAroundSuddenEventsChart />
      </Container>
      <Container className="resource-statistics-right">
        <Container className="resource-statistics-right-tab">
          <EventLegend
            name="行政区划类资源"
            styled={styledComponents.flex1}
            nameStyled={styledComponents.tabTitleActive}
            icon={false}
          />
          <EventLegend
            name="区域内资源"
            styled={styledComponents.flex1}
            nameStyled={styledComponents.tabTitle}
            icon={false}
          />
        </Container>
        <Select placeholder="防火区域" />
        <ResourcesAroundSuddenEventsChart />
      </Container>
    </Container>
  );
};

export default ResourceStatistics;
