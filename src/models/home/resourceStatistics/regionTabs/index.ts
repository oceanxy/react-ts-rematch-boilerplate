/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 资源统计tab组件model-切换区域统计方式
 * @Date: 2020-04-08 周三 10:39:58
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-08 周三 10:39:58
 */

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
 * 按区域统计资源tab切换model
 * @type {IRegionTabsModel}
 */
const regionTabs: IRegionTabsModel = {
  state: {
    currentType: ERegionSRType.AR
  },
  reducers: {
    updateType: (state, type) => ({
      ...state,
      currentType: type
    })
  }
};

export default regionTabs;
