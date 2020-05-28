/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲面板model、对讲model入口
 * @Date: 2020-04-21 周二 11:08:07
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-21 周二 11:08:07
 */

import { store } from '@/store';
import intercomGroupName, { CurActiveGroupType } from './groupName';
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
    setActive(active: boolean, state): void {
      store.dispatch.intercom.updateState({active});
      const {intercomId} = state?.intercomGroupName;

      if (!active) {
        store.dispatch.intercomGroupName.updateState({
          name: '',
          id: '',
          intercomId: -1,
          curActiveGroupType: CurActiveGroupType.Null
        });

        // 调用第三方退出群组接口
        store.dispatch.monitoringDispatch.exitGroup({groupId: intercomId});
      } else {
        // 调用第三方加入群组接口
        store.dispatch.monitoringDispatch.joinGroup({groupId: intercomId});
      }
    }
  }
};

export default {intercom, intercomGroupName, intercomMembers, intercomOperation, intercomNotice};
