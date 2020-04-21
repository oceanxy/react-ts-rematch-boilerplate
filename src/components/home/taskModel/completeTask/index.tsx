/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 完成任务
 * @Date: 2020-04-20 周一 17:31:28
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-20 周一 17:31:28
 */

import styledBlocks from '@/styled/styledBlocks';
import { Button, message, Modal, Row } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import './index.scss';

/**
 * 完成任务组件Props
 */
interface ICompleteTaskProps extends Modal {
  isShowModal: ICompleteTaskState['isShowModal']
  showModal: ICompleteTaskModel['effects']['showModal']
  completeRemoteTask: ICompleteTaskModel['effects']['completeRemoteTask']
}

/**
 * 被styled-component包装后的antd Modal组件
 * @type {any}
 */
const StyledModal = styled(Modal)(styledBlocks.containerTheme);

const CompleteTask = (props: Partial<ICompleteTaskProps>) => {
  const {isShowModal, showModal, completeRemoteTask} = props;
  /**
   * 提交按钮的loading状态
   */
  const [loading, setLoading] = useState(false);

  /**
   * 取消
   */
  const completeTaskCancel = () => {
    showModal!(false);
  };

  /**
   * 完成任务
   */
  const completeTaskOK = async () => {
    setLoading(true);
    const response = await completeRemoteTask!({taskId: ''});
    setLoading(false);
    showModal!(false);

    if (Number(response.retCode) === 0) {
      message.info('任务已完成。');
    } else {
      message.info('完成任务失败，请稍后再试。');
    }
  };

  return (
    <StyledModal
      conTheme="style1"
      width={300}
      className="task-operation-modal"
      title="请确认"
      visible={isShowModal}
      onCancel={completeTaskCancel}
      footer={null}
      maskClosable={false}
      getContainer={false}
    >
      <Row justify="center">
        确定要完成任务吗？
      </Row>
      <br/>
      <Row justify="center" className="complete-operation-modal-row">
        <Button size="small" type="primary" loading={loading} onClick={completeTaskOK}>确 定</Button>
        <Button size="small" type="primary" onClick={completeTaskCancel}>取 消</Button>
      </Row>
    </StyledModal>
  );
};

export default CompleteTask;
