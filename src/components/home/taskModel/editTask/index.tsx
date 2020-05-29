/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 编辑任务
 * @Date: 2020-04-15 周三 16:01:46
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-29 周五 12:02:37
 */

import config from '@/config';
import { EventStatisticsMethod } from '@/models/home/eventModel/eventDetails';
import {
  DateDuplicateType,
  dateDuplicateTypeText,
  TaskLevel,
  taskLevelText,
  TaskPeriod,
  taskPeriodText
} from '@/models/home/taskModel/taskDetails';
import styledBlocks from '@/styled/styledBlocks';
import { Button, Checkbox, DatePicker, Form, Input, message, Modal, Radio, Row, Select, Spin } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import _ from 'lodash';
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
  fetchDataForSelect: IEventListModel['effects']['fetchDataForSelect']
  fetchEventListData: IEventListModel['effects']['fetchData']
  fetchEventDetailsData: IEventDetailsModel['effects']['fetchData']
  setEventStatisticsState: IEventStatisticsModel['effects']['setState']
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
  const {
    showModal, updateRemoteTask, data, isShowModal, setEventStatisticsState,
    fetchDataForSelect, fetchEventDetailsData, fetchEventListData
  } = props;
  /**
   * 提交修改按钮的loading状态
   */
  const [loading, setLoading] = useState(false);
  // 表单loading状态
  const [formLoading, setFormLoading] = useState(true);
  // 关联事件下拉列表当前选中的ID数组。用此状态来管理关联事件下拉列表选中的第一个值变化后，更新任务地址文本框
  const [selectedEventIds, setSelectedEventIds] = useState(null as string[] | null);
  /**
   * 关联事件下拉列表数据缓存
   */
  const [eventSelectData, setEventSelectData] = useState([] as IEvent[]);
  /**
   * antd hooks
   */
  const [form] = Form.useForm();
  // 表单校验规则
  const validateMessages = {
    required: '${label}为必填项！',
    string: {
      max: '请输入${max}个以内的字符'
    }
  };

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

      // 刷新事件列表
      fetchEventListData!();
      setEventStatisticsState!({eventStatisticsMethod: EventStatisticsMethod.ALL});
    } else {
      message.info('修改失败，请稍后再试。');
    }
  };

  /**
   * 处理关联事件下拉列表change事件
   * @param {IEvent["eventId"][]} ids
   * @param options
   * @returns {Promise<void>}
   */
  const handleEventChange = async (ids: IEvent['eventId'][], options: any) => {
    const temp = ids?.[0];

    if (!temp) {
      form.setFieldsValue({taskAddress: ''});
    } else if (temp !== selectedEventIds![0]) {
      setSelectedEventIds(ids);
      setFormLoading(true);
      // 根据关联事件下拉列表的第一个值去请求该事件的详情数据，然后回填到任务地址文本框
      const details: IEventDetailsData = await fetchEventDetailsData!({
        updateEventDetails: false,
        monitorId: options[0].monitorid,
        eventType: options[0].eventtype,
        startTime: options[0].starttime
      });

      form.setFieldsValue({taskAddress: details.eventEndAddress});
      setFormLoading(false);
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

  // 获取关联事件下拉列表数据
  useEffect(() => {
    (async () => {
      setFormLoading(true);
      const response = await fetchDataForSelect!();
      setFormLoading(false);

      if (+response.retCode === 0) {
        const tempEventSelectData = response.data?.eventList || [];

        form.setFieldsValue({eventSelectData: tempEventSelectData});
        setEventSelectData(tempEventSelectData);
      } else {
        message.error('获取关联事件数据失败！');
      }
    })();
  }, []);

  // 准备表单回填数据
  useEffect(() => {
    if (!formLoading && !selectedEventIds) {
      const eventIds = data?.events.map((event) => event.eventId) ?? [];
      const designateMonitorIds = data?.executors.map((entity) => entity.monitorId) ?? [];
      const dateDuplicateType = (data?.dateDuplicateType || '').split(',').reduce((str, cur) => {
          str.push(Number(cur));
          return str;
        },
        [] as DateDuplicateType[]
      ) ?? [];

      // 设置当前关联事件下拉列表选中的事件ID
      setSelectedEventIds(eventIds);

      // 设置antd表单回填值
      form.setFieldsValue({
        designateMonitorIds,
        eventIds,
        dateDuplicateType,
        taskName: data?.taskName!,
        taskTime: [moment(data?.startTime!, dateFormat), moment(data?.endTime!, dateFormat)],
        taskAddress: data?.address!,
        taskPeriod: data?.taskPeriod!,
        description: data?.description!,
        taskId: data?.taskId!,
        taskLevel: +data?.taskLevel!
      });
    }
  }, [formLoading]);

  // 处理关联事件下拉框不符合条件的回填数据
  useEffect(() => {
    if (eventSelectData && eventSelectData.length) {
      // 获取当前关联事件下拉列表的值
      const eventSelectData = form.getFieldValue('eventSelectData');
      // 临时缓存ID
      const tempEventIds: string[] = [];

      // 检测已关联的事件ID是否存在于下拉别表中，不存在则删除掉
      selectedEventIds?.forEach((eventId) => {
        const index = _.findIndex(eventSelectData, (value: IEvent) => value.eventId === eventId);
        if (index !== -1) {
          tempEventIds.push(eventId);
        }
      });

      form.setFieldsValue({
        eventIds: tempEventIds
      });
    }
  }, [eventSelectData]);

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
      <Spin spinning={formLoading}>
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{
            /**
             * 关联事件字段下拉列表数据
             * mock数据时直接采用事件列表的数据加上任务详情绑定的事件
             */
            eventSelectData: config.mock ?
              data?.events.concat(props.events!) ?? [] :
              []
          }}
          validateMessages={validateMessages}
        >
          <Form.Item
            label="任务名称"
            name="taskName"
            rules={[
              {required: true},
              {
                pattern: /^[a-zA-Z\u4e00-\u9fa50-9-]{1,10}$/,
                message: '请输入10个字符以内的中文、字母、数字或中划线'
              }
            ]}
            className="input"
          >
            <Input type="text" placeholder="请输入任务名称" autoComplete="off" allowClear={true} />
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prev, cur) => prev.eventSelectData !== cur.eventSelectData}
          >
            {({getFieldValue}) => (
              <Form.Item
                label="关联事件"
                name="eventIds"
                rules={[{required: true, message: '请选择任务关联的事件'}]}
              >
                <Select
                  mode="multiple"
                  allowClear={true}
                  placeholder="请选择任务关联的事件"
                  dropdownClassName="inter-plat-dropdown task-operation-modal-select"
                  showSearch
                  optionFilterProp="children"
                  onChange={handleEventChange}
                >
                  {
                    getFieldValue('eventSelectData').map((event: IEvent) => {
                      return (
                        <Select.Option
                          key={`task-operation-modal-eventId-${event.eventId}`}
                          value={event.eventId}
                          starttime={event.startTime}
                          monitorid={event.monitorId}
                          eventtype={event.eventType}
                        >
                          <div
                            className="task-operation-modal-item"
                            title={`事件名称：${event.eventName}\n监控对象：${event.monitorName}`}
                          >
                            {event.eventName} {`（${event.monitorName}）`}
                          </div>
                        </Select.Option>
                      );
                    })
                  }
                </Select>
              </Form.Item>
            )}
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
            className="input"
            rules={[
              {required: true, message: '请输入任务地址'},
              {type: 'string', max: 50}
            ]}
          >
            <Input type="text" placeholder="请输入任务地址" autoComplete="off" allowClear={true} />
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
            name="description"
            className="input"
            rules={[{type: 'string', max: 50}]}
          >
            <Input.TextArea placeholder="请输入任务描述" rows={3} allowClear={true} />
          </Form.Item>
          <Row justify="end" className="modal-row">
            <Button size="small" type="primary" htmlType="submit" loading={loading}>提 交</Button>
            <Button size="small" type="primary" onClick={editTaskCancel}>取 消</Button>
          </Row>
        </Form>
      </Spin>
    </StyledModal>
  );
};

export default EditTask;
