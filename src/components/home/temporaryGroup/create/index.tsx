/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 创建临时组组件
 * @Date: 2020-04-25 周六 14:58:52
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-15 周五 13:52:54
 */

import Container from '@/components/UI/containerComp';
import Icon, { IconSource } from '@/components/UI/iconComp';
import ItemLegend from '@/components/UI/itemLegend';
import { EditTemporaryGroup, TemporaryGroupCreationWay } from '@/containers/home/temporaryGroup';
import styledComponent from '@/styled';
import React, { useState } from 'react';
import './index.scss';

/**
 * 创建临时组组件Render Props
 */
interface ICreateTempGroupProps {
  setState: ITemporaryGroupModel['effects']['setState']
}

const CreateTempGroup = (props: Partial<ICreateTempGroupProps>) => {
  const {setState} = props;

  // 创建临时组时，传递给询问对话框的状态
  const [showTempGroupModal, setShowTempGroupModal] = useState({visible: false});

  /**
   * 处理点击‘创建临时组’按钮事件
   */
  const handleClick = () => {
    setState!({title: '创建临时组'});
    setShowTempGroupModal({visible: true});
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
      <TemporaryGroupCreationWay
        visible={showTempGroupModal.visible}
        setState={setShowTempGroupModal}
      />
      <EditTemporaryGroup />
    </Container>
  );
};

export default CreateTempGroup;
