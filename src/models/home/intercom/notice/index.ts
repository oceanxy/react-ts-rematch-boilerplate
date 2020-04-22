/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲通知model
 * @Date: 2020-04-22 周三 17:21:04
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-22 周三 17:21:04
 */

import { store } from '@/store';

const notice: IIntercomNoticeModel = {
  state: {
    active: false,
    value: ''
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
        const state = store.getState();

        reqPayload = {};
      }

      // const response = await fetchApis.fetchIntercomMembers(reqPayload);
      // store.dispatch.intercomMembers.updateState({data: response.data.interlocutorMemberList});
    },
    setState(payload) {
      console.log(payload.value);
      store.dispatch.intercomNotice.updateState(payload);
    }
  }
};

export default notice;
