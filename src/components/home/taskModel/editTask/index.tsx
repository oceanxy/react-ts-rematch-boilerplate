/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 编辑任务
 * @Date: 2020-04-15 周三 16:01:46
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-15 周三 16:01:46
 */

import config from '@/config';
import {
  DateDuplicateType,
  dateDuplicateTypeText,
  TaskLevel,
  taskLevelText,
  TaskPeriod,
  taskPeriodText
} from '@/models/home/taskModel/taskDetails';
import styledBlocks from '@/styled/styledBlocks';
import { Button, Checkbox, DatePicker, Form, Input, message, Modal, Radio, Row, Select } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './index.scss';

// 格式化时间的格式
const dateFormat = 'YYYY-MM-DD HH:mm:ss';

/**
 * 编辑任务组件Props
 */
interface IEditTaskProps extends Modal {
  data: ITaskDetailsState['data']
  events: IEventListState['data']
  isShowModal: IEditTaskState['isShowModal']
  showModal: IEditTaskModel['effects']['showModal']
  updateRemoteTask: IEditTaskModel['effects']['updateRemoteTask']
}

/**
 * 被styled-component包装后的antd Modal组件
 * @type {any}
 */
const StyledModal = styled(Modal)(styledBlocks.containerTheme);

/**
 * 编辑任务组件
 * @param {Partial<IEditTaskProps>} props
 * @returns {any}
 * @constructor
 */
