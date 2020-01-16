/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 临时组组件
 * @Date: 2020-01-14 14:24:28
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-01-14 14:24:28
 */

import Button from '@/components/UI/button';
import Container from '@/components/UI/container';
import EventLegend from '@/components/UI/eventLegend';
import Member from '@/components/UI/member';
import styledComponent from '@/styled';
import React from 'react';
import './index.scss';

interface IIntercom {
  active?: boolean;
}

/**
 * 临时组组件
 */
const Intercom = (props: IIntercom) => {
  return (
    <Container className="inter-plat-intercom-container" theme="style3">
      <EventLegend
        name="对讲名称"
        icon={false}
        nameStyled={styledComponent.centerTitle}
        styled={styledComponent.justifyContent}
      />
      <Container className="inter-plat-intercom-content">
        <Container className="inter-plat-intercom-member">
          <Member />
          <Member />
          <Member />
          <Member />
          <Member />
          <Member />
          <Member />
          <Member />
          <Member />
          <Member />
          <Member />
          <Member />
        </Container>
        <Container className="inter-plat-intercom-button-container">
          <Button name="按" />
          <Button name="按" />
          <Button name="按" />
          <Button name="按" />
          <Button name="按" />
        </Container>
      </Container>
    </Container>
  );
};

export default Intercom;
