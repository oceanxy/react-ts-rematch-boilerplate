/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: 样式化组件集合
 * @Date: 2020-01-10 15:26:53
 * @LastModified: Oceanxy(xyzsyx@163.com)
 * @LastModifiedTime: 2020-04-03 周五 11:13:06
 */

import { px2vh, px2vw } from '@/utils/helper';
import { css } from 'styled-components';

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
  `
} as const;

export type IStyledComponent = typeof styledBlocks;
export default styledBlocks;
