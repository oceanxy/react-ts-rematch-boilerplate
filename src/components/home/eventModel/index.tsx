/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件模块组件入口
 * @Date: 2020-04-01 周三 13:04:01
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-01 周三 13:04:01
 */

import EventLegend, { eventTypeColor } from '@/components/UI/eventLegend';
import Title from '@/components/UI/title';
import { EventDetails, EventList, EventStatistics } from '@/containers/home/eventModel';
import { eventTypeText } from '@/models/home/eventModel/eventDetails';
import React from 'react';

const EventModel = () => {
  return (
    <Title
      name="事件列表"
      titleExtraElementStyle={{marginLeft: 10}}
      titleExtraElement={
        <React.Fragment>
          <EventLegend name={eventTypeText[4]} iconColor={eventTypeColor[4]} />
          <EventLegend name={eventTypeText[3]} iconColor={eventTypeColor[3]} />
          <EventLegend name={eventTypeText[2]} iconColor={eventTypeColor[2]} />
          <EventLegend name={eventTypeText[1]} iconColor={eventTypeColor[1]} />
        </React.Fragment>
      }
    >
      <EventDetails />
      <EventStatistics />
      <EventList />
    </Title>
  );
};

export default EventModel;
