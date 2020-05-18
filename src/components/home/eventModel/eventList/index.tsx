/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件列表组件
 * @Date: 2020-03-23 15:50:32
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-18 周一 16:04:38
 */

import ListItem from '@/components/home/listItem';
import Container from '@/components/UI/containerComp';
import { eventTypeColor } from '@/models/home/eventModel/eventDetails';
import React, { useEffect, useState } from 'react';
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
  const [isInit, setInit] = useState(true);

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
    props.fetchData!({
      sortType: 0,
      isReturnEventDetails: 1
    } as IEventListRequest);
  }, []);

  // 如果数据合法且是初次渲染组件，则自动选中当前第一条数据
  if (data?.length && isInit) {
    setState!({curSelectedEvent: data[0]});
    setInit(false);
  }

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
