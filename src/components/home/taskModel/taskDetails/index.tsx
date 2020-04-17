/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 任务详情组件
 * @Date: 2020-04-14 周二 10:47:56
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-15 周三 10:11:19
 */

import TaskOperation from '@/components/home/taskModel/taskDetails/operation';
import Container from '@/components/UI/containerComp';
import ItemLegend from '@/components/UI/itemLegend';
import KeyValue from '@/components/UI/keyValue';
import { TaskPeriod, taskTypeColor } from '@/models/home/taskModel/taskDetails';
import styledBlocks from '@/styled';
import React, { useEffect } from 'react';
import './index.scss';

interface ITaskDetailsProps {
  data: ITaskDetailsState['data'];
  isShowEditTaskModal: IEditTaskState['isShowModal'];
  curSelTaskId: ITaskListState['curSelectedTaskId'];
  fetchData: ITaskDetailsModel['effects']['fetchData'];
  clearData: ITaskDetailsModel['reducers']['clearData'];
  showEditTaskModal: IEditTaskModel['effects']['showModal'];
}

const TaskDetails = (props: Partial<ITaskDetailsProps>) => {
  const { data, curSelTaskId, fetchData, clearData, showEditTaskModal, isShowEditTaskModal } = props;

  useEffect(() => {
    if (curSelTaskId) {
      fetchData!({ taskId: curSelTaskId });
    } else {
      clearData!();
    }
  }, [curSelTaskId]);

  return (
    <Container conTheme="style1" style={{ marginTop: 10 }}>
      <ItemLegend
        name="任务详情"
        iconColor={taskTypeColor[data!.taskLevel]}
        nameStyled={styledBlocks.subtitle}
        styled={styledBlocks.marginBottom10}
      />
      <Container className="task-detail-container">
        {data?.taskId ? (
          <>
            <KeyValue name="任务名称" value={data.taskName} />
            <KeyValue name="执行时长" value={data.taskDurationTimeStr} />
            <KeyValue
              name="任务周期"
              compWidth="100%"
              value={data.taskPeriod === TaskPeriod.Immediate ? '即时' : `定时(${data.dateDuplicateType})`}
            />
            <KeyValue name="开始时间" value={data.startTime} />
            <KeyValue name="结束时间" value={data.endTime} />
            <KeyValue name="实际开始时间" value={data.realStartTime || '-'} />
            <KeyValue name="关联事件" value={data.eventNames} />
            <KeyValue name="任务地址" value={data.address} compWidth="100%" />
          </>
        ) : (
          <p className="no-data-warn">请先点击需要查看的任务</p>
        )}
      </Container>
      <TaskOperation data={data} isShowEditTaskModal={isShowEditTaskModal} showEditTaskModal={showEditTaskModal} />
    </Container>
  );
};

export default TaskDetails;
