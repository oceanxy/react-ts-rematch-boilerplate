/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲成员model
 * @Date: 2020-04-21 周二 11:15:11
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-21 周二 11:15:11
 */

import fetchApis from '@/apis';
import { LogType } from '@/models/UI/log';
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
        const state = store.getState();

        reqPayload = {
          intercomGroupId: state.intercomGroup.id,
          interlocutorStatus: 0
        };
      }

      const response = await fetchApis.fetchIntercomMembers(reqPayload);
      store.dispatch.intercomMembers.updateState({data: response.data.interlocutorMemberList});
    },
    async removeMember(member) {
      const {intercomId, id} = store.getState().intercomGroup;

      // 第三方接口
      store.dispatch.monitoringDispatch.removeTempGroupMember({
        tempGroupId: intercomId,
        tempGroupMemberMsIdList: [member.userId]
      });

      // 平台接口
      // 以下代码应该写在踢人事件里，但第三方未提供
      const response = await fetchApis.removeMember(<IIntercomRemoveMembersRequest> {
        intercomGroupId: id,
        interlocutorId: member.monitorId
      });

      if (response.retCode === 0) {
        await store.dispatch.log.addLog({type: LogType.ExitIntercomGroup, id});
        store.dispatch.intercomMembers.fetchData();
      }

      return response;
    },
    async addMember(member: IEntity) {
      const {intercomId, id} = store.getState().intercomGroup;

      // 第三方接口
      store.dispatch.monitoringDispatch.addTempGroupMember({
        tempGroupId: intercomId,
        tempGroupMemberMsIdList: [member.userId]
      });

      // 平台接口
      const response = await fetchApis.addMember(<IIntercomAddMembersRequest> {
        intercomGroupId: id,
        interlocutorIds: member.monitorId
      });

      if (response.retCode === 0) {
        await store.dispatch.log.addLog({type: LogType.AddIntercomGroup, id});
        store.dispatch.intercomMembers.fetchData();
      }

      return response;
    }
  }
};

export default members;
