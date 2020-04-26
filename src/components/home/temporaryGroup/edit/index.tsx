/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 编辑临时组信息
 * @Date: 2020-04-26 周日 16:06:54
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-26 周日 16:06:54
 */

import Modal from '@/components/UI/modal';
import { Button, Checkbox, Form, Input, message, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.scss';

/**
 * 编辑临时组组件Render Props
 */
interface IEditTaskProps {
  isShowModal: ITemporaryGroupState['isShowEditModal']
  setState: ITemporaryGroupModel['effects']['setState']
  createTemporaryGroup: ITemporaryGroupModel['effects']['createTemporaryGroup']
  fetchDataByCircle: IEntityModel['effects']['fetchDataByCircle']
}

/**
 * 编辑任务组件
 * @param {Partial<IEditTaskProps>} props
 * @returns {any}
 * @constructor
 */
const EditTemporaryGroup = (props: Partial<IEditTaskProps>) => {
  const {isShowModal, setState, createTemporaryGroup, fetchDataByCircle} = props;
  /**
   * 提交修改按钮的loading状态
   */
  const [loading, setLoading] = useState(false);
  /**
   * antd hooks
   */
  const [form] = Form.useForm();

  /**
   * 提交表单，创建/编辑临时组
   * @param values
   * @returns {Promise<void>}
   */
  const onFinish = async (values: any) => {
    const reqPayload = {
      temporaryGroup: '',
      intercomGroupId: '',
      interlocutorIds: ''
    };

    setLoading(true);
    const response = await createTemporaryGroup!(reqPayload);
    setLoading(false);

    message.destroy();
    if (Number(response.retCode) === 0) {
      message.success('创建临时组成功！');
    } else {
      message.warning('创建临时组失败，请稍候再试！');
    }
  };

  /**
   * 取消编辑
   */
  const editTempGroupCancel = () => {
    setState!({isShowEditModal: false});
  };

  useEffect(() => {
    if (isShowModal) {
      (async () => {
        const response = await fetchDataByCircle!();

        if (response.retCode === 0) {
          form.setFieldsValue({
            temporaryGroup: '',
            entities: response.data.monitors,
            interlocutorIds: ''
          });
        }
      })();
    }
  }, [isShowModal]);

  return (
    <Modal
      width={500}
      className="temp-group-edit-modal"
      title="创建临时组"
      visible={isShowModal}
      onCancel={editTempGroupCancel}
      footer={null}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          label="名称"
          name="temporaryGroup"
          rules={[{required: true, message: '请输入任务名称'}]}
          className="input"
        >
          <Input type="text" placeholder="请输入任务名称" />
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.entities !== currentValues.entities}
        >
          {({getFieldValue}) => {
            return (
              <Form.Item
                label="监控对象"
                name="interlocutorIds"
                rules={[{required: true, message: '请勾选加入临时组的监控对象'}]}
                className="checkbox"
              >
                <Checkbox.Group>
                  {
                    (getFieldValue('entities') || []).map((entity: IEntity, index: number) => (
                      <Checkbox key={`temp-group-edit-modal-entity-${index}`} value={entity.monitorId}>
                        {entity.monitorName}
                      </Checkbox>
                    ))
                  }
                </Checkbox.Group>
              </Form.Item>
            );
          }}
        </Form.Item>
        <Row justify="end" className="temp-group-edit-modal-row">
          <Button size="small" type="primary" htmlType="submit" loading={loading}>提 交</Button>
          <Button size="small" type="primary" onClick={editTempGroupCancel}>取 消</Button>
        </Row>
      </Form>
    </Modal>
  );
};

export default EditTemporaryGroup;
