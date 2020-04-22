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
   * 离线
   */
  online?: 0 | 1 | boolean
}

const StyledMember = styled(Container)`  
  ${props => props.styled};
`;

/**
 * 导航菜单组件
 */
const Member = (props: IMemberProps) => {
  const {online, title} = props;

  return (
    <StyledMember
      className={`inter-plat-member${online ? '' : ' offline'}`}
      title={`${title}${online ? '' : '(离线)'}`}
      styled={props.styled}
      style={props.style}
    >
      <div className="member-img-box"><img src={props.src ?? user} alt={props.alt ?? ''} /></div>
      <span className="member-name">{props.name}</span>
    </StyledMember>
  );
};

export default Member;
