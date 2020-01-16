/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 成员组件
 * @Date: 2020-01-13 16:12:38
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-01-13 16:12:38
 */

import Container from '@/components/UI/container';
import { px2vw } from '@/utils/helper';
import React, { CSSProperties } from 'react';
import styled, { FlattenSimpleInterpolation } from 'styled-components';
import user from './images/user.png';
import './index.scss';

interface IMember {
  title?: string,
  src?: string,
  alt?: string,
  style?: CSSProperties,
  styled?: FlattenSimpleInterpolation,
}

const StyledMember = styled(Container)`  
  ${props => props.styled};
`;

/**
 * 导航菜单组件
 */
const Member = (props: IMember) => {
  return (
    <StyledMember
      title={props.title}
      className="inter-plat-member"
      styled={props.styled}
      style={props.style}
    >
      <img src={props.src ?? user} alt={props.alt ?? ''} />
      <span>user</span>
    </StyledMember>
  );
};

export default Member;
