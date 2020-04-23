/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对话框组件
 * @Date: 2020-04-23 周四 17:22:22
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-23 周四 17:22:22
 */

import styledBlocks, { ContainerTheme } from '@/styled/styledBlocks';
import { Modal as AntdModal } from 'antd';
import { ModalProps } from 'antd/es/modal';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import './index.scss';

/**
 * 对话框组件Props 继承自Antd Modal组件
 */
interface IModalProps extends ModalProps {
  /**
   * 容器样式
   */
  conStyle?: ContainerTheme,
  children?: ReactNode
}

/**
 * 被styled-component包装后的antd Modal组件
 * @type {any}
 */
const StyledModal = styled(AntdModal)(styledBlocks.containerTheme);

const Modal = (props: Partial<IModalProps>) => {
  const {className, children, ...rest} = props;

  return (
    <StyledModal
      conTheme="style1"
      width={300}
      className={`global-modal${className ? ` ${className}` : ''}`}
      maskClosable={false}
      getContainer={false}
      {...rest}
    >
      {children}
    </StyledModal>
  );
};

export default Modal;
