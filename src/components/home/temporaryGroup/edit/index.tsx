/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 编辑临时组信息
 * @Date: 2020-04-26 周日 16:06:54
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-30 周四 09:49:43
 */

import Modal from '@/components/UI/modal';
import { APIResponse } from '@/interfaces/api/mock';
import { MouseToolType } from '@/models/UI/amap';
import { Button, Checkbox, Form, Input, Row, Select, Slider } from 'antd';
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
  entityDispatch: IEntityModel['effects']
  addTempGroupMember: IMonitoringDispatchModel['effects']['addTempGroupMember']
  mouseToolType: IAMapState['mouseToolType']
  byCondition: IEntityState['byCondition']
}

/**
 * 编辑临时组组件
 * @param {Partial<IEditTaskProps>} props
 * @returns {any}
 * @constructor
 */
const EditTemporaryGroup = (props: Partial<IEditTaskProps>) => {
  const {
    state, setState, createTemporaryGroup, byCondition,
    addTempGroupMember, mouseToolType, entityDispatch
  } = props;
  const {fetchFixedData, fetchDataByCircle} = entityDispatch!;
  const {isShowEditModal, title, loading, backFillInfo: {name, radius}} = state!;

  // 避免不必要的渲染
  if (!isShowEditModal) return null;

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
    // 进入loading状态
    // 注意：因为第三方提供的API非直接返回调用接口的状态，而是通过监听事件的方式返回结果，
    // 所以要到 IMonitoringDispatchModel 去关闭loading状态以及对话框
    setState!({loading: true});
    // 检查是创建临时组还是添加临时组成员
    if (title.includes('创建')) {
      const reqPayload = {
        temporaryGroup: values.temporaryGroup,
        userIds: values.interlocutorIds
      };

      createTemporaryGroup!(reqPayload);
    } else {
      addTempGroupMember!(values.interlocutorIds);
    }
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
    if (isShowEditModal && !byCondition) {
      (async () => {
        let response: any;

        if (mouseToolType === MouseToolType.Circle) {
          // 获取地图已圈选范围内的所有实体（监控对象）数据
          response = await fetchDataByCircle();
        } else if (mouseToolType === MouseToolType.Null) {
          response = await fetchFixedData();
        }

        const {monitors} = (response as APIResponse<{monitors: IEntity[]}>).data;

        setTempEntities(monitors);

        if (response.retCode === 0) {
          // 将实体数据回填到antd form上
          form.setFieldsValue({
            temporaryGroup: name,
            entities: monitors,
            interlocutorIds: []
          });
        }
      })();
    }

    // 设置全选、反选复选框的状态
    listenersCheck([]);
  }, [isShowEditModal]);

  return (
    <Modal
      width={500}
      className="temp-group-edit-modal"
      title={title ? title : '创建临时组'}
      visible={isShowEditModal}
      onCancel={editTempGroupCancel}
      footer={null}
      destroyOnClose={true}
    >
      <Form form={form} onFinish={onFinish} autoComplete="off" initialValues={{
        radius,
        gender: [1, 2],
        ageRange: [20, 40]
      }}>
        {
          !byCondition ? null : (
            <>
              <Row className="inter-plat-row-text">请根据条件搜索监控对象</Row>
              <Form.Item
                label="人员技能"
                name="skillIds"
                className="select"
              >
                <Select
                  mode="multiple"
                  allowClear={true}
                  placeholder="请选择人员技能"
                  dropdownClassName="inter-plat-dropdown task-operation-modal-select"
                  showSearch
                  optionFilterProp="children">
                  <Select.Option value={1}>1</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="对讲机型"
                name="intercomModelIds"
                className="select"
              >
                <Select
                  mode="multiple"
                  allowClear={true}
                  placeholder="请选择对讲机型"
                  dropdownClassName="inter-plat-dropdown task-operation-modal-select"
                  showSearch
                  optionFilterProp="children">
                  <Select.Option value={1}>1</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="驾照类别"
                name="driverLicenseCategoryIds"
                className="select"
              >
                <Select
                  mode="multiple"
                  allowClear={true}
                  placeholder="请选择驾照类别"
                  dropdownClassName="inter-plat-dropdown task-operation-modal-select"
                  showSearch
                  optionFilterProp="children">
                  <Select.Option value={1}>1</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="资格证书"
                name="qualificationIds"
                className="select"
              >
                <Select
                  mode="multiple"
                  allowClear={true}
                  placeholder="请选择资格证书"
                  dropdownClassName="inter-plat-dropdown task-operation-modal-select"
                  showSearch
                  optionFilterProp="children">
                  <Select.Option value={1}>1</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="血型"
                name="bloodTypeIds"
                className="select"
              >
                <Select
                  mode="multiple"
                  allowClear={true}
                  placeholder="请选择血型"
                  dropdownClassName="inter-plat-dropdown task-operation-modal-select"
                  showSearch
                  optionFilterProp="children">
                  <Select.Option value={1}>1</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="性别"
                name="gender"
                className="radio"
                rules={[{required: true, message: '请选择性别'}]}
              >
                <Checkbox.Group>
                  <Checkbox value={1}>男</Checkbox>
                  <Checkbox value={2}>女</Checkbox>
                </Checkbox.Group>
              </Form.Item>
              <Form.Item
                label="年龄范围"
                name="ageRange"
                className="radio"
              >
                <Slider range={true} />
              </Form.Item>
              <Form.Item
                label="半径（m）"
                name="radius"
                rules={[{required: true, message: '请输入半径'}]}
                className="input"
              >
                <Input type="text" placeholder="请输入半径" />
              </Form.Item>
              <Row justify="end" className="temp-group-edit-modal-row bottom-line">
                <Button size="small" type="primary" loading={loading}>搜 索</Button>
                <Button size="small" type="primary" onClick={editTempGroupCancel}>重 置</Button>
              </Row>
              <Row className="inter-plat-row-text">{title ? title : '创建临时组'}</Row>
            </>
          )
        }
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
                      (getFieldValue('entities') || []).length ?
                        (getFieldValue('entities') || []).map((entity: IEntity, index: number) => (
                          <Checkbox key={`temp-group-edit-modal-entity-${index}`} value={entity.userId}>
                            {entity.monitorName}
                          </Checkbox>
                        )) :
                        '暂无监控对象数据'
                    }
                  </Checkbox.Group>
                </Form.Item>
              </Form.Item>
            );
          }}
        </Form.Item>
        <Row justify="end" className="temp-group-edit-modal-row">
          <Button size="small" type="primary" htmlType="submit" loading={loading} disabled={byCondition}>提 交</Button>
          <Button size="small" type="primary" onClick={editTempGroupCancel}>取 消</Button>
        </Row>
      </Form>
    </Modal>
  );
};

export default EditTemporaryGroup;
