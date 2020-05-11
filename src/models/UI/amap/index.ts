/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 地图model
 * @Date: 2020-03-31 周二 17:03:31
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-11 周一 09:56:55
 */

import fetchApis from '@/apis';
import { APIResponse } from '@/interfaces/api/mock';
import { store } from '@/store';

/**
 * 地图model
 * @type {{reducers: {updateMapInstance: (state: IMapState, map: AMap.Map) => {mapInstance: AMap.Map | null; map: AMap.Map}}; state: IMapState}}
 */
const map: IAMapModel = {
  state: {
    mapInstance: null,
    mouseToolType: null,
    callback: undefined,
    curMassPoint: undefined,
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
    setState(payload: Partial<IAMapState>): void {
      store.dispatch.map.updateState(payload);
    },
    clearCurMassPoint() {
      store.dispatch.map.updateState({curMassPoint: undefined});
    },
    async fetchMassPoint(monitorType: IEntity['monitorType']) {
      const response: APIResponse<MassPointResponse> = await fetchApis.fetchMassPoint(monitorType);

      store.dispatch.map.updateState({
        massPoints: {
          positionList: response.data.positionList || [],
          iconSortList: response.data.iconSortList || []
        }
      });
    },
    async fetchWindowInfo(reqPayload?: InfoWindowRequest): Promise<APIResponse<InfoWindowResponse>> {
      if (!reqPayload) {
        const {curSelectedMonitorId} = store.getState().eventList;

        reqPayload = {
          monitorId: curSelectedMonitorId
        };
      }

      return await fetchApis.fetchWindowInfo(reqPayload);
    }
  }
};

export default map;
