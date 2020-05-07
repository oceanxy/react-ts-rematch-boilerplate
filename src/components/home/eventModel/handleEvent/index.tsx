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
import React, { useState } from 'react';
import './index.scss';

interface HandleEventProps {
  /**
   * 处理事件对话框框显示状态
   */
  visible: boolean
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

const HandleEvent = (props: HandleEventProps) => {
  const {visible, setIsShowModal, handleEvent, curMassPointInfo} = props;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    setLoading(true);
    const response = await handleEvent!({
      monitorId: curMassPointInfo!.monitor.monitorId,
      eventType: curMassPointInfo!.eventList[0].eventType,
      description: values.description,
      startTime: curMassPointInfo!.eventList[0].startTime
    });
    setLoading(false);

    if (+response.retCode === 0) {
      message.success('已成功处理事件报警！');
    } else {
      message.error('处理失败，请稍后再试！');
    }
  };

  const handleMethodChange = (e: RadioChangeEvent) => {
    form.setFieldsValue({handleMethod: e.target.value});
  };

  return (
    <Modal
      width={400}
      title="报警处理"
      visible={visible}
      onCancel={() => setIsShowModal(false)}
      footer={null}
      destroyOnClose={true}
    >
      <Form form={form} onFinish={onFinish} initialValues={{handleMethod: 0}}>
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
                      key={`inter-plat-handle-event-name-${event.eventId}`}
                    >
                      {event.eventName}
                    </Form.Item>
                    <Form.Item
                      key={`inter-plat-handle-event-desc-${event.eventId}`}
                      name={`description-${event.eventId}`}
                    >
                      <Input.TextArea
                        placeholder="请输入处理描述"
                        rows={4}
                        className="inter-plat-handle-event" />
                    </Form.Item>
                    <Row justify="end" className="modal-row">
                      <Button size="small" loading={loading} onClick={() => {
                      }}>处 理</Button>
                    </Row>
                  </>
                );
              })
            );
          }}
        </Form.Item>
        <Row justify="end" className="modal-row">
          <Button size="small" onClick={() => setIsShowModal(false)}>取 消</Button>
          <Button size="small" loading={loading} htmlType="submit">处 理</Button>
        </Row>
      </Form>
    </Modal>
  );
};

export default HandleEvent;
