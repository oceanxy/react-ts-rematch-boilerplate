/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件详情组件
 * @Date: 2020-03-19 17:54:33
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-03-20 17:24:49
 */

import Container from '@/components/UI/container';
import EventLegend from '@/components/UI/eventLegend';
import KeyValue from '@/components/UI/keyValue';
import { eventTypeColor, eventTypeText, IEventDetailsData } from '@/models/home';
import styledComponent from '@/styled';
import React, { useEffect } from 'react';
import './index.scss';

interface IEventDetails {
  data?: IEventDetailsData,
  getData?: any
}

const EventDetails = (props: IEventDetails) => {
  const {data} = props;

  useEffect(() => {
    props.getData();
  }, []);

  return (
    <Container theme="style1" style={{marginTop: 10}}>
      {
        data && data.monitorName ? (
            <>
              <EventLegend
                name="事件详情"
                iconColor={eventTypeColor[data.eventLevel]}
                nameStyled={styledComponent.subtitle}
                styled={styledComponent.marginBottom10}
              />
              <Container className="event-detail-container">
                <KeyValue name="事件名称" value={`${data.administrativeRegion} 发生 ${data.eventName}`} compWidth="100%" />
                <KeyValue name="事件等级" value={eventTypeText[data.eventLevel]} />
                <KeyValue name="监控对象" value={data.monitorName} />
                <KeyValue name="开始时间" value={data.startTime} />
                <KeyValue name="结束时间" value={data.endTime} />
                <KeyValue name="持续时长" value={`${data.eventDurationTimeStr}`} />
                <KeyValue name="处理时长" value={`${data.eventProcessingTimeStr}`} />
                <KeyValue name="经纬度" value={`${data.longitude}, ${data.latitude}`} />
                <KeyValue name="位置" value={data.eventEndAddress} compWidth="100%" />
              </Container>
            </>
          )
          : <p className="no-data-warn">请先点击需要查看的事件</p>
      }
    </Container>
  );
};

export default EventDetails;