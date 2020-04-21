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
import CompleteTask from '@/containers/home/taskModel/completeTask';
import EditTask from '@/containers/home/taskModel/editTask';
import { CurActiveGroupType } from '@/models/home/intercom/group';
import { TaskStatus } from '@/models/home/taskModel/taskDetails';
import { message } from 'antd';
import React from 'react';
import './index.scss';

interface ITaskOperationProps {
  data?: ITask;
  intercomGroupState: IIntercomGroupState
  isShowEditTaskModal: IEditTaskState['isShowModal']
  isShowCompleteTaskModal: ICompleteTaskState['isShowModal']
  showEditTaskModal: IEditTaskModel['effects']['showModal']
  showCompleteTaskModal: ICompleteTaskModel['effects']['showModal']
  setIntercomState: IIntercomModel['effects']['setState']
  setIntercomGroupState: IIntercomGroupModel['effects']['setState']
}

/**
 * 任务操作组件
 * @param {Partial<ITaskOperationProps>} props
 * @returns {any}
 * @constructor
 */
const OperationTask = (props: Partial<ITaskOperationProps>) => {
  const {
    data,
    intercomGroupState,
    showEditTaskModal,
    isShowEditTaskModal,
    isShowCompleteTaskModal,
    showCompleteTaskModal,
    setIntercomState,
    setIntercomGroupState
  } = props;
  const {id, curActiveGroupType, name} = intercomGroupState!;

  /**
   * 对讲
   */
  const onIntercomClick = () => {
    if (id !== data?.taskId) {
      if (
        // 检测当前是否已激活其他群组的对讲面板
        curActiveGroupType === CurActiveGroupType.Null &&
        // 检测是否有任务被选中
        data?.taskId &&
        // 检测任务状态是否已完成
        data.status !== TaskStatus.Completed
      ) {
        // 更新对讲面板状态
        setIntercomState!({active: true});
        // 更新对讲群组状态
        setIntercomGroupState!({
          name: data.taskName,
          id: data.taskId,
          curActiveGroupType: CurActiveGroupType.Task
        });
      } else {
        message.warning((
          <span>任务组（<span className="highlight"> {name} </span>）正在进行对讲！</span>
        ));
      }
    }
  };

  /**
   * 编辑任务
   */
  const onEditTaskClick = () => {
    message.destroy();
    data?.taskId && data.status === TaskStatus.NotStart && showEditTaskModal!();
  };

  /**
   * 完成任务
   */
  const onCompleteTaskClick = () => {
    message.destroy();
    data?.taskId && data.status === TaskStatus.Processing && showCompleteTaskModal!();
  };

  return (
    <Container className="task-operation-container">
      <Icon
        title="对讲"
        icon={IconSource.TASKINTERCOM}
        iconHover={IconSourceHover.TASKINTERCOM}
        className={data?.taskId && data.status !== TaskStatus.Completed ? '' : 'disabled'}
        onClick={onIntercomClick}
      />
      <Icon
        title="编辑"
        icon={IconSource.TASKEDIT}
        iconHover={IconSourceHover.TASKEDIT}
        className={data?.taskId && data.status === TaskStatus.NotStart ? '' : 'disabled'}
        onClick={onEditTaskClick}
      />
      <Icon
        title="完成"
        icon={IconSource.TASKCOMPLETE}
        iconHover={IconSourceHover.TASKCOMPLETE}
        className={data?.taskId && data.status === TaskStatus.Processing ? '' : 'disabled'}
        onClick={onCompleteTaskClick}
      />
      {isShowEditTaskModal ? <EditTask /> : null}
      {isShowCompleteTaskModal ? <CompleteTask /> : null}
    </Container>
  );
};

export default OperationTask;
