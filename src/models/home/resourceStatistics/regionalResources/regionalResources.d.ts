/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 区域内资源，区域下拉框类型定义文件
 * @Date: 2020-04-10 周五 10:08:23
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-10 周五 10:08:23
 */

import { ModelConfig } from '@rematch/core';

declare global {
  /**
   * 按区域统计资源模块请求参数
   */
  interface IRegionalResourcesRequest extends IResourceStatisticsRequest {
    /**
     * 围栏ID。多个用逗号隔开
     */
    fenceIds?: string
  }

  /**
   * 按区域统计资源状态
   */
  interface IRegionalResourcesState {
    /**
     * 区域呃逆资源柱状图数据
     */
    data: IResourceStatisticsData
  }

  /**
   * 区域内资源model接口
   */
  interface IRegionalResourcesModel extends ModelConfig {
    state: IRegionalResourcesState
    reducers: {
      updateData(state: IRegionalResourcesState, data: IResourceStatisticsData): IRegionalResourcesState
    },
    effects: {
      fetchData(reqPayload?: IRegionalResourcesRequest): void
    }
  }
}
