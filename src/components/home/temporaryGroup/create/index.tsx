/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 创建临时组组件
 * @Date: 2020-04-25 周六 14:58:52
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-25 周六 14:58:52
 */

import Container from '@/components/UI/containerComp';
import Icon, { IconSource } from '@/components/UI/iconComp';
import ItemLegend from '@/components/UI/itemLegend';
import Modal from '@/components/UI/modal';
import Trigger from '@/components/UI/triggerComp';
import styledComponent from '@/styled';
import { message } from 'antd';
import React, { useState } from 'react';
import './index.scss';

/**
 * 创建临时组组件Render Props
 */
interface ICreateTempGroupProps {
  createTemporaryGroup: ITemporaryGroupModel['effects']['createTemporaryGroup']
}

const CreateTempGroup = (props: Partial<ICreateTempGroupProps>) => {
  const {createTemporaryGroup} = props;
  // 创建临时组时，传递给询问对话框的状态
  const [tempGroup, setShowTempGroup] = useState({visible: false, current: null as ITemporaryGroup | null});
  // 解除绑定loading状态
  const [loading, setLoading] = useState(false);

  /**
   * 处理点击‘创建临时组’按钮事件
   */
  const handleClick = () => {
    setShowTempGroup({visible: true, current: null});
  };

  /**
   * 创建临时组
   * @returns {Promise<void>}
   */
  const createTempGroup = async () => {
    // TODO 调用高德地图框选范围API

    setLoading(true);
    const response = await createTemporaryGroup!();
    setLoading(false);

    message.destroy();
    if (Number(response.retCode) === 0) {
      message.success('创建临时组成功！');
    } else {
      message.warning('创建临时组失败，请稍候再试！');
    }

    setShowTempGroup({visible: false, current: null});
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
            disabled={loading}
          />
        }
        nameStyled={styledComponent.centerTitle}
        styled={styledComponent.justifyContent}
      />
      <Modal
        width={200}
        title="请选择创建方式"
        visible={tempGroup.visible}
        footer={null}
        onCancel={() => setShowTempGroup({visible: false, current: null})}
      >
        <Trigger
          name="圆形"
          className="hover inter-plat-temp-group-create-modal-item"
          width="100%"
          onClick={createTempGroup.bind(null, tempGroup.current!)}
        />
        <Trigger
          name="矩形"
          className="hover inter-plat-temp-group-create-modal-item"
          width="100%"
          onClick={createTempGroup.bind(null, tempGroup.current!)}
        />
      </Modal>
    </Container>
  );
};

export default CreateTempGroup;