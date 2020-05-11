/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 显示内容组件
 * @Date: 2020-01-14 13:51:14
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-11 周一 15:20:32
 */

import Container from '@/components/UI/containerComp';
import ItemLegend from '@/components/UI/itemLegend';
import Trigger, { ETriggerType } from '@/components/UI/triggerComp';
import styledComponent from '@/styled';
import React from 'react';
import './index.scss';

interface IDisplayContent {
  triggers: IDisplayContentState['triggers']
  setState: IDisplayContentModel['effects']['setState']
  getCurTrigger: IDisplayContentModel['effects']['getCurTrigger']
}

/**
 * 显示内容组件
 */
const DisplayContent = (props: Partial<IDisplayContent>) => {
  const {triggers, setState, getCurTrigger} = props;

  /**
   * 开启/关闭显示内容
   */
  const handleTriggerClick = async (triggerName: string) => {
    // 获取当前状态数组中指定triggerName对象的下标
    const {trigger, index} = await getCurTrigger!(triggerName);
    // 拷贝原triggers状态
    const newTriggers = [...triggers!];
    // 重置为相反状态
    newTriggers[index] = {...triggers![index], status: !trigger.status};
    if (trigger.value === 'area') {
      // TODO 设置区域
    } else {
      // 设置状态
      setState!({triggers: newTriggers});
    }
  };

  return (
    <Container className="inter-plat-display-container" conTheme="style3">
      <ItemLegend
        name="显示内容"
        icon={false}
        styled={styledComponent.justifyContent}
        nameStyled={styledComponent.centerTitle}
      />
      <Container className="inter-plat-display-item-container">
        {
          triggers?.map((trigger) => (
            <Trigger
              key={`inter-plat-display-item-${trigger.text}`}
              name={trigger.text}
              type={ETriggerType.TRIGGER}
              active={trigger.status}
              onTriggerClick={handleTriggerClick.bind(null, trigger.text)}
            />
          ))
        }
      </Container>
    </Container>
  );
};

export default DisplayContent;
