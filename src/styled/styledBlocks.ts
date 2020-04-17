/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 样式化组件集合
 * @Date: 2020-01-10 15:26:53
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-03 周五 11:13:06
 */

import ContainerBorderImage from '@/components/UI/containerComp/images/container-border-bg.png';
import ContainerBorderImage2 from '@/components/UI/containerComp/images/container-border-bg2.png';
import ItemBorderImageHover from '@/images/event-item-border-hover.png';
import ItemBorderImage from '@/images/event-item-border.png';
import { px2vh, px2vw } from '@/utils/helper';
import { css, FlattenSimpleInterpolation } from 'styled-components';

const styledBlocks = {
  subtitle: css`
    color: #e4f2ff;
    font-size: ${px2vw(14.44)};
    text-shadow: #2e72ab 0 0 ${px2vw(7)};
  `,
  tabTitle: css`
    color: #e4f2ff;
    font-size: ${px2vw(12)};
    border-bottom: 2px solid transparent;
    padding: ${px2vh(3)} 0;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      text-shadow: #2e72ab 0 0 ${px2vw(7)};
    }
  `,
  tabTitleActive: css`
    color: #e4f2ff;
    font-size: ${px2vw(12)};
    text-shadow: #2e72ab 0 0 ${px2vw(7)};
    border-bottom: 2px solid #40a9ff;
    padding: ${px2vh(3)} 0;
    cursor: pointer;
  `,
  centerTitle: css`
    border-bottom: 1px solid #4e84c0;
    padding: ${px2vw(5)} ${px2vw(12)};
    color: #e4f2ff;
    font-size: ${px2vw(14.44)};
  `,
  marginTop20: css`
    margin-top: ${px2vh(20)};
  `,
  marginBottom10: css`
    margin-bottom: ${px2vh(10)};
  `,
  highlight: css`
    color: #ccb726;
  `,
  flexNone: css`
    flex: none;
  `,
  flex1: css`
    flex: 1;
  `,
  justifyContent: css`
    justify-content: center;
  `,
  overflowAuto: css`
    overflow-y: auto;
  `,
  containerTheme: (props: { conTheme?: ContainerTheme; styled?: FlattenSimpleInterpolation }) => {
    if (props.conTheme === 'style1') {
      return css`
        border-width: 15px 22px 30px 30px;
        border-style: solid;
        border-color: transparent;
        border-image-source: url(${ContainerBorderImage});
        border-image-slice: 15 22 30 30 fill;
        border-image-repeat: round;
        ${props.styled}
      `;
    } else if (props.conTheme === 'style2') {
      return css`
        border: 13px solid transparent;
        border-image-source: url(${ItemBorderImage});
        border-image-slice: 13 fill;
        border-image-repeat: round;
        ${props.styled}

        &:hover, &.active {
          border-image-source: url(${ItemBorderImageHover});
          border-image-outset: 3px;
        }

        &.active:hover {
          transform: scale(1.01);
        }
      `;
    } else if (props.conTheme === 'style3') {
      return css`
        border: 20px solid transparent;
        border-image-source: url(${ContainerBorderImage2});
        border-image-slice: 20 fill;
        border-image-repeat: round;
        ${props.styled}
      `;
    }

    return `
    ${props.styled}
  `;
  }
} as const;

/**
 * 容器主题
 */
export type ContainerTheme = 'style1' | 'style2' | 'style3';
export type IStyledComponent = typeof styledBlocks;
export default styledBlocks;
