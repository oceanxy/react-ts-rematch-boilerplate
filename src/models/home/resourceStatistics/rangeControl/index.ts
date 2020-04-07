/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 资源范围控制model
 * @Date: 2020-04-03 周五 11:00:21
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-03 周五 11:00:21
 */

import { ModelConfig } from '@rematch/core';
import _ from 'lodash';

/**
 * 事件范围控制
 */
export interface IRangeControlState {
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
 * 突发事件周边资源model
 * @type {ModelConfig}
 */
const rangeControl: ModelConfig = {
  state: <IRangeControlState> {
    range: 1,
    rangeAsState: '1'
  },
  reducers: {
    updateRange: (state: any, range: IRangeControlState['range'] | IRangeControlState['rangeAsState']) => {
      if (!_.isNumber(range)) {
        return {
          ...state,
          rangeAsState: range
        };
      }

      return {
        ...state,
        range,
        rangeAsState: range
      };
    }
  }
};

export default rangeControl;
