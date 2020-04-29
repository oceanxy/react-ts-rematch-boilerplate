/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 编辑临时组信息
 * @Date: 2020-04-26 周日 16:06:54
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-28 周二 14:04:51
 */

import Modal from '@/components/UI/modal';
import { Button, Checkbox, Form, Input, Row } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import React, { useEffect, useState } from 'react';
import './index.scss';

/**
 * 编辑临时组组件Render Props
 */
interface IEditTaskProps {
  state: ITemporaryGroupState
  setState: ITemporaryGroupModel['effects']['setState']
  createTemporaryGroup: ITemporaryGroupModel['effects']['createTemporaryGroup']
  fetchDataByCircle: IEntityModel['effects']['fetchDataByCircle']
}

/**
 * 编辑临时组组件
 * @param {Partial<IEditTaskProps>} props
 * @returns {any}
 * @constructor
 */
const EditTemporaryGroup = (props: Partial<IEditTaskProps>) => {
  const {state, setState, createTemporaryGroup, fetchDataByCircle} = props;
  const {isShowEditModal, loading, backFillInfo: {name}} = state!;
  /**
   * antd hooks
   */
  const [form] = Form.useForm();
  /**
   * 根据圈选范围获取的监控对象临时数组状态
   */
  const [tempEntities, setTempEntities] = useState([] as IEntity[]);
  /**
   * 全选、反选复选框选中状态
   */
  const [checked, setChecked] = useState({all: false, invert: false} as {all?: boolean, invert?: boolean});
  /**
   * 反选复选框显示状态
   */
  const [showInvert, setShowInvert] = useState(false);

  /**
   * 提交表单，创建/编辑临时组
   * @param values
   * @returns {Promise<void>}
   */
  const onFinish = (values: any) => {
    const reqPayload = {
      temporaryGroup: values.temporaryGroup,
      userIds: values.interlocutorIds.join(',')
    };

    // 开始创建临时组，进入loading状态
    // 注意：因为第三方提供的API非直接返回创建状态，而是通过监听创建临时组事件来返回创建状态，
    // 所以要到 IMonitoringDispatchModel > onCreateTempGroupResponse事件去关闭
    // loading状态
    setState!({loading: true});
    createTemporaryGroup!(reqPayload);
  };

  /**
   * 取消编辑
   */
  const editTempGroupCancel = () => {
    setState!({isShowEditModal: false});
  };

  /**
   * 获取实体的id集合
   * @returns {string[]}
   */
  const getEntityIds = () => tempEntities.map((entity) => entity.userId);

  /**
   * 全选事件
   * @param {CheckboxChangeEvent} e
   */
  const checkAll = (e: CheckboxChangeEvent) => {
    form.setFieldsValue({
      interlocutorIds: e.target.checked ? getEntityIds() : []
    });

    setChecked({all: e.target.checked});
    setShowInvert(false);
  };

  /**
   * 反选事件
   * @param {CheckboxChangeEvent} e
   */
  const checkInvert = (e: CheckboxChangeEvent) => {
    const allCheckedEntities = tempEntities.map((entity) => entity.userId);
    const curCheckedEntities = form.getFieldValue('interlocutorIds');
    const invertCheckedEntities = allCheckedEntities.reduce((invertCheckedEntities, userId) => {
      if (!curCheckedEntities.includes(userId)) {
        invertCheckedEntities.push(userId!);
      }

      return invertCheckedEntities;
    }, [] as number[]);

    form.setFieldsValue({
      interlocutorIds: invertCheckedEntities
    });

    setChecked({invert: e.target.checked});
  };

  /**
   * 复选框change事件
   * @param {CheckboxValueType[]} checkedValues
   */
  const listenersCheck = (checkedValues: CheckboxValueType[]) => {
    if (checkedValues.length && checkedValues.length === tempEntities.length) {
      setChecked({all: true, invert: false});
      setShowInvert(false);
    } else if (!checkedValues.length) {
      setChecked({all: false, invert: false});
      setShowInvert(false);
    } else {
      setChecked({all: false, invert: false});
      setShowInvert(true);
    }
  };

  useEffect(() => {
    if (isShowEditModal) {
      (async () => {
        const response = await fetchDataByCircle!();
        setTempEntities(response.data.monitors);

        if (response.retCode === 0) {
          form.setFieldsValue({
            temporaryGroup: name,
            entities: response.data.monitors,
            interlocutorIds: []
          });
        }
      })();
    }
  }, [isShowEditModal]);

  return (
    <Modal
      width={500}
      className="temp-group-edit-modal"
      title="创建临时组"
      visible={isShowEditModal}
      onCancel={editTempGroupCancel}
      footer={null}
    >
      <Form form={form} onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="名称"
          name="temporaryGroup"
          rules={[{required: true, message: '请输入任务名称'}]}
          className="input"
        >
          <Input type="text" placeholder="请输入任务名称" disabled={!!name} />
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.entities !== currentValues.entities}
        >
          {({getFieldValue}) => {
            return (
              <Form.Item
                className="checkbox"
                label="监控对象"
              >
                <Form.Item className="checkbox-operation">
                  <Checkbox
                    className="checkbox-all"
                    onChange={checkAll}
                    checked={checked.all}
                  >全 选</Checkbox>
                  {
                    showInvert ? (
                      <Checkbox
                        className="checkbox-invert"
                        onChange={checkInvert}
                        checked={checked.invert}
                      >反 选</Checkbox>
                    ) : null
                  }
                </Form.Item>
                <Form.Item name="interlocutorIds" rules={[{required: true, message: '请勾选加入临时组的监控对象'}]}>
                  <Checkbox.Group onChange={listenersCheck}>
                    {
                      (getFieldValue('entities') || []).map((entity: IEntity, index: number) => (
                        <Checkbox key={`temp-group-edit-modal-entity-${index}`} value={entity.userId}>
                          {entity.monitorName}
                        </Checkbox>
                      ))
                    }
                  </Checkbox.Group>
                </Form.Item>
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