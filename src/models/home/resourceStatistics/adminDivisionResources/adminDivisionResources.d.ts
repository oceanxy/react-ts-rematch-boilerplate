/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 行政区划内资源模块类型定义文件
 * @Date: 2020-04-10 周五 16:36:57
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-26 周二 11:39:18
 */

import LngLat = AMap.LngLat;
import { ModelConfig } from '@rematch/core';

declare global {
  /**
   * 按行政区划统计资源模块请求参数
   */
  interface IAdminDivisionResourcesRequest extends IResourceStatisticsRequest {
    /**
     * 行政区块边界值
     * 多个边界值数组用“-”隔开
     */
    administrativeLngLat: string
  }

  /**
   * 按行政区划统计资源状态
   */
  interface IAdminDivisionResourcesState {
    /**
     * 渲染图表的数据
     */
    data: IResourceStatisticsData
    /**
     * 当前行政区划级联数据
     * 依次为 省/直辖市、市、区/县
     */
    value: [string?, string?, string?]
    /**
     * 地区编码
     */
    adcode: number
    /**
     * 当前选中的行政区划的边界值（来自高德地图）
     */
    bounds: LngLat[][] | undefined
  }

  /**
   * 区域内资源model接口
   */
  interface IAdminDivisionResourcesModel extends ModelConfig {
    state: IAdminDivisionResourcesState
    reducers: {
      updateState(state: IAdminDivisionResourcesState, payload: Partial<IAdminDivisionResourcesState>): IAdminDivisionResourcesState
    }
    effects: {
      fetchData(reqPayload?: IAdminDivisionResourcesRequest): void
      resetState(payload?: Partial<IAdminDivisionResourcesState>): void
    }
  }
}