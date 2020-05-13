/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 创建临时组组件
 * @Date: 2020-04-25 周六 14:58:52
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-30 周四 10:13:56
 */

import Container from '@/components/UI/containerComp';
import Icon, { IconSource } from '@/components/UI/iconComp';
import ItemLegend from '@/components/UI/itemLegend';
import Modal from '@/components/UI/modal';
import Trigger from '@/components/UI/triggerComp';
import { EditTemporaryGroup } from '@/containers/home/temporaryGroup';
import { MouseToolType } from '@/models/UI/amap';
import styledComponent from '@/styled';
import React, { useState } from 'react';
import './index.scss';

/**
 * 创建临时组组件Render Props
 */
interface ICreateTempGroupProps {
  setState: ITemporaryGroupModel['effects']['setState']
  setAMapState: IAMapModel['effects']['setState']
}

const CreateTempGroup = (props: Partial<ICreateTempGroupProps>) => {
  const {setAMapState, setState} = props;
  // 创建临时组时，传递给询问对话框的状态
  const [showTempGroupModal, setShowTempGroupModal] = useState({
    visible: false,
    current: null as ITemporaryGroup | null
  });

  /**
   * 处理点击‘创建临时组’按钮事件
   */
  const handleClick = () => {
    setShowTempGroupModal({visible: true, current: null});
  };

  /**
   * 激活高德地图鼠标工具
   */
  const loadAMapMouseTool = () => {
    setShowTempGroupModal({visible: false, current: null});
    setAMapState!({
      mouseToolType: MouseToolType.Circle,
      callback: handleCircleMouseTool
    });
  };

  /**
   * 处理地图鼠标事件绘制覆盖物后的回调事件
   * @param type
   * @param {AMap.Circle | AMap.Polygon | AMap.Polyline | AMap.Rectangle} overlay 绘制的覆盖物对象
   * @returns {Promise<void>}
   */
  const handleCircleMouseTool = async (type: any, overlay: AMap.Circle | any) => {
    const radius = overlay.getRadius();
    const center = overlay.getCenter();

    const backFillInfo: ITemporaryGroupState['backFillInfo'] = {radius, center};

    setState!({isShowEditModal: true, title: '创建临时组', backFillInfo});
  };

  /**
   * 处理固定对象选择事件
   * @returns {Promise<void>}
   */
  const handleFixedEntity = async () => {
    setShowTempGroupModal({visible: false, current: null});
    setState!({isShowEditModal: true, title: '创建临时组'});
  };

  return (
    <Container>
      <ItemLegend
        name="临时组"
        iconPosition="right"
        customIcon={
          <Icon
            icon={IconSource.ADD}
            title="创建临时组"
            className="inter-plat-temp-group-create-icon"
            onClick={handleClick}
          />
        }
        nameStyled={styledComponent.centerTitle}
        styled={styledComponent.justifyContent}
      />
      <Modal
        width={200}
        title="请选择创建方式"
        visible={showTempGroupModal.visible}
        footer={null}
        onCancel={() => setShowTempGroupModal({visible: false, current: null})}
      >
        <Trigger
          name="地图圆形圈选"
          className="hover inter-plat-temp-group-create-modal-item"
          width="100%"
          onClick={loadAMapMouseTool}
        />
        <Trigger
          name="固定对象选择"
          className="hover inter-plat-temp-group-create-modal-item"
          width="100%"
          onClick={handleFixedEntity}
        />
        {/*<Trigger*/}
        {/*  name="固定条件选择"*/}
        {/*  className="hover inter-plat-temp-group-create-modal-item"*/}
        {/*  width="100%"*/}
        {/*  onClick={loadAMapMouseTool}*/}
        {/*/>*/}
      </Modal>
      <EditTemporaryGroup />
    </Container>
  );
};

export default CreateTempGroup;