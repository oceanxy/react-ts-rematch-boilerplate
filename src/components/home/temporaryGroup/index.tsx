/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 临时组组件
 * @Date: 2020-01-14 14:24:28
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-01-14 14:24:28
 */

import Container from '@/components/UI/containerComp';
import ItemLegend from '@/components/UI/itemLegend';
import Modal from '@/components/UI/modal';
import Trigger, { ETriggerType } from '@/components/UI/triggerComp';
import { CurActiveGroupType } from '@/models/home/intercom/group';
import styledComponent from '@/styled';
import { message } from 'antd';
import React, { useEffect } from 'react';
import './index.scss';

interface ITemporaryGroupProps {
  data: ITemporaryGroupState['data']
  intercomGroupState: IIntercomGroupState
  fetchData: ITemporaryGroupModel['effects']['fetchData']
  setState: IIntercomGroupModel['effects']['setState']
  unbindTemporaryGroup: ITemporaryGroupModel['effects']['unbindTemporaryGroup']
}

/**
 * 临时组组件
 */
const TemporaryGroup = (props: Partial<ITemporaryGroupProps>) => {
  const {data, fetchData, intercomGroupState, setState, unbindTemporaryGroup} = props;
  const {id, curActiveGroupType, name} = intercomGroupState!;

  /**
   * 临时组点击事件
   * @param {ITemporaryGroup} tempGroup
   */
  const onClick = (tempGroup: ITemporaryGroup) => {
    if (curActiveGroupType === CurActiveGroupType.Null) {
      setState!({
        name: tempGroup.name,
        id: tempGroup.intercomGroupId,
        curActiveGroupType: CurActiveGroupType.Temporary
      });
    } else if (curActiveGroupType === CurActiveGroupType.Task) {
      message.destroy();
      message.warning((
        <span>任务组（<span className="highlight"> {name} </span>）正在进行对讲，暂不能进行此操作！</span>
      ));
    } else if (curActiveGroupType === CurActiveGroupType.Temporary) {
      message.destroy();

      if (id !== tempGroup.intercomGroupId) {
        message.destroy();
        message.warning((
          <span>其他临时组（<span className="highlight"> {name} </span>）正在进行对讲，暂不能进行此操作！</span>
        ));
      } else {
        message.destroy();
        message.info((
          <span>当前临时组（<span className="highlight"> {name} </span>）已激活对讲功能，请勿重复操作！</span>
        ));
      }
    } else {
      message.destroy();
      message.warning((
        <span>监控对象（<span className="highlight"> {name} </span>）正在进行对讲，暂不能进行此操作！</span>
      ));
    }
  };

  /**
   * 解散临时组
   * @param {ITemporaryGroup} tempGroup
   * @returns {Promise<void>}
   */
  const onTriggerClick = async (tempGroup: ITemporaryGroup) => {
    const response = await unbindTemporaryGroup!(tempGroup.intercomGroupId);

    if (Number(response.retCode) === 0) {
      message.destroy();
      message.success(`临时组（${tempGroup.name}）已解散。`);

      // 如果解散临时组时，该临时组的对讲面板处于激活状态，则清空该临时组的对讲面板的所有状态
      if (id === tempGroup.intercomGroupId) {
        setState!({name: '', id: '', curActiveGroupType: CurActiveGroupType.Null});
      }
    }
  };

  useEffect(() => {
    fetchData!();
  }, []);

  return (
    <Container className="inter-plat-temp-group-container" conTheme="style3">
      <ItemLegend
        name="临时组"
        icon={false}
        nameStyled={styledComponent.centerTitle}
        styled={styledComponent.justifyContent}
      />
      <Container className="inter-plat-temp-group-item-container">
        {
          data?.map((tempGroup, index) => {
            return (
              <Trigger
                key={`inter-plat-temp-group-item-${index}`}
                name={tempGroup.name}
                type={ETriggerType.CLOSE}
                active={tempGroup.intercomGroupId === id}
                onClick={onClick.bind(null, tempGroup)}
                onTriggerClick={onTriggerClick.bind(null, tempGroup)}
              />
            );
          })
        }
      </Container>
      <Modal
        title="Modal"
        visible={true}
        okText="确认"
        cancelText="取消"
      >
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
      </Modal>
    </Container>
  );
};

export default TemporaryGroup;
