/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 编辑任务
 * @Date: 2020-04-15 周三 16:01:46
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-15 周三 16:01:46
 */

import { store } from '@/store';
import { message, Modal } from 'antd';
import React from 'react';

interface IEditTask extends Modal {
  isShowModal: IEditTaskState['isShowModal']
  showModal: IEditTaskModel['effects']['showModal']
  updateTask: IEditTaskModel['effects']['updateTask']
}

const EditTask = (props: Partial<IEditTask>) => {

  const {isShowModal, showModal, updateTask} = props;

  const editTaskOK = async () => {
    const response = await updateTask!({} as ITask);

    if (Number(response.retCode) === 0) {
      store.dispatch.editTask.updateModalState(false);
      message.info('修改成功');
    }
  };

  const editTaskCancel = () => {
    showModal!(false);
  };

  return (
    <Modal
      title="修改任务"
      visible={isShowModal}
      onOk={editTaskOK}
      onCancel={editTaskCancel}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default EditTask;
