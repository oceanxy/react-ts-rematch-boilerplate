/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 任务列表组件
 * @Date: 2020-04-14 周二 10:56:15
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-11 周一 10:13:03
 */

import ListItem from '@/components/home/listItem';
import Container from '@/components/UI/containerComp';
import { taskTypeColor, taskTypeStatus } from '@/models/home/taskModel/taskDetails';
import React, { useEffect } from 'react';
import './index.scss';

interface ITaskListProps {
  data: ITaskListResponse['taskPageInfo']
  curSelectedTaskId: ITaskListState['curSelectedTaskId']
  curSelectedMonitorId: IEventListState['curSelectedMonitorId']
  setState: ITaskListModel['effects']['setState']
  fetchData: ITaskListModel['effects']['fetchData']
}

const TaskList = (props: Partial<ITaskListProps>) => {
  const {data, curSelectedTaskId, fetchData, setState, curSelectedMonitorId} = props;
  /**
   * 任务点击
   * @param {IEventDetailsRequest} payload
   */
  const onClick = (payload: ITaskDetailsRequest) => {
    // 检测当前点击的任务是否选中。如果已选中，则取消选中；反之则选中。
    if (curSelectedTaskId === payload.taskId) {
      setState?.({curSelectedTaskId: ''});
    } else {
      setState?.({curSelectedTaskId: payload.taskId});
    }
  };

  useEffect(() => {
    fetchData!({selectFirstData: true});
  }, [curSelectedMonitorId]);

  return (
    <Container className="task-list-container">
      {
        data?.records.length ?
          data.records.map((item, index) => (
            <ListItem
              key={`event-list-${index}`}
              className={curSelectedTaskId === item.taskId ? 'active' : ''}
              name={item.taskName}
              status={taskTypeStatus[item.status]}
              iconColor={taskTypeColor[item.taskLevel]}
              time={item.startTime}
              onClick={onClick.bind(null, {
                taskId: item.taskId
              })}
            />
          )) :
          null
      }
    </Container>
  );
};

export default TaskList;
