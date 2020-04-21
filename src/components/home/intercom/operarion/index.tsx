/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲组名称组件
 * @Date: 2020-04-21 周二 15:07:10
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-21 周二 16:08:04
 */

import Button from '@/components/UI/button';
import Container from '@/components/UI/containerComp';
import React from 'react';
import './index.scss';

interface IIntercomOperationProps {

}

const IntercomOperation = (props: Partial<IIntercomOperationProps>) => {
  return (
    <Container className="inter-plat-intercom-button-container">
      <Button name="按" />
      <Button name="按" />
      <Button name="按" />
      <Button name="按" />
      <Button name="按" />
    </Container>
  );
};

export default IntercomOperation;
