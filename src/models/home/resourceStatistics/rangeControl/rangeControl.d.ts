/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 资源范围控制类型定义
 * @Date: 2020-04-13 周一 11:18:31
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-13 周一 11:18:31
 */

import { ModelConfig } from '@rematch/core';

declare global {
  /**
   * 事件范围控制
   */
  interface IRangeControlState {
    /**
     * 半径。单位（千米）
     * 范围1-200以内（含）的整数
     */
    range: number,
    /**
     * 半径，单位（千米）。
     * react受控组件的value值
     */
    rangeAsState: string
  }

  /**
   * 资源范围控制model
   */
  interface IRangeControl extends ModelConfig {
    state: IRangeControlState,
    reducers: {
      updateRange(state: IRangeControlState, range: IRangeControlState['range'] | IRangeControlState['rangeAsState']): IRangeControlState
    }
  }
}