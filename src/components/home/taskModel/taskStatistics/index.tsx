/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 任务统计组件
 * @Date: 2020-04-14 周二 10:52:10
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-14 周二 17:03:30
 */

import Button from '@/components/UI/button';
import Container from '@/components/UI/containerComp';
import { TaskStatisticsMethod } from '@/models/home/taskModel';
import React, { useState } from 'react';
import './index.scss';

interface ITaskStatisticsProps {
  fetchData: (reqPayload: IEventListRequest) => void;
  data: IEventStatisticsState;
}

const TaskStatistics = (props: Partial<ITaskStatisticsProps>) => {
  const [taskStatisticsMethod, setTaskStatisticsMethod] = useState(-1);
  const {data, fetchData} = props;

  /**
   * 切换统计状态的点击事件
   * @param {EventStatisticsMethod} reqTaskStatisticsMethod
   */
  const onClick = (reqTaskStatisticsMethod: TaskStatisticsMethod) => {
    const isStatisticsMethodChanged = reqTaskStatisticsMethod !== taskStatisticsMethod;

    // 禁止重复点击切换统计状态
    if (!isStatisticsMethodChanged) return;

    // 获取新的列表数据
    fetchData?.({
      eventStatus: reqTaskStatisticsMethod,
      isStatisticsMethodChanged
    } as IEventListRequest);

    // 更新组件状态
    setTaskStatisticsMethod(reqTaskStatisticsMethod);
  };

  return (
    <Container className="task-button-container">
      <Button
        name={`全部 (${data!.totalNum})`}
        onClick={onClick.bind(null, TaskStatisticsMethod.ALL)}
        active={taskStatisticsMethod === TaskStatisticsMethod.ALL}
      />
      <Button
        name={`未开始 (${data!.untreatedNum})`}
        onClick={onClick.bind(null, TaskStatisticsMethod.NOTSTART)}
        active={taskStatisticsMethod === TaskStatisticsMethod.NOTSTART}
      />
      <Button
        name={`执行中 (${data!.processingNum})`}
        onClick={onClick.bind(null, TaskStatisticsMethod.PROCESSING)}
        active={taskStatisticsMethod === TaskStatisticsMethod.PROCESSING}
      />
      <Button
        name={`已完成 (${data!.finishedNum})`}
        onClick={onClick.bind(null, TaskStatisticsMethod.COMPLETED)}
        active={taskStatisticsMethod === TaskStatisticsMethod.COMPLETED}
      />
    </Container>
  );
};

export default TaskStatistics;
