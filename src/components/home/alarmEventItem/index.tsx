/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件组件
 * @Date: 2020-01-04 14:34:43
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-03-23 18:16:30
 */

import Container from '@/components/UI/container';
import EventLegend, { ESeverity } from '@/components/UI/eventLegend';
import React from 'react';
import './index.scss';

interface IAlarmEvent {
  className?: string, // 样式表名
  name: string; // 事件/报警名称
  status?: string; // 事件/报警处理状态
  iconColor?: string | ESeverity; // 事件/任务严重程度
  time?: Date | null; // 开始时间
  monitorName?: string; // 监控对象名称
  onClick?: () => void;
}

const AlarmEvent = (props: IAlarmEvent) => {
  const {name, status, iconColor, time, monitorName, onClick, className} = props;

  return (
    <Container className={`event-alarm-item${className ? ` ${className}` : ''}`} theme="style2" onClick={onClick}>
      <div className="info">
        <EventLegend name={name} iconColor={iconColor} />
        <span className="status">{status}</span>
      </div>
      <div className="info">
        <div className="time">{time}</div>
        <div className="monitor-name">{monitorName}</div>
      </div>
    </Container>
  );
};

export default AlarmEvent;
