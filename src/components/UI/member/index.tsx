/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 成员组件
 * @Date: 2020-01-13 16:12:38
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-01-13 16:12:38
 */

import Container from '@/components/UI/containerComp';
import React, { CSSProperties } from 'react';
import styled, { FlattenSimpleInterpolation } from 'styled-components';
import user from './images/user.png';
import './index.scss';

interface IMemberProps {
  /**
   * 同HTML标签的title属性
   */
  title?: string
  /**
   * 成员名称
   */
  name: string,
  /**
   * 成员头像src路径
   */
  src?: string
  /**
   * 同HTML IMG标签的src属性
   */
  alt?: string
  /**
   * 样式
   */
  style?: CSSProperties
  /**
   * styled-components样式对象
   */
  styled?: FlattenSimpleInterpolation
  /**
   * 同React标签的key属性
   */
  key?: string
}

const StyledMember = styled(Container)`  
  ${props => props.styled};
`;

/**
 * 导航菜单组件
 */
const Member = (props: IMemberProps) => {
  return (
    <StyledMember
      key={props.key}
      title={props.title}
      className="inter-plat-member"
      styled={props.styled}
      style={props.style}
    >
      <img src={props.src ?? user} alt={props.alt ?? ''} />
      <span>{props.name}</span>
    </StyledMember>
  );
};

export default Member;
