/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 面板控制model
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-19 周二 10:52:12
 */

import { store } from '@/store';

/**
 * 位置model
 * @type {IPositionModel}
 */
const panelControl: IPanelControlModel = {
  state: {
    loading: false,
    showPanel: true
  },
  reducers: {
    updateState(state: IPanelControlState, payload: Partial<IPanelControlState>): IPanelControlState {
      return {
        ...state,
        ...payload
      };
    }
  },
  effects: {
    setState(payload: Partial<IPanelControlState>) {
      store.dispatch.panelControl.updateState(payload);
    }
  }
};

export default panelControl;
