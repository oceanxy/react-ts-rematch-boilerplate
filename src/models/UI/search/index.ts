/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 搜索model
 * @Date: 2020-03-26 18:07:35
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-09 周四 16:59:25
 */

import fetchApis from '@/apis';
import { IconSource, IconSourceHover } from '@/components/UI/iconComp';
import { store } from '@/store';
import { ModelConfig } from '@rematch/core';

// 请求参数
export type IMonitoredRequest = {
  /**
   * 监控对象名称关键字
   */
  simpleQueryParam: string;
  /**
   * 起始记录 默认为0
   */
  start?: number;
  /**
   * 返回记录数 默认为10
   */
  length?: number;
  /**
   * 多个用逗号隔开, -1 全部 0：车 1 :人 2 :动态物品 9:静态物资 10:调度员
   */
  supportMonitorType: -1 | 0 | 1 | 2 | 9 | 10;
};

/**
 * 搜索条件
 */
export enum SearchCondition {
  ENTITY = 'ENTITY',
  AREA = 'AREA',
  POSITION = 'POSITION'
}

/**
 * 获取搜索数据参数接口
 */
export interface ISearchRequest {
  params: IMonitoredRequest | IFencesRequest;
  condition: SearchCondition;
}

/**
 * 监控对象接口
 */
export interface IMonitor {
  /**
   * 监控对象ID
   */
  monitorId: string;
  /**
   * 监控对象名称
   */
  monitorName: string;
  /**
   * 监控对象类型
   * 0：车；1：人；2：物；9：静态物资；10：调度员
   */
  monitorType: 0 | 1 | 2 | 9 | 10;
  /**
   * 所属分组名称
   */
  assignmentName: string;
  /**
   * 设备号
   */
  deviceNum: number;
  /**
   * 所属组织名称
   */
  groupName: string;
  /**
   * SIM卡号
   */
  simCardNum: number;
  /**
   * 对讲平台使用的监控对象ID
   */
  userId: number | string;
}

/**
 * POI接口
 */
export interface IPOI extends AMap.Autocomplete.Tip {}

/**
 * 搜索组件model接口
 */
export interface ISearchState {
  /**
   * 按对象（监控对象名称）搜索的数据列表
   */
  monitorList: IMonitor[];
  /**
   * POI数据
   */
  POIList: IPOI[];
  /**
   * 搜索条件
   */
  searchCondition?: SearchCondition;
  /**
   * 搜索关键字
   */
  searchKeyword: string;
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
const search: ModelConfig = {
  state: <ISearchState> {
    monitorList: [],
    POIList: [],
    searchCondition: SearchCondition.ENTITY,
    searchKeyword: ''
  },
  reducers: {
    updateMonitorData(state, data) {
      return {
        ...state,
        monitorList: data || []
      };
    },
    updatePOIData(state, data) {
      return {
        ...state,
        POIList: data || []
      };
    },
    updateSearchCondition: (state, searchCondition: SearchCondition) => ({
      ...state,
      searchCondition
    }),
    updateSearchKeyword: (state, searchKeyword: string) => ({
      ...state,
      searchKeyword
    })
  },
  effects: {
    async fetchData(payload: ISearchRequest) {
      let response;

      switch (payload.condition) {
        case SearchCondition.AREA:
          await store.dispatch.fence.fetchData(payload.params);
          break;
        case SearchCondition.POSITION:
          break;
        case SearchCondition.ENTITY:
        default:
          response = await fetchApis.fetchSearchByMonitorName(payload.params);
          this.updateMonitorData(response.data.monitors);
          break;
      }
    },
    async clearData() {
      store.dispatch.fence.updateFences({searchFences: []});
      store.dispatch.search.updateMonitorData();
      store.dispatch.search.updatePOIData();
    }
  }
};

export default search;
