/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲成员model
 * @Date: 2020-04-21 周二 11:15:11
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-26 周二 09:53:46
 */

import fetchApis from '@/apis';
import { APIResponse } from '@/interfaces/api/mock';
import { LogType } from '@/models/UI/log';
import { store } from '@/store';

const members: IIntercomMembersModel = {
  state: {
    data: [],
    loading: false
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
          intercomGroupId: state.intercomGroupName.intercomId,
          interlocutorStatus: 0
        };
      }

      store.dispatch.intercomMembers.updateState({ loading: true });
      const response = await fetchApis.fetchIntercomMembers(reqPayload);
      store.dispatch.intercomMembers.updateState({
        data: response?.data?.interlocutorMemberList || [],
        loading: false
      });
    },
    setState(payload: Partial<IIntercomMembersState>) {
      store.dispatch.intercomMembers.updateState(payload);
    },
    async removeMember(member) {
      const { intercomId, id } = store.getState().intercomGroupName;

      // 调用第三方接口
      store.dispatch.monitoringDispatch.removeTempGroupMember({
        tempGroupId: intercomId,
        tempGroupMemberMsIdList: [member.userId]
      });

      // 调用平台接口，维护平台后台的数据
      // 以下代码应该写在第三方删除成员事件里，但第三方未提供
      const response = await fetchApis.removeMember(<IIntercomRemoveMembersRequest>{
        intercomGroupId: intercomId,
        userIds: member.userId
      });

      if (+response.retCode === 0) {
        // 调用增加日志接口
        await store.dispatch.log.addLog({ type: LogType.ExitIntercomGroup, id });
        // 刷新对讲面板成员列表
        store.dispatch.intercomMembers.fetchData();
      }

      return response;
    },
    async addMember(memberIds: number[]): Promise<APIResponse> {
      const { id, intercomId } = store.getState().intercomGroupName;

      const response = await fetchApis.addMember(<IIntercomAddMembersRequest>{
        intercomGroupId: intercomId,
        userIds: memberIds
      });

      if (+response.retCode === 0) {
        // 刷新对讲成员数据
        store.dispatch.intercomMembers.fetchData();
        // 操作成功后添加新增成员的日志
        await store.dispatch.log.addLog({ type: LogType.AddIntercomGroup, id });
      }

      return response;
    }
  }
};

export default members;
