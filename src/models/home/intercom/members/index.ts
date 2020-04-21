/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲成员model
 * @Date: 2020-04-21 周二 11:15:11
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-21 周二 11:15:11
 */

import fetchApis from '@/apis';
import { store } from '@/store';

const members: IIntercomMembersModel = {
  state: {
    data: []
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
    async fetchData(reqPayload) {
      if (!reqPayload) {
        reqPayload = {
          // TODO 获取对讲群组ID
          intercomGroupId: '',
          interlocutorStatus: 0
        };
      }

      const response = await fetchApis.fetchIntercomMembers(reqPayload);
      store.dispatch.intercomMembers.updateState(response.data.interlocutorMemberList);
    }
  }
};

export default members;
