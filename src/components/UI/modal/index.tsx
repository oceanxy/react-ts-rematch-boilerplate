/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对话框组件
 * @Date: 2020-04-23 周四 17:22:22
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-24 周五 10:46:21
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
  const {className, children, okButtonProps, cancelButtonProps, ...rest} = props;

  return (
    <StyledModal
      conTheme="style1"
      width={300}
      title="请确认"
      okText="确定"
      cancelText="取消"
      className={`global-modal${className ? ` ${className}` : ''}`}
      maskClosable={false}
      getContainer={false}
      okButtonProps={{
        ...okButtonProps,
        className: `okay-btn${okButtonProps?.className ? ` ${okButtonProps?.className}` : ''}`
      }}
      cancelButtonProps={{
        ...cancelButtonProps,
        className: `cancel-btn${cancelButtonProps?.className ? ` ${cancelButtonProps.className}` : ''}`
      }}
      {...rest}
    >
      {children}
    </StyledModal>
  );
};

export default Modal;
