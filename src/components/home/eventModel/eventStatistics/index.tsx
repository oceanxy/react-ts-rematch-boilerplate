/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件/任务统计
 * @Date: 2020-03-23 16:14:24
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-03-23 16:14:24
 */

import Button from '@/components/UI/button';
import Container from '@/components/UI/container';
import { IEventListRequest } from '@/models/home/eventModel/eventList';
import { IEventStatisticsState } from '@/models/home/eventModel/eventStatistics';
import React, { useState } from 'react';
import './index.scss';

interface IEventStatistics {
  getData?: (reqPayload: IEventListRequest) => void;
  data?: IEventStatisticsState;
}

// 事件处理状态
export enum EventStatisticsMethod {
  UNPROCESSED = 0, // 未处理
  PROCESSING = 1, // 处理中
  All = -1 // 全部
}

const EventDetails = (props: IEventStatistics) => {
  const [eventStatisticsMethod, setEventStatisticsMethod] = useState(-1);
  const { data, getData } = props;

  /**
   * 切换统计状态的点击事件
   * @param {EventStatisticsMethod} reqEventStatisticsMethod
   */
  const onClick = (reqEventStatisticsMethod: EventStatisticsMethod) => {
    const isStatisticsMethodChanged = reqEventStatisticsMethod !== eventStatisticsMethod;

    // 禁止重复点击切换统计状态
    if (!isStatisticsMethodChanged) return;

    // 获取新的列表数据
    getData?.({
      eventStatus: reqEventStatisticsMethod,
      isStatisticsMethodChanged
    } as IEventListRequest);

    // 更新组件状态
    setEventStatisticsMethod(reqEventStatisticsMethod);
  };

  return (
    <Container className="event-button-container">
      <Button
        name={`全部（${data!.totalNum}）`}
        onClick={onClick.bind(null, EventStatisticsMethod.All)}
        active={eventStatisticsMethod === EventStatisticsMethod.All}
      />
      <Button
        name={`未处理（${data!.untreatedNum}）`}
        onClick={onClick.bind(null, EventStatisticsMethod.UNPROCESSED)}
        active={eventStatisticsMethod === EventStatisticsMethod.UNPROCESSED}
      />
      <Button
        name={`处理中（${data!.processingNum}）`}
        onClick={onClick.bind(null, EventStatisticsMethod.PROCESSING)}
        active={eventStatisticsMethod === EventStatisticsMethod.PROCESSING}
      />
    </Container>
  );
};

export default EventDetails;
