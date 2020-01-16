/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件组件
 * @Date: 2020-01-04 14:34:43
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-01-13 14:58:54
 */

import Container from '@/components/UI/container';
import EventLegend, { ESeverity } from '@/components/UI/eventLegend';
import React from 'react';
import './index.scss';

interface IAlarmEvent {
  name: string; // 事件/报警名称
  status?: boolean; // 事件/报警处理状态
  iconColor?: string | ESeverity; // 事件/任务严重程度
}

const AlarmEvent = (props: IAlarmEvent) => {
  return (
    <Container className="event-alarm-item" theme="style2">
      <div className="info">
        <EventLegend name={props.name} iconColor={props.iconColor} />
        <span className="status">{props.status ? '已处理' : '未处理'}</span>
      </div>
      <div className="time">2020-01-07 11:07:00</div>
    </Container>
  );
};

export default AlarmEvent;
