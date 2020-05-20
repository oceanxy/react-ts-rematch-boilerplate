/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 临时组model
 * @Date: 2020-04-23 周四 13:51:12
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-15 周五 09:23:40
 */

import fetchApis from '@/apis';
import { APIResponse } from '@/interfaces/api/mock';
import { MouseToolType } from '@/models/UI/amap';
import { store } from '@/store';

/**
 * 临时组的临时状态
 * @type {{isShowEditModal: boolean; backFillInfo: {}; loading: boolean; title: string}}
 */
const tempState = {
  isShowEditModal: false,
  backFillInfo: {name: undefined},
  loading: false,
  title: ''
};

/**
 * 临时组model
 * @type {{effects: {fetchData(): Promise<void>; setState(payload: Partial<ITemporaryGroupState>): void}; reducers: {updateState(state: ITemporaryGroupState, payload: Partial<ITemporaryGroupState>): ITemporaryGroupState}; state: {data: any[]}}}
 */
const temporaryGroup: ITemporaryGroupModel = {
  state: {
    data: [],
    ...tempState
  } as ITemporaryGroupState,
  reducers: {
    updateState(state: ITemporaryGroupState, payload: Partial<ITemporaryGroupState>): ITemporaryGroupState {
      const {backFillInfo, ...rest} = payload;

      // 如果backFillInfo不内存在name，则起合并store中的name到此对象
      if ('backFillInfo' in payload && !('name' in backFillInfo!)) {
        return {
          ...state,
          ...rest,
          backFillInfo: {
            ...backFillInfo,
            name: state.backFillInfo.name
          }
        };
      }

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
      // 检测是否是关闭对话框动作，做相应的状态处理
      if ('isShowEditModal' in payload && !payload.isShowEditModal) {
        const {entity, map} = store.dispatch;

        // 清空本组件状态
        payload = tempState;
        // 清空实体model按固定条件选择的状态
        entity.setState({byCondition: false});
        // 清空地图覆盖物及mouseToolType状态
        map.setState({overlay: undefined, mouseToolType: MouseToolType.Null});
      }

      store.dispatch.temporaryGroup.updateState(payload);
    },
    async unbindTemporaryGroup(intercomGroupId: number): Promise<APIResponse> {
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
