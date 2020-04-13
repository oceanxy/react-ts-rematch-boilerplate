/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件列表组件
 * @Date: 2020-03-23 15:50:32
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-13 周一 13:54:13
 */

import AlarmEventItem from '@/components/home/alarmEventItem';
import Container from '@/components/UI/containerComp';
import { eventTypeColor } from '@/components/UI/eventLegend';
import React, { useEffect, useState } from 'react';
import './index.scss';

/**
 * 时间列表组件props
 */
interface IEventListProps {
  data?: IEvent[];
  curSelectedMonitorId?: '';
  setCurMonitorId?: (curSelectedMonitorId: string) => void;
  getData?: (reqPayload: IEventListRequest) => void;
  clearEventDetailsData?: () => void;
  itemClick?: ({ startTime, monitorId, eventType }: IEventDetailsRequest) => void;
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
const EventDetails = (props: IEventListProps) => {
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
