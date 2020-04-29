/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 通知组件
 * @Date: 2020-04-22 周三 16:53:35
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-28 周二 15:08:30
 */

import Container from '@/components/UI/containerComp';
import { Input } from 'antd';
import React, { ChangeEvent, CompositionEvent, useState } from 'react';
import './index.scss';

/**
 * 对讲通知组件Props
 */
interface IIntercomNoticeProps {
  value: IIntercomNoticeState['value']
  setState: IIntercomNoticeModel['effects']['setState']
}

/**
 * 对讲组件
 * @param {Partial<IIntercomNoticeProps>} props
 * @returns {any}
 * @constructor
 */
const IntercomNotice = (props: Partial<IIntercomNoticeProps>) => {
  const {setState} = props;
  // 组件内部缓存的文本域值，解决antd Input受控时输入中文的问题
  const [val, setVal] = useState('');

  /**
   * 文本域change事件
   * @param {React.ChangeEvent<HTMLTextAreaElement> | React.CompositionEvent<HTMLTextAreaElement>} e
   */
  const onChange = (e: ChangeEvent<HTMLTextAreaElement> | CompositionEvent<HTMLTextAreaElement>) => {
    const tempValue = (e.target as HTMLTextAreaElement).value;
    setVal(tempValue);

    // 中文输入时，锁定受控文本域
    if (e.type === 'change') {
      setState!({value: tempValue});
    }
  };

  return (
    <Container className="inter-plat-intercom-notice">
      <Input.TextArea
        placeholder="请输入通知内容"
        value={val}
        onChange={onChange}
        onCompositionStart={onChange}
        onCompositionUpdate={onChange}
        onCompositionEnd={onChange}
      />
    </Container>
  );
};

export default IntercomNotice;
