/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件列表组件
 * @Date: 2020-03-23 15:50:32
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-28 周四 11:31:54
 */

import ListItem from '@/components/home/listItem';
import Container from '@/components/UI/containerComp';
import { eventTypeColor } from '@/models/home/eventModel/eventDetails';
import React, { useEffect } from 'react';
import './index.scss';

/**
 * 时间列表组件props
 */
interface IEventListProps {
  data: IEvent[]
  curSelectedEvent: IEventListState['curSelectedEvent']
  setState: IEventListModel['effects']['setState']
  fetchData: IEventListModel['effects']['fetchData']
}

/**
 * 事件类型状态对应文字
 * @type {string[]}
 */
export const eventTypeStatus = ['未处理', '处理中'];

/**
 * 事件详情组件
 * @param {IEventListProps} props
 * @returns {any}
 * @constructor
 */
const EventDetails = (props: Partial<IEventListProps>) => {
  const {data, curSelectedEvent, setState} = props;

  /**
   * 事件点击
   * @param {IEvent} event
   */
  const onClick = (event: IEvent) => {
    // 检测当前点击的监控对象是否选中。如果已选中，则取消选中；反之则选中。
    if (curSelectedEvent?.eventId === event.eventId) {
      setState!({curSelectedEvent: {}});
    } else {
      setState!({curSelectedEvent: event});
    }
  };

  useEffect(() => {
    props.fetchData!({selectFirstData: true});
  }, []);

  return (
    <Container className="event-list-container">
      {data && data.length
        ? data.map((event) => (
          <ListItem
            key={`event-list-${event.eventId}`}
            className={curSelectedEvent?.eventId === event.eventId ? 'active' : ''}
            name={event.eventName}
            status={eventTypeStatus[event.eventStatus]}
            iconColor={eventTypeColor[event.eventLevel]}
            time={event.startTime}
            monitorName={event.monitorName}
            onClick={onClick.bind(null, event)}
          />
        ))
        : null}
    </Container>
  );
};

export default EventDetails;
