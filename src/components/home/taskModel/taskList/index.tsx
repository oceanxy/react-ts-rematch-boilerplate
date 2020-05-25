/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 任务列表组件
 * @Date: 2020-04-14 周二 10:56:15
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-21 周四 18:05:09
 */

import ListItem from '@/components/home/listItem';
import Container from '@/components/UI/containerComp';
import { taskTypeColor, taskTypeStatus } from '@/models/home/taskModel/taskDetails';
import React, { useEffect, useState } from 'react';
import './index.scss';

interface ITaskListProps {
  data: ITaskListResponse['taskPageInfo']
  curSelectedTask: ITaskListState['curSelectedTask']
  curSelectedEvent: IEventListState['curSelectedEvent']
  setState: ITaskListModel['effects']['setState']
  fetchData: ITaskListModel['effects']['fetchData']
}

const TaskList = (props: Partial<ITaskListProps>) => {
  const {data, curSelectedTask, fetchData, setState, curSelectedEvent} = props;
  // 是否是首次加载组件
  const [isFirstLoad, setFirstLoad] = useState(true);

  /**
   * 任务点击
   * @param {ITask} task
   */
  const onClick = (task: ITask) => {
    // 检测当前点击的任务是否选中。如果已选中，则取消选中；反之则选中。
    if (curSelectedTask?.taskId === task.taskId) {
      setState?.({curSelectedTask: undefined});
    } else {
      setState?.({curSelectedTask: task});
    }
  };

  useEffect(() => {
    // isFirstLoad字段规则：
    // 因为首次加载页面时，必定会进入useEffect函数，
    // 其实这次请求是没有意义的，因为首次加载页面时也会加载事件列表，
    // 而事件列表的当前选中事件状态更新后会立即触发本useEffect执行，
    // 从而导致在首次加载页面时，会连续发送两次事件列表的请求，
    // 造成资源浪费，所以这里在本组件内部用一个单独的状态来监测是否是首次加载页面
    // curSelectedEvent状态规则：
    // 因事件列表与任务列表有联动效果，而海量点与任务列表也有联动效果
    // 所以规定当前选中事件状态（curSelectedEvent）有三种状态
    // 1：undefined。通过非事件列表组件触发的状态更新，且为假值时，规定为undefined
    // 2：{}。通过事件列表组件内部触发的状态更新，切为假值时，规定为空对象
    // 3：正常设置当前事件信息，为一个事件对象 IEvent。
    if (!isFirstLoad && curSelectedEvent) {
      fetchData!({selectFirstData: true});
    } else {
      setFirstLoad(false);
    }
  }, [curSelectedEvent?.eventId]);

  return (
    <Container className="task-list-container">
      {
        data?.records.length ?
          data.records.map((task, index) => (
            <ListItem
              key={`event-list-${index}`}
              className={curSelectedTask?.taskId === task.taskId ? 'active' : ''}
              name={task.taskName}
              status={taskTypeStatus[task.status]}
              iconColor={taskTypeColor[task.taskLevel]}
              time={task.startTime}
              onClick={onClick.bind(null, task)}
            />
          )) :
          null
      }
    </Container>
  );
};

export default TaskList;
