/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 资源统计tab组件model-切换区域统计方式
 * @Date: 2020-04-08 周三 10:39:58
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-08 周三 10:39:58
 */

import { ModelConfig } from '@rematch/core';

/**
 * 按区域统计资源方式
 */
export enum ERegionSRType {
  /**
   * 按行政区域统计
   */
  AR,
  /**
   * 按区域（围栏）统计
   */
  FR
}

/**
 * 按区域统计资源tab切换State
 */
export interface IRegionTabsState {
  /**
   * 当前统计区域资源的方式
   */
  currentType: ERegionSRType
}

/**
 * 按区域统计资源tab切换model
 * @type {ModelConfig}
 */
const regionTabs: ModelConfig = {
  state: <IRegionTabsState> {
    currentType: ERegionSRType.AR
  },
  reducers: {
    updateType: (state: any, type: ERegionSRType) => {
      return {
        ...state,
        currentType: type
      };
    }
  }
};

export default regionTabs;
