/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件/任务统计
 * @Date: 2020-03-23 16:14:24
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-29 周五 11:04:02
 */

import Button from '@/components/UI/button';
import Container from '@/components/UI/containerComp';
import { EventStatisticsMethod } from '@/models/home/eventModel/eventDetails';
import React, { useEffect } from 'react';
import './index.scss';

interface IEventStatisticsProps {
  fetchData: IEventListModel['effects']['fetchData']
  data: IEventStatisticsState['data']
  eventStatisticsMethod: IEventStatisticsState['eventStatisticsMethod']
  setState: IEventStatisticsModel['effects']['setState']
}

const EventDetails = (props: Partial<IEventStatisticsProps>) => {
  const {data, eventStatisticsMethod, fetchData, setState} = props;

  /**
   * 切换统计状态的点击事件
   * @param {EventStatisticsMethod} reqEventStatisticsMethod
   */
  const onClick = (reqEventStatisticsMethod: EventStatisticsMethod) => {
    const isStatisticsMethodChanged = reqEventStatisticsMethod !== eventStatisticsMethod;

    // 禁止重复点击切换统计状态
    if (!isStatisticsMethodChanged) return;

    // 更新组件状态
    setState!({eventStatisticsMethod: reqEventStatisticsMethod});
  };

  useEffect(() => {
    fetchData!();
  }, [eventStatisticsMethod]);

  return (
    <Container className="event-button-container">
      <Button
        name={`全部 (${data?.totalNum ?? 0})`}
        onClick={onClick.bind(null, EventStatisticsMethod.ALL)}
        active={eventStatisticsMethod === EventStatisticsMethod.ALL}
      />
      <Button
        name={`未处理 (${data?.untreatedNum ?? 0})`}
        onClick={onClick.bind(null, EventStatisticsMethod.UNPROCESSED)}
        active={eventStatisticsMethod === EventStatisticsMethod.UNPROCESSED}
      />
      <Button
        name={`处理中 (${data?.processingNum ?? 0})`}
        onClick={onClick.bind(null, EventStatisticsMethod.PROCESSING)}
        active={eventStatisticsMethod === EventStatisticsMethod.PROCESSING}
      />
    </Container>
  );
};

export default EventDetails;
