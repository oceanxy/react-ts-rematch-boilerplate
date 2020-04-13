/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 围栏model
 * @Date: 2020-04-09 周四 09:40:08
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-10 周五 16:26:37
 */

import { store } from '@/store';

/**
 * 位置model
 * @type {IPositionModel}
 */
const position: IPositionModel = {
  state: {
    autoPositions: [],
    searchPositions: []
  },
  reducers: {
    updateState(state, payload) {
      return {
        ...state,
        ...payload
      };
    }
  },
  effects: {
    async setState(payload: Partial<IPositionState>) {
      store.dispatch.position.updateState(payload);
    }
  }
};

export default position;
