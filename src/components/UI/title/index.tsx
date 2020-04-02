/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 标题模块
 * @Date: 2020-01-06 11:42:36
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-01-13 14:24:22
 */

import Container from '@/components/UI/containerComp';
import React, { CSSProperties, ReactNode } from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import './index.scss';

interface ITitle {
  name: string;
  children?: ReactNode | ReactNode[];
  styled?: FlattenSimpleInterpolation;
  titleExtraElement?: React.ComponentElement<any, any>;
  titleExtraElementStyle?: CSSProperties;
  titleExtraElementStyled?: FlattenSimpleInterpolation;
}

const StyledTitle = styled(Container)`
  ${props => props.styled}
`;

const TitleExtraElement = styled(Container)(
  props => css`
    ${props.styled};

    & > * + * {
      padding-left: 10px;
    }
  `
);

/**
 * 导航菜单组件
 */
const Title = (props: ITitle) => {
  return (
    <StyledTitle styled={props.styled} className="title-container">
      <Container className="title-header">
        <span className="title-shape" />
        <span className="title-font" title={props.name}>
          {props.name}
        </span>
        {props.titleExtraElement && (
          <TitleExtraElement
            className="title-extra-element-container"
            style={props.titleExtraElementStyle}
            styled={props.titleExtraElementStyled}
          >
            {props.titleExtraElement}
          </TitleExtraElement>
        )}
      </Container>
      <Container className="title-content">{props.children}</Container>
    </StyledTitle>
  );
};

export default Title;
