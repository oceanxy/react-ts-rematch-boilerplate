/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲名称组件
 * @Date: 2020-01-14 14:24:28
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-01-14 14:24:28
 */

import Container from '@/components/UI/containerComp';
import ItemLegend from '@/components/UI/itemLegend';
import Trigger, { ETriggerType } from '@/components/UI/triggerComp';
import styledComponent from '@/styled';
import React from 'react';
import './index.scss';

interface ITemporaryGroup {
  active?: boolean;
}

/**
 * 对讲名称组件
 */
const TemporaryGroup = (props: ITemporaryGroup) => {
  return (
    <Container className="inter-plat-temp-group-container" theme="style3">
      <ItemLegend
        name="临时组"
        icon={false}
        nameStyled={styledComponent.centerTitle}
        styled={styledComponent.justifyContent}
      />
      <Container className="inter-plat-temp-group-item-container">
        <Trigger name="临时组1" type={ETriggerType.CLOSE} />
        <Trigger name="临时组1" type={ETriggerType.CLOSE} />
        <Trigger name="临时组1" type={ETriggerType.CLOSE} />
        <Trigger name="临时组1" type={ETriggerType.CLOSE} />
      </Container>
    </Container>
  );
};

export default TemporaryGroup;
