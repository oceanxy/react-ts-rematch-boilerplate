/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 键值对组件
 * @Date: 2020-01-06 17:59:27
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-01-16 14:45:35
 */

import { px2vh } from '@/utils/helper';
import React from 'react';
import styled, { FlattenSimpleInterpolation } from 'styled-components';
import './index.scss';

interface IKeyValue {
  name: string;
  value: any;
  className?: string;
  styled?: FlattenSimpleInterpolation;
  compWidth?: string; // 组件宽度
}

const StyledKeyValue = styled.div`
  text-shadow: #2e72ab 0 0 7px;
  margin-bottom: ${px2vh(10)};
  ${props => props.styled};
  flex-basis: ${(props: IKeyValue) => (props.compWidth ? props.compWidth : 'auto')};
`;

/**
 * 键值对组件
 */
const KeyValue = (props: IKeyValue) => {
  return (
    <StyledKeyValue {...props} className={`inter-plat-key-value${props.className ? ` ${props.className}` : ''}`}>
      <span title={props.name}>{props.name}：</span>
      <span title={props.value}>{props.value}</span>
    </StyledKeyValue>
  );
};

export default KeyValue;
