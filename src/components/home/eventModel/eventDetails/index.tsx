/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件详情组件
 * @Date: 2020-03-19 17:54:33
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-18 周一 15:53:20
 */

import Container from '@/components/UI/containerComp';
import ItemLegend from '@/components/UI/itemLegend';
import KeyValue from '@/components/UI/keyValue';
import { eventTypeColor, eventTypeText } from '@/models/home/eventModel/eventDetails';
import styledComponent from '@/styled';
import React, { useEffect } from 'react';
import './index.scss';

interface IEventDetailsProps {
  data: IEventDetailsData;
  fetchData: IEventDetailsModel['effects']['fetchData']
  setState: IEventDetailsModel['effects']['setState']
  curSelectedEvent: IEventListState['curSelectedEvent']
}

const EventDetails = (props: Partial<IEventDetailsProps>) => {
  const {data, curSelectedEvent, fetchData, setState} = props;

  useEffect(() => {
    if (curSelectedEvent?.eventId) {
      // 获取数据（request可在model内获取）
      fetchData!();
    } else {
      // 清空详情数据
      setState!();
    }
  }, [curSelectedEvent?.eventId]);

  return (
    <Container conTheme="style1" style={{marginTop: 10}}>
      <ItemLegend
        name="事件详情"
        iconColor={eventTypeColor[data!.eventLevel]}
        nameStyled={styledComponent.subtitle}
        styled={styledComponent.marginBottom10}
      />
      <Container className="event-detail-container">
        {data?.eventId ? (
          <>
            <KeyValue
              name="事件名称"
              value={`${data.administrativeRegion} 发生 ${data.eventName}`}
              compWidth="100%"
            />
            <KeyValue name="事件等级" value={eventTypeText[data.eventLevel]} />
            <KeyValue name="监控对象" value={data.monitorName} />
            <KeyValue name="开始时间" value={data.startTime} />
            <KeyValue name="结束时间" value={data.endTime} />
            <KeyValue name="持续时长" value={`${data.eventDurationTimeStr}`} />
            <KeyValue name="处理时长" value={`${data.eventProcessingTimeStr}`} />
            <KeyValue name="经纬度" value={`${data.longitude}, ${data.latitude}`} />
            <KeyValue name="位置" value={data.eventEndAddress} compWidth="100%" />
          </>
        ) : (
          <p className="no-data-warn">请先点击需要查看的事件</p>
        )}
      </Container>
    </Container>
  );
};

export default EventDetails;
