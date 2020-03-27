/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件列表组件
 * @Date: 2020-03-23 15:50:32
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-03-24 16:14:09
 */

import AlarmEventItem from '@/components/home/alarmEventItem';
import Container from '@/components/UI/container';
import { eventTypeColor } from '@/components/UI/eventLegend';
import { EventDetailsRequest } from '@/models/home/eventDetails';
import { EventItemData, EventListRequest } from '@/models/home/eventList';
import React, { useEffect, useState } from 'react';
import './index.scss';

interface IEventList {
  data?: EventItemData[],
  curSelectedMonitorId?: '',
  setCurMonitorId?: (curSelectedMonitorId: string) => void,
  getData?: (reqPayload: EventListRequest) => void,
  clearEventDetailsData?: () => void,
  itemClick?: ({startTime, monitorId, eventType}: EventDetailsRequest) => void
}

export const eventTypeStatus = ['未处理', '处理中'];

const EventDetails = (props: IEventList) => {
  const {data, curSelectedMonitorId, setCurMonitorId} = props;
  const [isInit, setInit] = useState(true);

  /**
   * 事件点击
   * @param {EventDetailsRequest} payload
   */
  const onClick = (payload: EventDetailsRequest) => {
    const {itemClick, clearEventDetailsData} = props;

    // 检测当前点击的监控对象是否选中。如果已选中，则取消选中；反之则选中。
    if (curSelectedMonitorId === payload.monitorId) {
      clearEventDetailsData!();
      setCurMonitorId?.('');
    } else {
      itemClick!(payload);
      setCurMonitorId?.(payload.monitorId);
    }
  };

  useEffect(() => {
    props.getData!({
      sortType: 0,
      isReturnEventDetails: 1
    } as EventListRequest);
  }, []);

  // 如果数据合法且是初次渲染组件，则自动选中当前第一条数据
  if (data?.length && isInit) {
    setCurMonitorId?.(data[0].monitorId);
    setInit(false);
  }

  return (
    <Container className="event-list-container">
      {
        data && data.length ? data.map((item, index) => (
          <AlarmEventItem
            key={`event-list-${index}`}
            className={curSelectedMonitorId === item.monitorId ? 'active' : ''}
            name={item.eventName}
            status={eventTypeStatus[item.eventStatus]}
            iconColor={eventTypeColor[item.eventLevel]}
            time={item.startTime}
            monitorName={item.monitorName}
            onClick={onClick.bind(null, {
              startTime: item.startTime,
              monitorId: item.monitorId,
              eventType: item.eventType
            })}
          />
        )) : null
      }
    </Container>
  );
};

export default EventDetails;