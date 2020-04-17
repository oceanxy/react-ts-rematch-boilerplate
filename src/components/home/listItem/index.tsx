/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件/任务通用组件
 * @Date: 2020-01-04 14:34:43
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-14 周二 10:31:03
 */

import Container from '@/components/UI/containerComp';
import EventLegend, { ESeverity } from '@/components/UI/itemLegend';
import React from 'react';
import './index.scss';

interface IListItemProps {
  className: string; // 样式表名
  name: string; // 事件/报警/任务名称
  status: string; // 事件/报警/任务处理状态
  iconColor: string | ESeverity; // 事件/报警/任务严重程度
  time: Date | null; // 开始时间
  monitorName: string; // 监控对象名称
  onClick(): void; // 点击事件
}

const ListItem = (props: Partial<IListItemProps>) => {
  const { name, status, iconColor, onClick, time, monitorName, className } = props;

  return (
    <Container className={`event-alarm-item${className ? ` ${className}` : ''}`} conTheme="style2" onClick={onClick}>
      <div className="info">
        <EventLegend name={name || ''} iconColor={iconColor} />
        <span className="status">{status}</span>
      </div>
      <div className="info">
        <div className="time">{time}</div>
        {monitorName ? <div className="monitor-name">{monitorName}</div> : null}
      </div>
    </Container>
  );
};

export default ListItem;