const EditTask = (props: Partial<IEditTaskProps>) => {
  const {showModal, updateRemoteTask, data, isShowModal} = props;
  /**
   * 提交修改按钮的loading状态
   */
  const [loading, setLoading] = useState(false);
  // 关联事件下拉列表数据源
  let events = config.mock ?
    data?.events.concat(props.events!) ?? [] :
    data?.events ?? [];
  /**
   * antd hooks
   */
  const [form] = Form.useForm();

  /**
   * 提交表单
   * @param values
   * @returns {Promise<void>}
   */
  const onFinish = async (values: any) => {
    values.taskId = data?.taskId;
    values.startTime = values.taskTime[0].format(dateFormat);
    values.endTime = values.taskTime[1].format(dateFormat);
    values.designateMonitorIds = data?.executors.map((entity) => entity.monitorId) ?? [];
    delete values.taskTime;

    setLoading(true);
    const response = await updateRemoteTask!(values as IEditTaskRequest);
    setLoading(false);
    showModal!(false);

    if (!Number(response.retCode)) {
      message.info('修改成功');
    } else {
      message.info('修改失败，请稍后再试。');
    }
  };

  /**
   * 取消编辑
   */
  const editTaskCancel = () => {
    showModal!(false);
  };

  /**
   * 任务周期change事件
   * @param {RadioChangeEvent} e
   */
  const radioChange = (e: RadioChangeEvent) => {
    if (e.target.value === TaskPeriod.Timing) {
      form.setFieldsValue({taskPeriod: TaskPeriod.Timing});
    } else {
      form.setFieldsValue({taskPeriod: TaskPeriod.Immediate});
    }
  };

  useEffect(() => {
    // 处理数据
    const eventIds = data?.events.map((event) => event.eventId) ?? [];
    const designateMonitorIds = data?.executors.map((entity) => entity.monitorId) ?? [];
    const dateDuplicateType = data?.dateDuplicateType.split(',').reduce(
      (str, cur) => {
        str.push(Number(cur));
        return str;
      },
      [] as DateDuplicateType[]
    ) ?? [];

    form.setFieldsValue({
      designateMonitorIds,
      eventIds,
      dateDuplicateType,
      taskName: data?.taskName!,
      taskTime: [moment(data?.startTime!, dateFormat), moment(data?.endTime!, dateFormat)],
      taskAddress: data?.address!,
      taskPeriod: data?.taskPeriod!,
      remark: data?.remark!,
      taskId: data?.taskId!,
      taskLevel: data?.taskLevel!
    });
  }, []);

  return (
    <StyledModal
      conTheme="style1"
      width={500}
      className="task-operation-modal"
      title="修改任务"
      visible={isShowModal}
      onCancel={editTaskCancel}
      footer={null}
      maskClosable={false}
      getContainer={false}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          label="任务名称"
          name="taskName"
          rules={[{required: true, message: '请输入任务名称'}]}
          className="input"
        >
          <Input type="text" placeholder="请输入任务名称" />
        </Form.Item>
        <Form.Item label="关联事件" name="eventIds" rules={[{required: true, message: '请选择任务关联的事件'}]}>
          <Select
            mode="multiple"
            allowClear={true}
            placeholder="请选择任务关联的事件"
            dropdownClassName="inter-plat-dropdown task-operation-modal-select"
            showSearch
            optionFilterProp="children"
          >
            {
              events?.map((event, i) => {
                return (
                  <Select.Option key={`task-operation-modal-eventId-${i}`} value={event.eventId}>
                    {event.eventName}
                  </Select.Option>
                );
              })
            }
          </Select>
        </Form.Item>
        <Form.Item
          label="任务等级"
          name="taskLevel"
          rules={[{required: true, message: '请选择任务等级'}]}
          className="radio"
        >
          <Radio.Group>
            <Radio value={TaskLevel.General}>{taskLevelText[TaskLevel.General]}</Radio>
            <Radio value={TaskLevel.Important}>{taskLevelText[TaskLevel.Important]}</Radio>
            <Radio value={TaskLevel.Urgent}>{taskLevelText[TaskLevel.Urgent]}</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="任务时间" name="taskTime" rules={[{required: true, message: '请选择任务时间'}]}>
          <DatePicker.RangePicker
            locale={locale}
            ranges={{
              今日: [moment(), moment()],
              本月: [moment().startOf('month'), moment().endOf('month')]
            }}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            dropdownClassName="inter-plat-picker-dropdown task-operation-modal-picker"
          />
        </Form.Item>
        <Form.Item
          label="任务地址"
          name="taskAddress"
          rules={[{required: true, message: '请输入任务地址'}]}
          className="input"
        >
          <Input type="text" placeholder="请输入任务地址" />
        </Form.Item>
        <Form.Item
          label="任务周期"
          rules={[{required: true, message: '请选择任务周期'}]}
          className="radio radio-require"
        >
          <Form.Item name="taskPeriod" rules={[{required: true, message: '请选择任务周期'}]}>
            <Radio.Group onChange={radioChange}>
              <Radio value={TaskPeriod.Immediate}>{taskPeriodText[TaskPeriod.Immediate]}</Radio>
              <Radio value={TaskPeriod.Timing}>{taskPeriodText[TaskPeriod.Timing]}</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.taskPeriod !== currentValues.taskPeriod}
          >
            {({getFieldValue}) => {
              return getFieldValue('taskPeriod') === TaskPeriod.Timing ? (
                <Form.Item
                  name="dateDuplicateType"
                  rules={[{required: true, message: '请勾选定时任务的具体时间'}]}
                  className="checkbox"
                >
                  <Checkbox.Group>
                    <Checkbox value={DateDuplicateType.Monday}>
                      {dateDuplicateTypeText[DateDuplicateType.Monday]}
                    </Checkbox>
                    <Checkbox value={DateDuplicateType.Tuesday}>
                      {dateDuplicateTypeText[DateDuplicateType.Tuesday]}
                    </Checkbox>
                    <Checkbox value={DateDuplicateType.Wednesday}>
                      {dateDuplicateTypeText[DateDuplicateType.Wednesday]}
                    </Checkbox>
                    <Checkbox value={DateDuplicateType.Thursday}>
                      {dateDuplicateTypeText[DateDuplicateType.Thursday]}
                    </Checkbox>
                    <Checkbox value={DateDuplicateType.Friday}>
                      {dateDuplicateTypeText[DateDuplicateType.Friday]}
                    </Checkbox>
                    <Checkbox value={DateDuplicateType.Saturday}>
                      {dateDuplicateTypeText[DateDuplicateType.Saturday]}
                    </Checkbox>
                    <Checkbox value={DateDuplicateType.Sunday}>
                      {dateDuplicateTypeText[DateDuplicateType.Sunday]}
                    </Checkbox>
                  </Checkbox.Group>
                </Form.Item>
              ) : null;
            }}
          </Form.Item>
        </Form.Item>
        <Form.Item
          label="任务描述"
          name="remark"
          rules={[{required: true, message: '请输入任务描述'}]}
          className="input"
        >
          <Input.TextArea placeholder="请输入任务描述" rows={3} />
        </Form.Item>
        <Row justify="end" className="task-operation-modal-row">
          <Button size="small" type="primary" htmlType="submit" loading={loading}>提 交</Button>
          <Button size="small" type="primary" onClick={editTaskCancel}>取 消</Button>
        </Row>
      </Form>
    </StyledModal>
  );
};

export default EditTask;
