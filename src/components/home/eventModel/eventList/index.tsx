/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件列表组件
 * @Date: 2020-03-23 15:50:32
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-03-24 16:14:09
 */

import AlarmEventItem from '@/components/home/alarmEventItem';
import Container from '@/components/UI/containerComp';
import { eventTypeColor } from '@/components/UI/eventLegend';
import { IEventDetailsRequest } from '@/models/home/eventModel/eventDetails';
import { IEvent, IEventListRequest } from '@/models/home/eventModel/eventList';
import React, { useEffect, useState } from 'react';
import './index.scss';

interface IEventList {
  data?: IEvent[];
  curSelectedMonitorId?: '';
  setCurMonitorId?: (curSelectedMonitorId: string) => void;
  getData?: (reqPayload: IEventListRequest) => void;
  clearEventDetailsData?: () => void;
  itemClick?: ({ startTime, monitorId, eventType }: IEventDetailsRequest) => void;
}

export const eventTypeStatus = ['未处理', '处理中'];

const EventDetails = (props: IEventList) => {
  const { data, curSelectedMonitorId, setCurMonitorId } = props;
  const [isInit, setInit] = useState(true);

  /**
   * 事件点击
   * @param {IEventDetailsRequest} payload
   */
  const onClick = (payload: IEventDetailsRequest) => {
    const { itemClick, clearEventDetailsData } = props;

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
    } as IEventListRequest);
  }, []);

  // 如果数据合法且是初次渲染组件，则自动选中当前第一条数据
  if (data?.length && isInit) {
    setCurMonitorId?.(data[0].monitorId);
    setInit(false);
  }

  return (
    <Container className="event-list-container">
      {data && data.length
        ? data.map((item, index) => (
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
          ))
        : null}
    </Container>
  );
};

export default EventDetails;
