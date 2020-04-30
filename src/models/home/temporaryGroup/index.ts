/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 临时组model
 * @Date: 2020-04-23 周四 13:51:12
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-30 周四 10:09:06
 */

import fetchApis from '@/apis';
import { APIResponse } from '@/interfaces/api/mock';
import { store } from '@/store';

/**
 * 临时组model
 * @type {{effects: {fetchData(): Promise<void>; setState(payload: Partial<ITemporaryGroupState>): void}; reducers: {updateState(state: ITemporaryGroupState, payload: Partial<ITemporaryGroupState>): ITemporaryGroupState}; state: {data: any[]}}}
 */
const temporaryGroup: ITemporaryGroupModel = {
  state: {
    data: [],
    isShowEditModal: false,
    backFillInfo: {},
    loading: false,
    title: ''
  },
  reducers: {
    updateState(state: ITemporaryGroupState, payload: Partial<ITemporaryGroupState>): ITemporaryGroupState {
      return {
        ...state,
        ...payload
      };
    }
  },
  effects: {
    async fetchData() {
      const response = await fetchApis.fetchTemporaryGroup();

      store.dispatch.temporaryGroup.updateState({data: response.data.temporaryGroupList});
    },
    setState(payload: Partial<ITemporaryGroupState>): void {
      store.dispatch.temporaryGroup.updateState(payload);
    },
    async unbindTemporaryGroup(intercomGroupId: string): Promise<APIResponse> {
      // 调用第三方解散临时组接口
      store.dispatch.monitoringDispatch.deleteTempGroup();

      // 调用平台后台的接口，维护平台的后台数据
      const response = await fetchApis.unbindTemporaryGroup({intercomGroupId});

      // 成功解散临时组后，刷新临时组数据
      store.dispatch.temporaryGroup.fetchData();

      return response;
    },
    async createTemporaryGroup(reqPayload) {
      // 调用第三方创建临时组接口
      store.dispatch.monitoringDispatch.createTempGroup({
        tempGroupName: reqPayload.temporaryGroup,
        tempGroupMemberMsIdList: reqPayload.userIds
      } as CreateTempGroupRequest);
    }
  }
};

export default {temporaryGroup};
