/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 临时组创建方式组件
 * @Date: 2020-05-14 周四 16:45:46
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-15 周五 13:52:47
 */

import Modal from '@/components/UI/modal';
import Trigger from '@/components/UI/triggerComp';
import { MouseToolType } from '@/models/UI/amap';
import React from 'react';
import './index.scss';

/**
 * 临时组创建方式组件Render Props
 */
interface ICreationWayProps {
  visible: boolean
  setState: (state: {visible: boolean}) => void
  title: ITemporaryGroupState['title']
  setEntityState: IEntityModel['effects']['setState']
  setAMapState: IAMapModel['effects']['setState']
  setTempGroupState: ITemporaryGroupModel['effects']['setState']
}

const CreationWay = (props: Partial<ICreationWayProps>) => {
  const {visible, setState, setEntityState, setAMapState, setTempGroupState, title} = props;

  /**
   * 处理trigger点击事件
   * @param {EditTempGroupType} type
   */
  const handleTriggerClick = (type: EditTempGroupType) => {
    if ('byCondition' in type) {
      const {byCondition} = type;

      // 设置实体model的状态
      setEntityState!({byCondition});
      // 激活地图鼠标工具（触发mouseTool组件内部监听mouseToolType字段的useEffect逻辑）
      setAMapState!({
        mouseToolType: type.mouseToolType
      });
    } else if ('byFixedEntity' in type) {
      // 按照固定对象选择
      setTempGroupState!({isShowEditModal: true});
    }

    // 关闭选择方式组件
    setState!({visible: false});
  };

  return (
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
  );
};

export default CreationWay;
