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

/**
 * 实体（监控对象）类型
 */
export enum EntityType {
  /**
   * 车
   * @type {number}
   */
  Car = 0,
  /**
   * 人
   * @type {number}
   */
  People = 1,
  /**
   * 动态物品
   * @type {number}
   */
  Thing = 2,
  /**
   * 静态物资
   * @type {number}
   */
  Supplies = 9,
  /**
   * 调度员
   * @type {number}
   */
  Dispatcher = 10
}

/**
 * 实体model
 * @type {IEntityModel}
 */
const entity: IEntityModel = {
  state: {
    entities: [],
    searchEntities: [],
    currentEntityId: '',
    byCondition: false
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
    async fetchDataByRectangle(reqPayload?: IEntityByRectangleRequest): Promise<APIResponse<{monitors: IEntity[]}>> {
      if (!reqPayload) {
        const {northWest, southEast} = store.getState().temporaryGroup.backFillInfo;

        reqPayload = {
          supportMonitorType: -1,
          onlineStatus: 1,
          leftLatitude: northWest!.getLat(),
          leftLongitude: northWest!.getLng(),
          rightLatitude: southEast!.getLat(),
          rightLongitude: southEast!.getLng()
        };
      }

      return await fetchApis.fetchEntityByCircle(reqPayload);
    },
    async fetchFixedData(reqPayload?: IEntityRequest): Promise<APIResponse<{monitors: IEntity[]}>> {
      if (!reqPayload) {
        reqPayload = {
          length: 2000,
          supportMonitorType: -1
        };
      }

      return await fetchApis.fetchFixedEntity(reqPayload);
    },
    async fetchConditionData(reqPayload): Promise<APIResponse<{monitors: IEntity[]}>> {
      const {latitude, longitude, radius} = store.getState().temporaryGroup.backFillInfo;
      const request: IEntityByCondition & IEntityByCircleRequest = {
        length: 2000,
        supportMonitorType: -1,
        ageRange: [20, 40],
        radius: radius!,
        latitude: latitude!,
        longitude: longitude!,
        ...reqPayload
      };

      return await fetchApis.fetchFixedConditionEntity(request);
    },
    async fetchConditionForEntity(): Promise<APIResponse<IConditionForEntityResponse>> {
      return await fetchApis.fetchConditionForEntity();
    },
    setState(payload): void {
      store.dispatch.entity.updateState(payload);
    }
  }
};

export default entity;
