/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 实体（监控对象）model
 * @Date: 2020-04-09 周四 09:40:08
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-20 周三 10:05:58
 */

import fetchApis from '@/apis';
import { APIResponse } from '@/interfaces/api/mock';
import { RootState, store } from '@/store';

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
 * 分组类型
 * 1：固定组 2：任务组 3：临时组
 */
export enum AssignmentType {
  FixedGroup = 1,
  TaskGroup = 2,
  TemporaryGroup = 3
}

/**
 * 分组类型对应文本
 */
export const AssignmentTypeText = ['', '固定组', '任务组', '临时组'];

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
          longitude: temporaryGroup.center?.getLng()!,
          latitude: temporaryGroup.center?.getLat()!,
          dispatchStatus: 1
        };
      }

      return await fetchApis.fetchEntityByCircle(reqPayload);
    },
    async fetchDataByRectangle(
      reqPayload?: IEntityByRectangleRequest,
      state?: RootState
    ): Promise<APIResponse<{monitors: IEntity[]}>> {
      if (!reqPayload) {
        const {northWest, southEast} = state!.temporaryGroup!.backFillInfo;

        reqPayload = {
          supportMonitorType: -1,
          onlineStatus: 1,
          leftLatitude: northWest!.getLat(),
          leftLongitude: northWest!.getLng(),
          rightLatitude: southEast!.getLat(),
          rightLongitude: southEast!.getLng(),
          dispatchStatus: 1
        };
      }

      return await fetchApis.fetchEntityByRectangle(reqPayload);
    },
    async fetchFixedData(reqPayload?: IEntityRequest): Promise<APIResponse<{monitors: IEntity[]}>> {
      if (!reqPayload) {
        reqPayload = {
          length: 2000,
          supportMonitorType: -1,
          dispatchStatus: 1
        };
      }

      return await fetchApis.fetchFixedEntity(reqPayload);
    },
    async fetchConditionData(reqPayload): Promise<APIResponse<{monitors: IEntity[]}>> {
      const {backFillInfo} = store.getState().temporaryGroup;
      const {center, radius} = backFillInfo;
      const request: IEntityByCondition & IEntityByCircleRequest = {
        length: 2000,
        supportMonitorType: -1,
        radius: radius!,
        latitude: center?.getLat()!,
        longitude: center?.getLng()!,
        dispatchStatus: 1,
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
