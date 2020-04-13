/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 资源统计-统计资源切换tabs
 * @Date: 2020-04-13 周一 11:29:04
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-13 周一 11:29:04
 */
import { ERegionSRType } from '@/models/home/resourceStatistics/regionTabs';
import { ModelConfig } from '@rematch/core';

declare global {
  /**
   * 按区域统计资源tab切换State
   */
  interface IRegionTabsState {
    /**
     * 当前统计区域资源的方式
     */
    currentType: ERegionSRType
  }

  /**
   * 资源统计-统计资源切换tabs model
   */
  interface IRegionTabsModel extends ModelConfig {
    state: IRegionTabsState
    reducers: {
      updateType(state: IRegionTabsState, type: IRegionTabsState['currentType']): IRegionTabsState
    }
  }
}
