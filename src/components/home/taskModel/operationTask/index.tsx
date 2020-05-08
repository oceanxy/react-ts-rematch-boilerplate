/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 任务操作按钮组件
 * @Date: 2020-04-15 周三 11:48:41
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-15 周三 11:48:41
 */

import Container from '@/components/UI/containerComp';
import Icon, { IconSource } from '@/components/UI/iconComp';
import CompleteTask from '@/containers/home/taskModel/completeTask';
import EditTask from '@/containers/home/taskModel/editTask';
import { CurActiveGroupType } from '@/models/home/intercom/group';
import { TaskStatus } from '@/models/home/taskModel/taskDetails';
import { message } from 'antd';
import React from 'react';
import './index.scss';

interface ITaskOperationProps {
  data?: ITask
  intercomGroupState: IIntercomGroupState
  isShowEditTaskModal: IEditTaskState['isShowModal']
  isShowCompleteTaskModal: ICompleteTaskState['isShowModal']
  showEditTaskModal: IEditTaskModel['effects']['showModal']
  showCompleteTaskModal: ICompleteTaskModel['effects']['showModal']
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
    setIntercomGroupState
  } = props;
  const {id, curActiveGroupType, name} = intercomGroupState!;

  /**
   * 任务组对讲
   */
  const onIntercomClick = () => {
    // 检测是否有任务被选中且任务状态是否已完成
    if (data?.taskId && data?.status !== TaskStatus.Completed) {
      // 检测当前是否已激活其他群组类型（任务组/临时组/个呼）的对讲面板
      if (curActiveGroupType === CurActiveGroupType.Null) {
        // 更新对讲群组状态
        setIntercomGroupState!({
          name: data.taskName,
          id: data.taskId,
          curActiveGroupType: CurActiveGroupType.Task
        });
      } else if (curActiveGroupType === CurActiveGroupType.Task) {
        if (id !== data?.taskId) {
          message.destroy();
          message.warning((
            <span>其他任务组（<span className="highlight"> {name} </span>）正在进行对讲，暂不能进行此操作！</span>
          ));
        } else {
          message.destroy();
          message.info((
            <span>当前任务组（<span className="highlight"> {name} </span>）已激活对讲功能，请勿重复操作！</span>
          ));
        }
      } else if (curActiveGroupType === CurActiveGroupType.Temporary) {
        message.destroy();
        message.warning((
          <span>临时组（<span className="highlight"> {name} </span>）正在进行对讲，暂不能进行此操作！</span>
        ));
      } else {
        message.destroy();
        message.warning((
          <span>监控对象（<span className="highlight"> {name} </span>）正在进行对讲，暂不能进行此操作！</span>
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
    // 检测当前是否已激活其他群组类型（任务组/临时组）的对讲面板
    if (curActiveGroupType === CurActiveGroupType.Null) {
      data?.taskId && data.status === TaskStatus.Processing && showCompleteTaskModal!();
    } else {
      message.warning((
        <span>
          {curActiveGroupType === CurActiveGroupType.Task ? '任务组' : '临时组'}
          （<span className="highlight"> {name} </span>）正在进行对讲，暂不能进行此操作！
        </span>
      ));
    }
  };

  return (
    <Container className="task-operation-container">
      <Icon
        title="对讲"
        disabled={!(data?.taskId && data.status !== TaskStatus.Completed)}
        icon={IconSource.TASKINTERCOM}
        onClick={onIntercomClick}
      />
      <Icon
        title="编辑"
        disabled={!(data?.taskId && data.status === TaskStatus.NotStart)}
        icon={IconSource.TASKEDIT}
        onClick={onEditTaskClick}
      />
      <Icon
        title="完成"
        disabled={!(data?.taskId && data.status === TaskStatus.Processing)}
        icon={IconSource.TASKCOMPLETE}
        onClick={onCompleteTaskClick}
      />
      {isShowEditTaskModal ? <EditTask /> : null}
      {isShowCompleteTaskModal ? <CompleteTask /> : null}
    </Container>
  );
};

export default OperationTask;
