/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 任务列表组件
 * @Date: 2020-04-14 周二 10:56:15
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-15 周三 10:10:56
 */

import ListItem from '@/components/home/listItem';
import Container from '@/components/UI/containerComp';
import { taskTypeColor, taskTypeStatus } from '@/models/home/taskModel/taskDetails';
import React, { useEffect, useState } from 'react';
import './index.scss';

interface ITaskListProps {
  data: ITaskListData['taskPageInfo']
  curSelectedTaskId: ITaskListState['curSelectedTaskId']
  setState: ITaskListModel['effects']['setState']
  fetchData: ITaskListModel['effects']['fetchData']
}

const TaskList = (props: Partial<ITaskListProps>) => {
  const {data, curSelectedTaskId, fetchData, setState} = props;
  // 指示组件是否是初次渲染的状态
  const [isInit, setInit] = useState(true);

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

  // 如果数据合法且是初次渲染组件，则自动选中当前第一条数据
  if (data?.records.length && isInit) {
    setState?.({curSelectedTaskId: data.records[0].taskId});
    setInit(false);
  }

  useEffect(() => {
    fetchData!();
  }, []);

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
