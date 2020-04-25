/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 组件组装
 * @Date: 2020-01-04 14:30:18
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-14 周二 10:24:36
 */

import DisplayContent from '@/components/home/displayContent';
import EventModel from '@/components/home/eventModel';
import ResourceStatistics from '@/components/home/resourceStatistics';
import TaskModel from '@/components/home/taskModel';
import Container from '@/components/UI/containerComp';
import Nav from '@/components/UI/nav';
import { renderRoutes } from '@/config/router';
import { Intercom } from '@/containers/home/intercom';
import TemporaryGroup from '@/containers/home/temporaryGroup';
import { MonitoringDispatch, Search } from '@/containers/UI';
import ZWMap from '@/containers/UI/amap';
import React from 'react';
import './index.scss';

const Home = () => {
  return (
    <Container className="inter-plat-app">
      <Container className="inter-plat-header">
        <Container className="inter-plat-logo-container">
          <a href="/" className="inter-plat-logo" />
          <span className="inter-plat-name">中位物联网监视平台</span>
        </Container>
        <Container className="inter-plat-nav-container">
          {renderRoutes.map((route, index) => {
            return route && <Nav key={`route-${index}`} to={route.path} title={route.title} />;
          })}
        </Container>
      </Container>
      <Container className="inter-plat-container">
        <Container className="inter-plat-left">
          <EventModel />
        </Container>
        <Container className="inter-plat-center">
          <ZWMap />
          <Container className="inter-plat-other">
            <Search />
            <DisplayContent />
            <TemporaryGroup />
            <Intercom />
          </Container>
        </Container>
        <Container className="inter-plat-right">
          <ResourceStatistics />
          <TaskModel />
        </Container>
      </Container>
      <MonitoringDispatch />
    </Container>
  );
};

export default Home;
