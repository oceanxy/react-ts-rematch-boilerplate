/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 搜索model
 * @Date: 2020-03-26 18:07:35
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-13 周一 16:21:40
 */

import { IconSource, IconSourceHover } from '@/components/UI/iconComp';
import { store } from '@/store';

/**
 * 搜索条件
 */
export enum SearchCondition {
  ENTITY = 'ENTITY',
  AREA = 'AREA',
  POSITION = 'POSITION'
}

/**
 * 监控调度对象类型与图标的映射
 */
export const monitorTypeIcon: {[K: string]: IconSource | IconSourceHover} = {
  '0': IconSource.CAR,
  '1': IconSource.PEOPLE,
  '2': IconSource.THING,
  '9': IconSource.THING,
  '10': IconSource.PEOPLE,
  '0_hover': IconSourceHover.CAR,
  '1_hover': IconSourceHover.PEOPLE,
  '2_hover': IconSourceHover.THING,
  '9_hover': IconSourceHover.THING,
  '10_hover': IconSourceHover.PEOPLE,
  zw_m_circle: IconSource.CIRCLE,
  zw_m_circle_hover: IconSourceHover.CIRCLE,
  zw_m_line: IconSource.LINE,
  zw_m_line_hover: IconSourceHover.LINE,
  zw_m_polygon: IconSource.POLYGON,
  zw_m_polygon_hover: IconSourceHover.POLYGON,
  zw_m_marker: IconSource.POINT,
  zw_m_marker_hover: IconSourceHover.POINT,
  zw_m_administration: IconSource.REGIONS,
  zw_m_administration_hover: IconSourceHover.REGIONS,
  location: IconSource.LOCATION,
  location_hover: IconSourceHover.LOCATION
};

/**
 * 搜索组件model
 */
const search: ISearchModel = {
  state: {
    searchCondition: SearchCondition.ENTITY,
    searchKeyword: ''
  },
  reducers: {
    updateState: (state, payload) => ({
      ...state,
      ...payload
    })
  },
  effects: {
    async fetchData(payload: ISearchRequest) {
      switch (payload.condition) {
        case SearchCondition.AREA:
          await store.dispatch.fence.fetchData(payload.params);
          break;
        case SearchCondition.POSITION:
          break;
        case SearchCondition.ENTITY:
        default:
          await store.dispatch.entity.fetchData(payload.params);
          break;
      }
    },
    async setState(payload) {
      store.dispatch.search.updateState(payload);
    },
    async clearData() {
      store.dispatch.fence.updateState({searchFences: []});
      store.dispatch.entity.updateState({searchEntities: []});
      store.dispatch.position.updateState({searchPositions: []});
    }
  }
};

export default search;
