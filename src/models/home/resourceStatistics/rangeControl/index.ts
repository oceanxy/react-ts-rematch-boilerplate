/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 资源范围控制model
 * @Date: 2020-04-03 周五 11:00:21
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-13 周一 11:25:23
 */

import _ from 'lodash';

/**
 * 突发事件周边资源model
 * @type {IRangeControl}
 */
const rangeControl: IRangeControl = {
  state: {
    range: 1,
    rangeAsState: '1'
  },
  reducers: {
    updateRange: (state, range) => {
      if (!_.isNumber(range)) {
        return {
          ...state,
          rangeAsState: range
        };
      }

      return {
        ...state,
        range,
        rangeAsState: range as unknown as string
      };
    }
  }
};

export default rangeControl;
