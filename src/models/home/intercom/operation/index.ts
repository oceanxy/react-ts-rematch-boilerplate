/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 操作对讲model
 * @Date: 2020-04-21 周二 11:14:41
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-21 周二 11:14:41
 */

import { CallModeEnum, ControlCmd, GroupIDTypeEnum, UserIDTypeEnum } from '@/models/UI/monitoringDispatch';
import { store } from '@/store';

const operation: IIntercomOperationModel = {
  state: {},
  reducers: {},
  effects: {
    async intercomGroupCall(callMode: CallModeEnum) {
      const state = store.getState();
      const {
        intercomGroup: {intercomId}
      } = state;

      const request = {
        callMode: callMode,
        targetIdType: callMode === CallModeEnum.GROUP_CALL_MODE ?
          GroupIDTypeEnum.GROUP_ID_TYPE_ID :
          UserIDTypeEnum.USER_ID_TYPE_ID,
        targetId: intercomId
      };

      store.dispatch.monitoringDispatch.startCalling(request);
    },
    async stopIntercomGroupCall() {
      store.dispatch.monitoringDispatch.stopCalling();
    },
    entityControl(request: RemoteControlMsRequest): void {
      if (!request) {
        request = {
          controlCmd: ControlCmd.BAN,
          targetMsId: store.getState().intercomGroup.intercomId
        };
      }

      store.dispatch.monitoringDispatch.remoteControlMs(request);
    }
  }
};

export default operation;
