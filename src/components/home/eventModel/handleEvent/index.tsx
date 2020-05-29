/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 处理事件弹窗组件
 * @Date: 2020-05-07 周四 09:30:30
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-28 周四 11:32:58
 */

import Modal from '@/components/UI/modal';
import { EventStatisticsMethod } from '@/models/home/eventModel/eventDetails';
import { Button, Form, Input, message, Radio, Row } from 'antd';
import RadioGroup from 'antd/es/radio/group';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import React, { MouseEvent, useState } from 'react';
import './index.scss';

/**
 * 处理事件组件Render Props
 */
interface HandleEventProps {
  /**
   * 处理事件对话框框显示状态
   */
  visible: boolean
  /**
   * 处理事件接口
   */
  handleEvent?: IHandleEventModel['effects']['handleEvent']
  /**
   * 当前海量点窗体承载的信息
   */
  curMassPointInfo?: InfoWindowResponse
  /**
   * 当前选中的事件信息对象
   */
  curSelectedEvent?: IEventListState['curSelectedEvent']
  /**
   * 获取事件列表数据
   */
  fetchEventListData?: IEventListModel['effects']['fetchData']
  setEventStatisticsState?: IEventStatisticsModel['effects']['setState']

  /**
   * 设置处理事件对话框状态，海量点组件传递过来的函数
   * @param {boolean} visible
   */
  setIsShowModal(visible: boolean): void
}

/**
 * 处理事件表单Props
 */
interface HandleEventFormProps {
  /**
   * 处理方式 0：批量全部处理 1：单条处理
   */
  handleMethod: 0 | 1
  /**
   * 处理信息
   */
  description: string
}

/**
 * 处理事件组件
 * @param {HandleEventProps} props
 * @returns {any}
 * @constructor
 */
