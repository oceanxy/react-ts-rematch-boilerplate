/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲model入口
 * @Date: 2020-04-21 周二 11:08:07
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-21 周二 11:08:07
 */

import { store } from '@/store';
import intercomGroup, { CurActiveGroupType } from './group';
import intercomMembers from './members';
import intercomOperation from './operation';

const intercom: IIntercomModel = {
  state: {
    active: false
  },
  reducers: {
    updateState(state: IIntercomState, payload: Partial<IIntercomState>): IIntercomState {
      return {
        ...state,
        ...payload
      };
    }
  },
  effects: {
    setState(payload): void {
      store.dispatch.intercom.updateState(payload);
    }
  }
};

export default {intercom, intercomGroup, intercomMembers, intercomOperation};
