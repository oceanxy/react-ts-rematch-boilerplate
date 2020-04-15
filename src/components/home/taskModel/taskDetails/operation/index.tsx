/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 任务操作按钮组件
 * @Date: 2020-04-15 周三 11:48:41
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-15 周三 11:48:41
 */

import Container from '@/components/UI/containerComp';
import Icon, { IconSource, IconSourceHover } from '@/components/UI/iconComp';
import EditTask from '@/containers/home/taskModel/editTask';
import { TaskStatus } from '@/models/home/taskModel/taskDetails';
import React from 'react';
import './index.scss';

interface ITaskOperationProps {
  data?: ITask
  showEditTaskModal: IEditTaskModel['effects']['showModal']
}

/**
 * 任务操作组件
 * @param {Partial<ITaskOperationProps>} props
 * @returns {any}
 * @constructor
 */
const TaskOperation = (props: Partial<ITaskOperationProps>) => {
  const {data, showEditTaskModal} = props;

  const onIntercomClick = () => {
    data?.taskId && data.status !== TaskStatus.Completed && showEditTaskModal!();
  };

  return (
    <Container className="task-operation-container">
      <Icon
        title="对讲"
        icon={IconSource.TASKINTERCOM}
        iconHover={IconSourceHover.TASKINTERCOM}
        className={data?.taskId && data?.status !== TaskStatus.Completed ? '' : 'disabled'}
      />
      <Icon
        title="编辑"
        icon={IconSource.TASKEDIT}
        iconHover={IconSourceHover.TASKEDIT}
        className={data?.taskId && data?.status !== TaskStatus.Completed ? '' : 'disabled'}
        onClick={onIntercomClick}
      />
      <Icon
        title="完成"
        icon={IconSource.TASKCOMPLETE}
        iconHover={IconSourceHover.TASKCOMPLETE}
        className={data?.taskId && data?.status === TaskStatus.Processing ? '' : 'disabled'}
      />
      <EditTask />
    </Container>
  );
};

export default TaskOperation;