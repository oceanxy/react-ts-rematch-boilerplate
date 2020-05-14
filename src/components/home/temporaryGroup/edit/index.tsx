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
import { Button, Checkbox, Form, Input, message, Row, Select, Slider } from 'antd';
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
  const {fetchFixedData, fetchDataByCircle, fetchConditionData, fetchConditionForEntity} = entityDispatch!;
  const {isShowEditModal, title, loading, backFillInfo: {name, radius}} = state!;

  // 避免不必要的渲染
  if (!isShowEditModal) return null;

  const [searchForm] = Form.useForm();
  const [createForm] = Form.useForm();
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
  // 搜索按钮loading状态
  const [searchLoading, setSearchLoading] = useState(false);
  // 创建临时组提交按钮禁用状态，初始值以byCondition（是否是按固定条件创建）为准
  const [createButtonDisabled, setCreateButtonDisabled] = useState(byCondition);

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
   * 搜索实体数据并处理得到结果后的逻辑
   * @param values
   * @returns {Promise<void>}
   */
  const handleSearchEntity = async (values: any) => {
    setSearchLoading(true);
    const response = await fetchConditionData!({
      ...values
    });
    setSearchLoading(false);

    if (+response.retCode === 0) {
      const {monitors} = response.data;

      // 临时保存获取到的实体列表（主要用于全选/反选功能）
      setTempEntities(monitors);
      // 设置提交临时组按钮的禁用状态
      setCreateButtonDisabled(false);
      // 设置antd form表单的内置状态（渲染实体数据到表单上）
      createForm.setFieldsValue({
        entities: monitors
      });
    } else {
      message.error('搜索监控对象时发生错误，请稍后重试！');
      setCreateButtonDisabled(true);
      setTempEntities([]);
    }
  };

  /**
   * 按固定条件创建时，重置搜索监控对象列表
   */
  const resetSearchForm = () => {
    searchForm.setFieldsValue({
      gender: [1, 2],
      ageRange: [20, 40],
      radius,
      skillIds: undefined,
      intercomModelIds: undefined,
      driverLicenseCategoryIds: undefined,
      qualificationIds: undefined,
      bloodTypeIds: undefined
    });
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
    createForm.setFieldsValue({
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
    const curCheckedEntities = createForm.getFieldValue('interlocutorIds');
    const invertCheckedEntities = allCheckedEntities.reduce((invertCheckedEntities, userId) => {
      if (!curCheckedEntities.includes(userId)) {
        invertCheckedEntities.push(userId!);
      }

      return invertCheckedEntities;
    }, [] as number[]);

    createForm.setFieldsValue({
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
        if (!byCondition) {
          let response: any;

          if (mouseToolType === MouseToolType.Circle) {
            // 获取地图已圈选范围内的所有实体（监控对象）数据
            response = await fetchDataByCircle();
          } else if (mouseToolType === MouseToolType.Null) {
            response = await fetchFixedData();
          }

          const {monitors} = (response as APIResponse<{monitors: IEntity[]}>).data;

          // 临时保存获取到的实体列表（主要用于全选/反选功能）
          setTempEntities(monitors);

          if (response.retCode === 0) {
            // 将实体数据回填到antd form上
            createForm.setFieldsValue({
              temporaryGroup: name,
              entities: monitors,
              interlocutorIds: []
            });
          }

          // 设置全选、反选复选框的状态
          listenersCheck([]);
        } else {
          setSearchLoading(true);
          const response = await fetchConditionForEntity();
          setSearchLoading(false);

          if (+response.retCode === 0) {
            searchForm.setFieldsValue(response.data);
          } else {
            message.error('初始化条件列表失败！');
            editTempGroupCancel();
          }
        }
      })();
    }
  }, [isShowEditModal]);

  return (
    <Modal
      width={530}
      className="temp-group-edit-modal"
      title={title ? title : '创建临时组'}
      visible={isShowEditModal}
      onCancel={editTempGroupCancel}
      footer={null}
      destroyOnClose={true}
    >
      <>
        {
          !byCondition ? null : (
            <Form form={searchForm} onFinish={handleSearchEntity} autoComplete="off" initialValues={{
              radius,
              gender: [1, 2],
              ageRange: [20, 40]
            }}>
              <Row className="inter-plat-row-text">请根据条件搜索监控对象</Row>
              <Form.Item
                noStyle={true}
                shouldUpdate={(prev, cur) => prev.skillList !== cur.skillList}
              >
                {({getFieldValue}) => (
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
                      optionFilterProp="children"
                    >
                      {
                        (getFieldValue('skillList') || []).map((skill: ICondition) => (
                          <Select.Option
                            key={`inter-plat-dropdown-temp-group-skill-${skill.id}`}
                            value={skill.id}
                            title={`技能类别：${skill.skillCategoryName}\n技能：${skill.skillName}`}
                          >
                            <span style={{color: '#686868'}}>（{skill.skillCategoryName}）</span>
                            {skill.skillName}
                          </Select.Option>
                        ))
                      }
                    </Select>
                  </Form.Item>
                )}
              </Form.Item>
              <Form.Item
                noStyle={true}
                shouldUpdate={(prev, cur) => prev.intercomModelList !== cur.intercomModelList}
              >
                {({getFieldValue}) => (
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
                      optionFilterProp="children"
                    >
                      {
                        (getFieldValue('intercomModelList') || []).map((intercomModel: ICondition) => (
                          <Select.Option
                            key={`inter-plat-dropdown-temp-group-intercom-model-${intercomModel.id}`}
                            value={intercomModel.id}
                            title={intercomModel.name}
                          >
                            {intercomModel.name}
                          </Select.Option>
                        ))
                      }
                    </Select>
                  </Form.Item>
                )}
              </Form.Item>
              <Form.Item
                noStyle={true}
                shouldUpdate={(prev, cur) => prev.driverLicenseCategoryList !== cur.driverLicenseCategoryList}
              >
                {({getFieldValue}) => (
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
                      optionFilterProp="children"
                    >
                      {
                        (getFieldValue('driverLicenseCategoryList') || []).map((dlc: ICondition) => (
                          <Select.Option
                            key={`inter-plat-dropdown-temp-group-dlc-${dlc.id}`}
                            value={dlc.id}
                            title={dlc.name}
                          >
                            {dlc.name}
                          </Select.Option>
                        ))
                      }
                    </Select>
                  </Form.Item>
                )}
              </Form.Item>
              <Form.Item
                noStyle={true}
                shouldUpdate={(prev, cur) => prev.qualificationList !== cur.qualificationList}
              >
                {({getFieldValue}) => (
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
                      optionFilterProp="children"
                    >
                      {
                        (getFieldValue('qualificationList') || []).map((qualification: ICondition) => (
                          <Select.Option
                            key={`inter-plat-dropdown-temp-group-qualification-${qualification.id}`}
                            value={qualification.id}
                            title={qualification.name}
                          >
                            {qualification.name}
                          </Select.Option>
                        ))
                      }
                    </Select>
                  </Form.Item>
                )}
              </Form.Item>
              <Form.Item
                noStyle={true}
                shouldUpdate={(prev, cur) => prev.bloodTypeList !== cur.bloodTypeList}
              >
                {({getFieldValue}) => (
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
                      optionFilterProp="children"
                    >
                      {
                        (getFieldValue('bloodTypeList') || []).map((bloodType: ICondition) => (
                          <Select.Option
                            key={`inter-plat-dropdown-temp-group-blood-type-${bloodType.id}`}
                            value={bloodType.id}
                            title={bloodType.name}
                          >
                            {bloodType.name}
                          </Select.Option>
                        ))
                      }
                    </Select>
                  </Form.Item>
                )}
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
                className="slider"
                rules={[{required: true, message: '请选择年龄范围'}]}
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
                <Button size="small" type="primary" htmlType="submit" loading={searchLoading}>搜 索</Button>
                <Button size="small" type="primary" onClick={resetSearchForm}>重 置</Button>
              </Row>
              <Row className="inter-plat-row-text">{title ? title : '创建临时组'}</Row>
            </Form>
          )
        }
        <Form form={createForm} onFinish={onFinish} autoComplete="off">
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
                  <Form.Item
                    name="interlocutorIds"
                    rules={[{required: true, message: '请勾选加入临时组的监控对象'}]}
                    className="checkbox-entity-content"
                  >
                    {
                      (getFieldValue('entities') || []).length ?
                        (
                          <Checkbox.Group onChange={listenersCheck}>
                            {
                              getFieldValue('entities').map((entity: IEntity) => (
                                <Checkbox
                                  key={`temp-group-edit-modal-entity-${entity.userId}`}
                                  value={entity.userId}
                                >
                                  {entity.monitorName}
                                </Checkbox>
                              ))
                            }
                          </Checkbox.Group>
                        ) :
                        <span>暂无监控对象数据</span>
                    }
                  </Form.Item>
                </Form.Item>
              );
            }}
          </Form.Item>
          <Row justify="end" className="temp-group-edit-modal-row">
            <Button
              size="small"
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={createButtonDisabled}
            >提 交</Button>
            <Button
              size="small"
              type="primary"
              onClick={editTempGroupCancel}
            >取 消</Button>
          </Row>
        </Form>
      </>
    </Modal>
  );
};

export default EditTemporaryGroup;
