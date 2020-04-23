/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲通知model
 * @Date: 2020-04-22 周三 17:21:04
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-23 周四 10:42:05
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
    async sendData(reqPayload) {
      if (!reqPayload) {
        const state = store.getState();

        reqPayload = {
          // TODO 以下notice字段为临时占位，根据实际情况修改
          notice: state.intercomNotice.value
        };
      }

      console.log('调用第三方发送消息接口');
      // TODO 对接第三方对讲通知发送接口
      // const response = await fetchApis.fetchIntercomMembers(reqPayload);
      // store.dispatch.intercomMembers.updateState({data: response.data.interlocutorMemberList});

      // TODO 成功发送消息之后，关闭消息框
      store.dispatch.intercomNotice.updateState({active: false, value: ''});
    },
    setState(payload) {
      store.dispatch.intercomNotice.updateState(payload);
    }
  }
};

export default notice;
