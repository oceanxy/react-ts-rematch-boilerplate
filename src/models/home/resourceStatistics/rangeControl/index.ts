/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 资源范围控制model
 * @Date: 2020-04-03 周五 11:00:21
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-03 周五 11:00:21
 */

import { ModelConfig } from '@rematch/core';

/**
 * 事件范围控制
 */
export interface IRangeControlState {
  /**
   * 半径。单位（千米）
   */
  range: number
}

/**
 * 突发事件周边资源model
 * @type {ModelConfig}
 */
const rangeControl: ModelConfig = {
  state: <IRangeControlState> {
    range: 1
  },
  reducers: {
    updateRange: (state: any, range: IRangeControlState['range']) => ({range})
  }
};

export default rangeControl;
