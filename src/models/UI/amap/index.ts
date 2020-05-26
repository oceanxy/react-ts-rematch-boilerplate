/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 地图model
 * @Date: 2020-03-31 周二 17:03:31
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-18 周一 16:14:36
 */

import fetchApis from '@/apis';
import { APIResponse } from '@/interfaces/api/mock';
import { EntityType } from '@/models/UI/entity';
import { RootState, store } from '@/store';

/**
 * 鼠标工具类型
 */
export enum MouseToolType {
  Null = '',
  Circle = 'Circle',
  Polygon = 'Polygon',
  Polyline = 'Polyline',
  Rectangle = 'Rectangle'
}

/**
 * 地图model
 * @type {{reducers: {updateMapInstance: (state: IMapState, map: AMap.Map) => {mapInstance: AMap.Map | null; map: AMap.Map}}; state: IMapState}}
 */
const map: IAMapModel = {
  state: {
    mapInstance: null,
    overlay: undefined,
    mouseToolType: MouseToolType.Null,
    curMassPoint: undefined,
    curArea: undefined,
    massPoints: {
      positionList: [],
      iconSortList: []
    }
  },
  reducers: {
    updateState: (state: IAMapState, payload: Partial<IAMapState>): IAMapState => ({
      ...state,
      ...payload
    })
  },
  effects: {
    setState(payload: Partial<IAMapState>, state): void {
      if ('curMassPoint' in payload && payload.curMassPoint && !state?.eventList.curSelectedEvent?.eventId) {
        // 当点击海量点时，任务列表model的queryType（任务查询方式）状态有且仅有一个固定值：0
        store.dispatch.taskList.setState({queryType: 0});
      }

      store.dispatch.map.updateState(payload);
    },
    clearCurMassPoint() {
      store.dispatch.map.updateState({curMassPoint: undefined});
      // 清空当前海量点弹窗信息时，任务列表model的queryType（任务查询方式）状态有且仅有一个固定值：-1
      store.dispatch.taskList.setState({queryType: -1});
      // 检测是否有事件被选中
      if (!store.getState().eventList.curSelectedEvent?.eventId) {
        // 当前海量点信息变更后，重新请求任务列表（当前未选中事件和海量点，应请求全部任务数据）
        store.dispatch.taskList.fetchData({queryType: -1, selectFirstData: true});
      }
    },
    async fetchMassPoint(monitorType?: IEntity['monitorType'][], state?: RootState) {
      if (!monitorType) {
        monitorType = state!.displayContent.triggers.reduce((statusArr, trigger) => {
          if (trigger.status && trigger.value !== 'area') {
            statusArr.push(trigger.value);
          }

          return statusArr;
        }, [] as EntityType[]);
      }

      // 至少需要显示一种类型时，发送请求
      if (monitorType?.length) {
        const response: APIResponse<MassPointResponse> = await fetchApis.fetchMassPoint({monitorType});

        store.dispatch.map.updateState({
          massPoints: {
            positionList: response.data.positionList || [],
            iconSortList: response.data.iconSortList || []
          }
        });
      } /** 全部关闭时不发送请求，直接清空地图上的点 */ else {
        store.dispatch.map.updateState({
          massPoints: {
            positionList: [],
            iconSortList: []
          }
        });
      }

    },
    async fetchWindowInfo(reqPayload?: InfoWindowRequest): Promise<APIResponse<InfoWindowResponse>> {
      if (!reqPayload) {
        const {monitorId} = store.getState().eventList.curSelectedEvent!;

        if (monitorId) {
          reqPayload = {monitorId};
        } else {
          throw new Error('获取地图弹窗信息的参数有误，请确认！');
        }
      }

      return await fetchApis.fetchWindowInfo(reqPayload);
    }
  }
};

export default map;
