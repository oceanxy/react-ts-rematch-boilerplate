/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 组件组装
 * @Date: 2020-01-04 14:30:18
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-28 周四 11:04:25
 */

import EventModel from '@/components/home/eventModel';
import ResourceStatistics from '@/components/home/resourceStatistics';
import TaskModel from '@/components/home/taskModel';
import Container from '@/components/UI/containerComp';
import EvenUpdateControl from '@/containers/UI/evenUpdateControl';
import Nav from '@/components/UI/nav';
import { renderRoutes } from '@/config/router';
import DisplayContent from '@/containers/home/displayContent';
import { Intercom } from '@/containers/home/intercom';
import TemporaryGroup from '@/containers/home/temporaryGroup';
import { MonitoringDispatch, Search } from '@/containers/UI';
import ZWMap from '@/containers/UI/amap';
import { MouseToolType } from '@/models/UI/amap';
import { Spin } from 'antd';
import React, { useEffect } from 'react';
import './index.scss';

interface IHomeProps {
  loading: IPanelControlState['loading']
  showPanel: IPanelControlState['showPanel']
  setState: IPanelControlModel['effects']['setState']
  mouseToolType: IAMapState['mouseToolType']
  map: IAMapState['mapInstance']
}

const Home = (props: Partial<IHomeProps>) => {
  const {showPanel, setState, mouseToolType, map, loading} = props;

  useEffect(() => {
    if (mouseToolType === MouseToolType.Null) {
      setState!({showPanel: true});
    } else {
      setState!({showPanel: false});
      map && map.clearInfoWindow();
    }
  }, [mouseToolType]);

  return (
    <Container className="inter-plat-app">
      <Container className="inter-plat-header">
        <Container className="inter-plat-logo-container">
          <a href="/" className="inter-plat-logo" />
          <span className="inter-plat-name">江苏慧众科技指挥平台</span>
          {/*<span className="inter-plat-name">中位物联网监视平台</span>*/}
        </Container>
        <Container className="inter-plat-nav-container">
          {renderRoutes.map((route, index) => {
            return route && <Nav key={`route-${index}`} to={route.path} title={route.title} exact={route.exact} />;
          })}
          <a aria-current="page" className="inter-plat-nav-item" href="/clbs">数据管理</a>
        </Container>
        <audio id="received_video" autoPlay />
      </Container>
      <Spin spinning={loading} wrapperClassName="inter-plat-container" delay={100}>
        <Container className={`inter-plat-left${showPanel ? ' show-panel' : ' not-show-panel'}`}>
          <EventModel />
        </Container>
        <Container className="inter-plat-center">
          <ZWMap />
          <Container className={`inter-plat-other${showPanel ? ' show' : ' hidden'}`}>
            <Search />
            <DisplayContent />
            <TemporaryGroup />
            <Intercom />
          </Container>
        </Container>
        <Container className={`inter-plat-right${showPanel ? ' show-panel' : ' not-show-panel'}`}>
          <ResourceStatistics />
          <TaskModel />
        </Container>
      </Spin>
      <MonitoringDispatch />
      <EvenUpdateControl />
    </Container>
  );
};

export default Home;
