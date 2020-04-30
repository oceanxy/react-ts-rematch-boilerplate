/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 实体（监控对象）model
 * @Date: 2020-04-09 周四 09:40:08
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-10 周五 16:26:37
 */

import fetchApis from '@/apis';
import { APIResponse } from '@/interfaces/api/mock';
import { store } from '@/store';

const defaultData: IEntity = {
  monitorId: '',
  monitorName: '',
  monitorType: -1,
  assignmentName: '',
  deviceNum: 0,
  groupName: '',
  simCardNum: 0,
  userId: undefined
};

/**
 * 实体model
 * @type {IEntityModel}
 */
const entity: IEntityModel = {
  state: {
    entities: [],
    searchEntities: [],
    currentEntityId: ''
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
      const response = await fetchApis.fetchSearchByMonitorName(reqPayload);
      // 按实体名称搜索时（默认）
      let params: Partial<IEntityState> = {searchEntities: response.data.monitors || []};

      // 根据搜索条件更新对应的状态
      if (!reqPayload.simpleQueryParam) {
        // 获取全部围栏时
        params = {entities: response.data.fenceTreeNodes || []};
      }

      store.dispatch.entity.updateState(params);
    },
    async fetchDataByCircle(reqPayload): Promise<APIResponse<{monitors: IEntity[]}>> {
      if (!reqPayload) {
        const temporaryGroup = store.getState().temporaryGroup.backFillInfo;

        reqPayload = {
          supportMonitorType: -1,
          onlineStatus: 1,
          radius: temporaryGroup.radius!,
          longitude: temporaryGroup.longitude!,
          latitude: temporaryGroup.latitude!
        };
      }

      return await fetchApis.fetchEntityByCircle(reqPayload);
    },
    setEntityId(id): void {
      store.dispatch.entity.updateState({currentEntityId: id || ''});
    }
  }
};

export { defaultData };
export default entity;
