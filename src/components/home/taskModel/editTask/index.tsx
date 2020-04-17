/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 编辑任务
 * @Date: 2020-04-15 周三 16:01:46
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-15 周三 16:01:46
 */

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
import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import './index.scss';

/**
 * 编辑任务组件Props
 */
interface IEditTaskProps extends Modal {
  data: ITaskDetailsState['data'];
  isShowModal: IEditTaskState['isShowModal'];
  showModal: IEditTaskModel['effects']['showModal'];
  updateTask: IEditTaskModel['effects']['updateTask'];
  getEventIds: IEditTaskModel['effects']['getEventIds'];
  getEntityIds: IEditTaskModel['effects']['getEntityIds'];
}

/**
 * 被styled-component包装后的antd Modal组件
 * @type {any}
 */
const StyledModal = styled(Modal)(styledBlocks.containerTheme);

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const handleChange = (value: any) => {
  console.log(`selected ${value}`);
};

const onChange = (dates: any, dateStrings: any) => {
  console.log('From: ', dates[0], ', to: ', dates[1]);
  console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
};

/**
 * 任务周期change事件
 * @param {React.Dispatch<React.SetStateAction<boolean>>} showTimingCheckbox
 * @param {RadioChangeEvent} e
 */
const radioChange = (showTimingCheckbox: Dispatch<SetStateAction<boolean>>, e: RadioChangeEvent) => {
  if (e.target.value === TaskPeriod.Timing) {
    showTimingCheckbox(true);
  } else {
    showTimingCheckbox(false);
  }
};

/**
 * 编辑任务组件
 * @param {Partial<IEditTaskProps>} props
 * @returns {any}
 * @constructor
 */
