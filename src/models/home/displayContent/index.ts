/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 显示内容model
 * @Date: 2020-04-23 周四 13:51:12
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-30 周四 10:09:06
 */

import { RootState, store } from '@/store';
import _ from 'lodash';

/**
 * 显示内容model
 * @type {{effects: {setState(payload: Partial<IDisplayContentState>): void}; reducers: {updateState(state: IDisplayContentState, payload: Partial<IDisplayContentState>): IDisplayContentState}; state: {isShow: {}}}}
 */
const displayContent: IDisplayContentModel = {
  state: {
    triggers: [
      {status: true, value: 1, text: '人员'},
      {status: true, value: 0, text: '车辆'},
      {status: true, value: 2, text: '物品'},
      {status: true, value: 9, text: '物资'},
      {status: true, value: 'area', text: '区域'}
    ]
  },
  reducers: {
    updateState(state: IDisplayContentState, payload: Partial<IDisplayContentState>): IDisplayContentState {
      return {
        ...state,
        ...payload
      };
    }
  },
  effects: {
    setState(payload: Partial<IDisplayContentState>): void {
      store.dispatch.displayContent.updateState(payload);
    },
    getCurTrigger(triggerName: string, rootState?: RootState): {trigger: ITrigger, index: number} {
      const {triggers} = rootState?.displayContent!;
      const index = _.findIndex(triggers, o => o.text === triggerName);
      return {trigger: triggers[index], index};
    }
  }
};

export default {displayContent};
