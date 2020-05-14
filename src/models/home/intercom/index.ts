/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲面板model、对讲model入口
 * @Date: 2020-04-21 周二 11:08:07
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-21 周二 11:08:07
 */

import { store } from '@/store';
import intercomGroup, { CurActiveGroupType } from './group';
import intercomMembers from './members';
import intercomNotice from './notice';
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
    },
    setActive(active: boolean): void {
      store.dispatch.intercom.updateState({active});

      if (!active) {
        store.dispatch.intercomGroup.updateState({
          name: '',
          id: '',
          intercomId: '',
          curActiveGroupType: CurActiveGroupType.Null
        });
      }
    }
  }
};

export default {intercom, intercomGroup, intercomMembers, intercomOperation, intercomNotice};
