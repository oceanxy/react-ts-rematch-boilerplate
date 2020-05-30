/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲计时组件
 * @Date: 2020-04-28 周二 16:40:09
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-30 周六 23:50:09
 */

import Container from '@/components/UI/containerComp';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import './index.scss';

/**
 * 对讲计时组件Render Props
 */
interface IIntercomTimingProps {
  operationState: IIntercomOperationState
  state: IIntercomTimingState
  setState: IIntercomTimingModel['effects']['setState']
}

/**
 * 对讲计时组件
 * @param {IIntercomTimingProps} props
 * @returns {any}
 * @constructor
 */
const Timing = (props: Partial<IIntercomTimingProps>) => {
  const {operationState, state, setState} = props;
  const {timing, text, startTime, isCountdown, countdownDuration} = state!;
  const {callProcessing, callState} = operationState!;
  // 计时定时器缓存
  const [intervalTiming, setIntervalTiming] = useState(0);

  /**
   * 计算时间差
   * @param endTime
   */
  const calculatingTime = (endTime: moment.Moment) => {
    const cur: any = moment();
    const du = isCountdown ?
      moment(endTime as any - cur).subtract(8, 'hours') :
      moment(cur - (startTime as any)).subtract(8, 'hours');

    setState!({
      text: du.format('HH:mm:ss'),
      value: du.seconds()
    });
  };

  // 计算时间差逻辑处理
  useEffect(() => {
    if (timing) {
      // 获取moment时长对象
      const duration = isCountdown ? moment.duration(countdownDuration || 35000) : 0;
      const endTime = startTime.add(duration);

      calculatingTime(endTime);

      setIntervalTiming(setInterval(() => {
        calculatingTime(endTime);
      }, 1000));
    } else {
      clearInterval(intervalTiming);
    }

    return () => clearInterval(intervalTiming);
  }, [timing, startTime, isCountdown]);

  return timing ? (
    <Container className="inter-plat-intercom-timing-container" key='inter-plat-intercom-timing-container'>
      {callProcessing ? `连接中 ${text}` : callState ? `通话中 ${text}` : text}
    </Container>
  ) : null;
};

export default Timing;
