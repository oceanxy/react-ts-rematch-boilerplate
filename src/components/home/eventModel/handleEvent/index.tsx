/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 处理事件弹窗组件
 * @Date: 2020-05-07 周四 09:30:30
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-05-07 周四 09:30:30
 */

import Modal from '@/components/UI/modal';
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
   * 设置处理事件对话框状态
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
  const {visible, setIsShowModal, handleEvent, curMassPointInfo} = props;
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

    /**
     * 批量全部处理
     */
    if (!values.handleMethod) {
      setLoading(true);
      response = await handleEvent!({
        monitorId: curMassPointInfo!.monitor.monitorId,
        description: values.description
      });
      setLoading(false);
    }
    /**
     * 单条处理
     */
    else {
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

    if (+response.retCode === 0) {
      message.success('已成功处理事件报警！');
    } else {
      message.error('处理失败，请稍后再试！');
    }

    // 处理完成之后的逻辑
    if (!values.handleMethod) {
      // 关闭对话框
      setIsShowModal(false);
    } else {
      // 禁用按钮及文本域
      setSingleState({
        ...singleState,
        [`${singleCurEvent.eventId}`]: {disabled: true}
      });
    }
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
      title={`${curMassPointInfo?.monitor.monitorName} 报警处理`}
      visible={visible}
      onCancel={() => setIsShowModal(false)}
      footer={null}
      destroyOnClose={true}
      className="inter-plat-handle-event-modal"
    >
      <Form form={form} onFinish={onFinish} initialValues={{handleMethod: 0} as HandleEventFormProps}>
        <Form.Item name="handleMethod" className="radio">
          <RadioGroup onChange={handleMethodChange}>
            <Radio value={0}>全部处理</Radio>
            <Radio value={1}>单条处理</Radio>
          </RadioGroup>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.handleMethod !== currentValues.handleMethod}
        >
          {({getFieldValue}) => {
            return !getFieldValue('handleMethod') ? (
              <Form.Item name="description">
                <Input.TextArea
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
                        className="inter-plat-handle-event" />
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
                <Button size="small" onClick={() => setIsShowModal(false)}>取 消</Button>
                <Button size="small" loading={loading} htmlType="submit">处 理</Button>
              </Row>) : null;
          }}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default HandleEvent;