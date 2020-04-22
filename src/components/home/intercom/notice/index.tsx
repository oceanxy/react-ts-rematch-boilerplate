/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 通知组件
 * @Date: 2020-04-22 周三 16:53:35
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-22 周三 16:53:35
 */

import Container from '@/components/UI/containerComp';
import { Input } from 'antd';
import React, { ChangeEvent, CompositionEvent, useState } from 'react';
import './index.scss';

interface IIntercomNoticeProps {
  value: IIntercomNoticeState['value']
  setState: IIntercomNoticeModel['effects']['setState']
}

const IntercomNotice = (props: Partial<IIntercomNoticeProps>) => {
  const {value, setState} = props;
  const [lock, setLock] = useState(false);
  const [val, setVal] = useState('');

  const onChange = (e: ChangeEvent<HTMLTextAreaElement> | CompositionEvent<HTMLTextAreaElement>) => {
    const tempValue = (e.target as HTMLTextAreaElement).value;

    if (e.type === 'compositionstart') {
      setLock(true);
    } else if (e.type === 'compositionend') {
      setLock(false);
    }

    setVal(tempValue);

    if (!lock) {
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
        onCompositionEnd={onChange}
      />
    </Container>
  );
};

export default IntercomNotice;
