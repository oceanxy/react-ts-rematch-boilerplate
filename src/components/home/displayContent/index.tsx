/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 显示内容组件
 * @Date: 2020-01-14 13:51:14
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-01-14 13:51:14
 */

import Container from '@/components/UI/containerComp';
import ItemLegend from '@/components/UI/itemLegend';
import Trigger, { ETriggerType } from '@/components/UI/triggerComp';
import styledComponent from '@/styled';
import React from 'react';
import './index.scss';

interface IDisplayContent {
  active?: boolean;
}

/**
 * 显示内容组件
 */
const DisplayContent = (props: IDisplayContent) => {
  return (
    <Container className="inter-plat-display-container" theme="style3">
      <ItemLegend
        name="显示内容"
        icon={false}
        styled={styledComponent.justifyContent}
        nameStyled={styledComponent.centerTitle}
      />
      <Container className="inter-plat-display-item-container">
        <Trigger name="车辆" type={ETriggerType.TRIGGER} />
        <Trigger name="任务" type={ETriggerType.TRIGGER} />
        <Trigger name="物资" type={ETriggerType.TRIGGER} />
        <Trigger name="区域" type={ETriggerType.TRIGGER} />
      </Container>
    </Container>
  );
};

export default DisplayContent;