const EditTask = (props: Partial<IEditTaskProps>) => {
  const { isShowModal, showModal, updateTask, data, getEventIds, getEntityIds } = props;
  /**
   * 定时任务周期下的复选框组件显示状态
   */
  const [isShowTimingCheckbox, showTimingCheckbox] = useState(false);

  const editTaskOK = async () => {
    const response = await updateTask!({} as ITask);

    showModal!(false);
    if (Number(response.retCode) === 0) {
      message.info('修改成功');
    } else {
      message.info('修改失败，请稍后再试。');
    }
  };

  const editTaskCancel = () => {
    showModal!(false);
  };

  /**
   * 表单默认值
   * @type {{dateDuplicateType: string; taskPeriod: ; taskLevel: TaskLevel; taskName: string; startTime: Date; remark: string; designateMonitorIds: IEntity["monitorId"][]; endTime: Date; eventIds: IEvent["eventId"][]; taskId: string; taskAddress: string}}
   */
  const formInitialValues = {
    taskName: data?.taskName!,
    eventIds: (async () => await getEventIds!(data?.events!))()
    // startTime: data?.startTime!,
    // endTime: data?.endTime!,
    // taskAddress: data?.address!,
    // taskPeriod: data?.taskPeriod!,
    // dateDuplicateType: data?.dateDuplicateType!,
    // remark: data?.remark!,
    // designateMonitorIds: getEntityIds!(data?.executors!),
    // taskId: data?.taskId!,
    // taskLevel: data?.taskLevel!
  };

  debugger;

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
    >
      <Form initialValues={formInitialValues} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item
          label="任务名称"
          name="taskName"
          rules={[{ required: true, message: '请输入任务名称' }]}
          className="input"
        >
          <Input type="text" placeholder="请输入任务名称" />
        </Form.Item>
        <Form.Item label="关联事件" name="eventIds" rules={[{ required: true, message: '请选择任务关联的事件' }]}>
          <Select
            mode="multiple"
            allowClear={true}
            placeholder="请选择任务关联的事件"
            onChange={handleChange}
            dropdownClassName="inter-plat-dropdown task-operation-modal-select"
            showSearch
            optionFilterProp="children"
          >
            {data?.events.map((event, i) => {
              return (
                <Select.Option key={`task-operation-modal-eventId-${i}`} value={event.eventId}>
                  {event.eventName}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="任务等级"
          name="taskLevel"
          rules={[{ required: true, message: '请选择任务等级' }]}
          className="radio"
        >
          <Radio.Group>
            <Radio value={TaskLevel.General}>{taskLevelText[TaskLevel.General]}</Radio>
            <Radio value={TaskLevel.Important}>{taskLevelText[TaskLevel.Important]}</Radio>
            <Radio value={TaskLevel.Urgent}>{taskLevelText[TaskLevel.Urgent]}</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="任务时间" name="taskLevel" rules={[{ required: true, message: '请选择任务等级' }]}>
          <DatePicker.RangePicker
            locale={locale}
            ranges={{
              今日: [moment(), moment()],
              本月: [moment().startOf('month'), moment().endOf('month')]
            }}
            showTime
            format="YYYY/MM/DD HH:mm:ss"
            onChange={onChange}
            dropdownClassName="inter-plat-picker-dropdown task-operation-modal-picker"
          />
        </Form.Item>
        <Form.Item
          label="任务地址"
          name="taskAddress"
          rules={[{ required: true, message: '请输入任务地址' }]}
          className="input"
        >
          <Input type="text" placeholder="请输入任务地址" />
        </Form.Item>
        <Form.Item
          label="任务周期"
          rules={[{ required: true, message: '请选择任务周期' }]}
          className="radio radio-require"
        >
          <Form.Item name="taskPeriod" rules={[{ required: true, message: '请选择任务周期' }]}>
            <Radio.Group onChange={radioChange.bind(null, showTimingCheckbox)}>
              <Radio value={TaskPeriod.Immediate}>{taskPeriodText[TaskPeriod.Immediate]}</Radio>
              <Radio value={TaskPeriod.Timing}>{taskPeriodText[TaskPeriod.Timing]}</Radio>
            </Radio.Group>
          </Form.Item>
          {isShowTimingCheckbox ? (
            <Form.Item
              name="dateDuplicateType"
              rules={[{ required: true, message: '请勾选定时任务的具体时间' }]}
              className="checkbox"
            >
              <Checkbox.Group>
                <Checkbox value={DateDuplicateType.Monday}>{dateDuplicateTypeText[DateDuplicateType.Monday]}</Checkbox>
                <Checkbox value={DateDuplicateType.Tuesday}>
                  {dateDuplicateTypeText[DateDuplicateType.Tuesday]}
                </Checkbox>
                <Checkbox value={DateDuplicateType.Wednesday}>
                  {dateDuplicateTypeText[DateDuplicateType.Wednesday]}
                </Checkbox>
                <Checkbox value={DateDuplicateType.Thursday}>
                  {dateDuplicateTypeText[DateDuplicateType.Thursday]}
                </Checkbox>
                <Checkbox value={DateDuplicateType.Friday}>{dateDuplicateTypeText[DateDuplicateType.Friday]}</Checkbox>
                <Checkbox value={DateDuplicateType.Saturday}>
                  {dateDuplicateTypeText[DateDuplicateType.Saturday]}
                </Checkbox>
                <Checkbox value={DateDuplicateType.Sunday}>{dateDuplicateTypeText[DateDuplicateType.Sunday]}</Checkbox>
              </Checkbox.Group>
            </Form.Item>
          ) : null}
        </Form.Item>
        <Form.Item
          label="任务描述"
          name="remark"
          rules={[{ required: true, message: '请输入任务描述' }]}
          className="input"
        >
          <Input type="text" placeholder="请输入任务描述" />
        </Form.Item>
        <Row justify="end" className="task-operation-modal-row">
          <Button size="small" type="primary" htmlType="submit">
            提 交
          </Button>
          <Button size="small" type="primary" onClick={editTaskCancel}>
            取 消
          </Button>
        </Row>
      </Form>
    </StyledModal>
  );
};

export default EditTask;
