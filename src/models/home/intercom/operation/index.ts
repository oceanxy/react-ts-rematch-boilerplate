/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 操作对讲model
 * @Date: 2020-04-21 周二 11:14:41
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-21 周二 11:14:41
 */

import { CallModeEnum, GroupIDTypeEnum } from '@/models/UI/monitoringDispatch';
import { store } from '@/store';

const operation: IIntercomOperationModel = {
  state: {},
  reducers: {},
  effects: {
    async intercomGroupCall(request: StartCallingRequest) {
      const state = store.getState();
      const {
        intercomGroup: {intercomId}
      } = state;

      if (!request) {
        request = {
          callMode: CallModeEnum.GROUP_CALL_MODE,
          targetIdType: GroupIDTypeEnum.GROUP_ID_TYPE_ID,
          targetId: intercomId
        };
      }

      store.dispatch.monitoringDispatch.startCalling(request);
    },
    async stopIntercomGroupCall() {
      store.dispatch.monitoringDispatch.stopCalling();
    }
  }
};

export default operation;
