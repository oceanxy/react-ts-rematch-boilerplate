/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲计时组件
 * @Date: 2020-04-28 周二 16:40:09
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-10 周日 11:09:28
 */

import Container from '@/components/UI/containerComp';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import './index.scss';

/**
 * 对讲计时组件Render Props
 */
interface IIntercomTimingProps {
  /**
   * 是否开启倒计时，默认关闭
   */
  isCountdown?: boolean;
  /**
   * 倒计时时长，isCountdown为true时生效。单位：毫秒，默认：30*1000
   */
  countdownDuration?: number;
  /**
   * 开始主呼时的时间（moment）
   */
  startTime: moment.Moment;
  /**
   * 获取计时状态的回调函数
   * @param {number} timing
   */
  getTiming?: (timing: number) => void;
  /**
   * 计时文本
   * 倒计时默认：根据countdownDuration字段计算
   * 顺计时默认：'00:00:00'
   *
   * 格式：'文本{timing}文本'。 '{timing}'：为固定格式，会被格式化为具体的值。
   * 例如：'正在通话中{timing}...'
   */
  timingTextFormat?: string;
}

/**
 * 对讲计时组件
 * @param {IIntercomTimingProps} props
 * @returns {any}
 * @constructor
 */
const Timing = (props: IIntercomTimingProps) => {
  const { startTime, getTiming, isCountdown, countdownDuration, timingTextFormat } = props;
  // 获取moment时长对象
  const duration = moment.duration(countdownDuration || 35000);
  // 计时文本初始化
  const timingText = isCountdown
    ? moment((moment().add(duration) as any) - (moment() as any))
        .subtract(8, 'hours')
        .format('HH:mm:ss')
    : '00:00:00';

  // 计时文本状态
  const [timingVal, setTiming] = useState(timingText);

  /**
   * 计算时间
   * @param et 倒计时结束时的moment时间
   */
  const calculatingTime = (et: any) => {
    const cur: any = moment();
    let du: any;

    if (isCountdown) {
      du = moment(et - cur).subtract(8, 'hours');
    } else {
      du = moment(cur - (startTime as any)).subtract(8, 'hours');
    }

    setTiming(du.format('HH:mm:ss'));
    getTiming && getTiming(du.seconds());
  };

  useEffect(() => {
    let et = moment();

    if (isCountdown) {
      et = startTime.add(duration);
    }

    calculatingTime(et);
    const intervalTiming = setInterval(() => {
      calculatingTime(et);
    }, 1000);

    return () => clearInterval(intervalTiming);
  }, [isCountdown, countdownDuration, startTime]);

  return (
    <Container className="inter-plat-intercom-timing-container">
      {timingTextFormat ? timingTextFormat.replace('{timing}', timingVal) : timingVal}
    </Container>
  );
};

export default Timing;
