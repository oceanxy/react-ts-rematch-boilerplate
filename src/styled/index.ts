/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 全局样式
 * @Date: 2020-01-10 15:14:26
 * @LastModified: Oceanxy
 * @LastModifiedTime: 2020-01-10 15:14:26
 */

import { createGlobalStyle, DefaultTheme, GlobalStyleComponent } from 'styled-components';
import styledBlocks, { IStyledComponent } from './styledBlocks';

/**
 * 全局样式
 */
export const GlobalStyle: GlobalStyleComponent<{}, DefaultTheme> = createGlobalStyle`
  html {
    overflow: hidden;
  }

  body {
    margin: 0;
    color: #e4f2ff!important;
    font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', STHeiti, 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Microsoft Yahei', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  #root {
    overflow: hidden;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
  
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
  }
  
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 6px;
    background-color: rgba(34, 59, 91, 0.8);
  }
  
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 4px rgba(51, 107, 145, 0.8);
    background: rgba(10, 28, 46, 0.8);
    border-radius: 6px;
  }
  
  .ant-message-notice-content.ant-message-notice-content {
    border: 1px solid rgba(45, 60, 76, .95);
    background: rgba(21, 47, 69, .95);
    color: #dbe7f5;
    box-shadow: 0 0 4px 0 #2e72ab;
    
    .highlight {
      color: #40a9ff;
    }
  }
`;

export default <IStyledComponent> {
  ...styledBlocks
};
