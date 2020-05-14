/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 临时组创建方式组件
 * @Date: 2020-05-14 周四 16:45:46
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-14 周四 23:05:14
 */

import Container from '@/components/UI/containerComp';
import Modal from '@/components/UI/modal';
import Trigger from '@/components/UI/triggerComp';
import {MouseToolType} from '@/models/UI/amap';
import React, {useEffect} from 'react';
import './index.scss';
import Circle = AMap.Circle;

/**
 * 临时组创建方式组件Render Props
 */
interface ICreationWayProps {
  title: string,
  visible: boolean
  setState: (state: { visible: boolean }) => void
  mouseToolType: IAMapState['mouseToolType']
  overlay: IAMapState['overlay']
  setEntityState: IEntityModel['effects']['setState']
  setAMapState: IAMapModel['effects']['setState']
  setTempGroupState: ITemporaryGroupModel['effects']['setState']
}

const CreationWay = (props: Partial<ICreationWayProps>) => {
  const {
    visible, title, setState, setEntityState,
    setAMapState, setTempGroupState, overlay, mouseToolType
  } = props;

  /**
   * 处理trigger点击事件
   * @param {EditTempGroupType} type
   */
  const handleTriggerClick = (type: EditTempGroupType) => {
    // 初始化本组件所有状态

    setState!({visible: false});

    if ('byCondition' in type) {
      const {byCondition} = type;

      // 设置实体model的状态
      setEntityState!({byCondition});
      // 激活地图鼠标工具
      setAMapState!({
        mouseToolType: type.mouseToolType
      });
    } else if ('byFixedEntity' in type) {
      // 按照固定对象选择
      setTempGroupState!({isShowEditModal: true, title, backFillInfo: {name}});
    }
  };

  useEffect(() => {
    if (overlay) {
      let backFillInfo: any;

      if (mouseToolType === MouseToolType.Circle) {
        const radius = (overlay as Circle).getRadius();
        const center = (overlay as Circle).getCenter();
        backFillInfo = {radius, center, name};
      } else if (mouseToolType === MouseToolType.Rectangle) {
        const northWest = overlay.getBounds()?.getNorthWest() ?? [];
        const southEast = overlay.getBounds()?.getSouthEast() ?? [];
        backFillInfo = {northWest, southEast, name};
      }

      setTempGroupState!({isShowEditModal: true, title, backFillInfo});
    }
  }, [overlay]);

  return (
    <Container>
      <Modal
        title={`选择${title}的方式`}
        width={300}
        footer={null}
        visible={visible}
        onCancel={() => setState!({visible: false})}
      >
        <Trigger
          name="地图圆形圈选"
          className="hover inter-plat-temp-group-create-modal-item"
          width="100%"
          onClick={() => handleTriggerClick({byCondition: false, mouseToolType: MouseToolType.Circle})}
        />
        <Trigger
          name="地图矩形圈选"
          className="hover inter-plat-temp-group-create-modal-item"
          width="100%"
          onClick={() => handleTriggerClick({byCondition: false, mouseToolType: MouseToolType.Rectangle})}
        />
        <Trigger
          name="固定对象选择"
          className="hover inter-plat-temp-group-create-modal-item"
          width="100%"
          onClick={() => handleTriggerClick({byFixedEntity: true})}
        />
        <Trigger
          name="固定条件选择"
          className="hover inter-plat-temp-group-create-modal-item"
          width="100%"
          onClick={() => handleTriggerClick({byCondition: true, mouseToolType: MouseToolType.Circle})}
        />
      </Modal>
    </Container>
  );
};

export default CreationWay;
