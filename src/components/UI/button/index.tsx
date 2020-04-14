/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 按钮组件
 * @Date: 2020-01-07 09:50:44
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-14 周二 17:11:26
 */

import { px2vh, px2vw } from '@/utils/helper';
import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import './index.scss';

interface IButton extends ButtonHTMLAttributes<any> {
  active?: boolean;
}

const StyledButton = styled.button.attrs((props: IButton) => {
  const className = props.className ? ` ${props.className}` : '';
  const active = props.active ? ' active' : '';

  return {
    className: `inter-plat-button${className}${active}`,
    type: props.type,
    title: props.name,
    onClick: props.onClick
  };
})`
  padding: ${px2vh(4)} ${px2vw(10)};
`;

/**
 * 键值对组件
 */
const Button = (props: IButton) => {
  return (
    <StyledButton {...props}>
      {props.active ? <i className="inter-plat-button-icon" /> : null}
      <span>{props.name}</span>
    </StyledButton>
  );
};

export default Button;