const HandleEvent = (props: HandleEventProps) => {
  const {
    visible, setIsShowModal, handleEvent, curMassPointInfo,
    fetchEventListData, curSelectedEvent, setEventStatisticsState
  } = props;
  /**
   * 批量全部处理的loading状态
   */
  const [loading, setLoading] = useState(false);
  /**
   * 处理单条事件时，文本域和按钮loading和disabled状态
   */
  const [singleState, setSingleState] = useState({} as {[key: string]: {loading?: boolean, disabled?: boolean}});
  /**
   * 当前正在处理的单条事件对象
   */
  const [singleCurEvent, setSingleCurEvent] = useState({} as IEvent);
  const [form] = Form.useForm();

  /**
   * 提交表单处理事件
   * @param values 处理事件
   * @returns {Promise<void>}
   */
  const onFinish = async (values: any) => {
    let response: any;

    // 处理事件列表的事件弹窗
    if (curSelectedEvent?.eventId) {
      setLoading(true);

      response = await handleEvent!({
        monitorId: curMassPointInfo!.monitor.monitorId,
        description: values.description,
        eventType: curSelectedEvent.eventType,
        startTime: curSelectedEvent.startTime
      });

      setLoading(false);
    } /** 处理海量点或搜索实体结果的事件弹窗 */ else {
      // 批量全部处理
      if (!values.handleMethod) {
        setLoading(true);

        response = await handleEvent!({
          monitorId: curMassPointInfo!.monitor.monitorId,
          description: values.description
        });

        setLoading(false);
      }/** 单条处理 */ else {
        setSingleState({
          ...singleState,
          [`${singleCurEvent.eventId}`]: {loading: true}
        });

        response = await handleEvent!({
          monitorId: curMassPointInfo!.monitor.monitorId,
          description: values[`description-${singleCurEvent.eventId}`],
          eventType: singleCurEvent.eventType,
          startTime: singleCurEvent.startTime
        });

        setSingleState({
          ...singleState,
          [`${singleCurEvent.eventId}`]: {loading: false}
        });
      }
    }

    if (+response.retCode === 0) {
      message.success('已成功处理事件报警！');
      // 刷新事件列表
      fetchEventListData!({selectFirstData: true});
      setEventStatisticsState!({eventStatisticsMethod: EventStatisticsMethod.ALL});
    } else {
      message.error('处理失败，请稍后再试！');
    }

    // 处理完成之后的逻辑
    if (!values.handleMethod) {
      closeModal();
    } else {
      // 禁用按钮及文本域
      setSingleState({
        ...singleState,
        [`${singleCurEvent.eventId}`]: {disabled: true}
      });
    }
  };

  /**
   * 关闭对话框
   */
  const closeModal = () => {
    setIsShowModal(false);
    form.resetFields();
  };

  /**
   * 切换处理方式事件
   * @param {RadioChangeEvent} e
   */
  const handleMethodChange = (e: RadioChangeEvent) => {
    form.setFieldsValue({handleMethod: e.target.value});
  };

  /**
   * 单条处理事件
   * @param {IEvent} event
   * @param {React.MouseEvent} e
   */
  const singleHandleEvent = (event: IEvent, e: MouseEvent) => {
    // form.setFieldsValue({curEvent: event});
    setSingleCurEvent(event);
    form.submit();
  };

  return (
    <Modal
      width={400}
      title={
        curSelectedEvent?.eventId ?
          `${curMassPointInfo?.monitor?.monitorName} ${curSelectedEvent.eventName} 处理` :
          `${curMassPointInfo?.monitor?.monitorName} 报警处理`
      }
      visible={visible}
      onCancel={() => closeModal()}
      footer={null}
      destroyOnClose={true}
      className="inter-plat-handle-event-modal"
    >
      <Form form={form} onFinish={onFinish} initialValues={{handleMethod: 0} as HandleEventFormProps}>
        {
          !curSelectedEvent?.eventId ? (
            <Form.Item name="handleMethod" className="radio">
              <RadioGroup onChange={handleMethodChange}>
                <Radio value={0}>全部处理</Radio>
                <Radio value={1}>单条处理</Radio>
              </RadioGroup>
            </Form.Item>
          ) : null
        }
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.handleMethod !== currentValues.handleMethod}
        >
          {({getFieldValue}) => {
            return !getFieldValue('handleMethod') ? (
              <Form.Item name="description">
                <Input.TextArea
                  maxLength={50}
                  placeholder="请输入处理描述"
                  rows={4}
                  className="inter-plat-handle-event" />
              </Form.Item>
            ) : (
              curMassPointInfo?.eventList.map((event) => {
                return (
                  <>
                    <Form.Item
                      className="inter-plat-handle-event-name"
                      key={`inter-plat-handle-event-name-${event.eventId}`}
                    >
                      {event.eventName} {event.startTime}
                    </Form.Item>
                    <Form.Item
                      key={`inter-plat-handle-event-desc-${event.eventId}`}
                      name={`description-${event.eventId}`}
                    >
                      <Input.TextArea
                        placeholder="请输入处理描述"
                        disabled={singleState?.[event.eventId || '']?.disabled || false}
                        rows={4}
                        className="inter-plat-handle-event"
                        maxLength={50}
                      />
                    </Form.Item>
                    <Row justify="end" className="modal-row">
                      <Button
                        size="small"
                        loading={singleState?.[event.eventId || '']?.loading || false}
                        disabled={singleState?.[event.eventId || '']?.disabled || false}
                        onClick={singleHandleEvent.bind(null, event)}
                      >
                        {singleState?.[event.eventId || '']?.disabled || false ? '已处理' : '处 理'}
                      </Button>
                    </Row>
                  </>
                );
              })
            );
          }}
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.handleMethod !== currentValues.handleMethod}
        >
          {({getFieldValue}) => {
            return !getFieldValue('handleMethod') ?
              (<Row justify="end" className="modal-row">
                <Button size="small" onClick={() => closeModal()}>取 消</Button>
                <Button size="small" loading={loading} htmlType="submit">处 理</Button>
              </Row>) : null;
          }}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default HandleEvent;
