/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲计时组件
 * @Date: 2020-04-28 周二 16:40:09
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-29 周三 11:23:34
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
   * 开始组呼时的时间（moment）
   */
  startTime: moment.Moment
  /**
   * 获取计时状态
   * @param {number} timing
   */
  getTiming?: (timing: number) => void
}

/**
 * 对讲计时组件
 * @param {IIntercomTimingProps} props
 * @returns {any}
 * @constructor
 */
const Timing = (props: IIntercomTimingProps) => {
  const {startTime, getTiming} = props;
  const [timingVal, setTiming] = useState('00:00:00');

  useEffect(() => {
    const intervalTiming = setInterval(() => {
      const cur: any = moment();
      const st: any = startTime!;
      const du = moment(cur - st).subtract(8, 'hours');

      setTiming(du.format('HH:mm:ss'));
      getTiming && getTiming(du.seconds());
    }, 1000);

    return () => clearInterval(intervalTiming);
  }, []);

  return (
    <Container className="inter-plat-intercom-timing-container">
      {timingVal}
    </Container>
  );
};

export default Timing;
