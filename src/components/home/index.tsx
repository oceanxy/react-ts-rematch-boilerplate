/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 组件组装
 * @Date: 2020-01-04 14:30:18
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-03-20 17:24:59
 */

import AlarmEventItem from '@/components/home/alarmEventItem';
import DisplayContent from '@/components/home/displayContent';
import Intercom from '@/components/home/intercom';
import ResourceStatistics from '@/components/home/resourceStatistics';
import TemporaryGroup from '@/components/home/temporaryGroup';
import ZWMap from '@/components/UI/amap';
import Button from '@/components/UI/button';
import Container from '@/components/UI/container';
import EventLegend, { ESeverity } from '@/components/UI/eventLegend';
import KeyValue from '@/components/UI/keyValue';
import Nav from '@/components/UI/nav';
import Search from '@/components/UI/search';
import Title from '@/components/UI/title';
import config from '@/config';
import { renderRoutes } from '@/config/router';
import EventDetails from '@/containers/home/eventDetails';
import styledComponent from '@/styled';
import React from 'react';
import './index.scss';

const Home = (props: any) => {
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
          <Title
            name="事件列表"
            titleExtraElementStyle={{marginLeft: 10}}
            titleExtraElement={
              <React.Fragment>
                <EventLegend name="特别严重" iconColor={ESeverity.VERY} />
                <EventLegend name="严重" iconColor={ESeverity.SEVERELY} />
                <EventLegend name="较重" iconColor={ESeverity.RELATIVELY} />
                <EventLegend name="一般" iconColor={ESeverity.GENERAL} />
              </React.Fragment>
            }
          >
            <EventDetails />
            <Container className="event-button-container">
              <Button name="全部" active={true} />
              <Button name="未处理" />
              <Button name="处理中" />
            </Container>
            <Container className="event-list-container">
              <AlarmEventItem name="报警/事件名称" />
              <AlarmEventItem name="报警/事件名称" />
              <AlarmEventItem name="报警/事件名称" />
              <AlarmEventItem name="报警/事件名称" />
              <AlarmEventItem name="报警/事件名称" />
              <AlarmEventItem name="报警/事件名称" />
              <AlarmEventItem name="报警/事件名称" />
              <AlarmEventItem name="报警/事件名称" />
              <AlarmEventItem name="报警/事件名称" />
              <AlarmEventItem name="报警/事件名称" />
              <AlarmEventItem name="报警/事件名称" />
            </Container>
          </Title>
        </Container>
        <Container className="inter-plat-center">
          <ZWMap mapKey={config.mapKey} />
          <Container className="inter-plat-other">
            <Search />
            <DisplayContent />
            <TemporaryGroup />
            <Intercom />
          </Container>
        </Container>
        <Container className="inter-plat-right">
          <Title name="资源统计" styled={styledComponent.flexNone}>
            <ResourceStatistics />
          </Title>
          <Title name="任务列表" styled={styledComponent.marginTop20}>
            <Container theme="style1" style={{marginTop: 10}}>
              <EventLegend
                name="任务详情"
                nameStyled={styledComponent.subtitle}
                styled={styledComponent.marginBottom10}
              />
              <Container className="task-detail-container">
                <KeyValue name="开始时间" value="2020-1-7 9:15:00" />
                <KeyValue name="结束时间" value="2020-1-8 9:15:00" />
                <KeyValue name="持续时长" value="12:12:00" />
                <KeyValue name="处理时长" value="00:12:00" />
                <KeyValue name="经纬度" value="101 345" />
                <KeyValue name="位置" value="重庆市渝中区大坪时代天街" compWidth="100%" />
              </Container>
              <Container className="task-member-container">
                <Button name="按" />
                <Button name="按" />
                <Button name="按" />
              </Container>
            </Container>
            <Container className="task-button-container">
              <Button name="全部" active={true} />
              <Button name="未处理" />
              <Button name="处理中" />
            </Container>
            <Container className="task-list-container">
              <AlarmEventItem name="任务名称" />
              <AlarmEventItem name="任务名称" />
              <AlarmEventItem name="任务名称" />
              <AlarmEventItem name="任务名称" />
              <AlarmEventItem name="任务名称" />
              <AlarmEventItem name="任务名称" />
              <AlarmEventItem name="任务名称" />
              <AlarmEventItem name="任务名称" />
            </Container>
          </Title>
        </Container>
      </Container>
    </Container>
  );
};

export default Home;
