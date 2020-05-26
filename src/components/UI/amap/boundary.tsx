/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 高德地图行政区划边界组件
 * @Date: 2020-04-08 周三 14:39:55
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-26 周二 11:23:54
 */

import _ from 'lodash';
import { useEffect } from 'react';
import SearchResult = AMap.DistrictSearch.SearchResult;

/**
 * 位置搜索接口
 */
export interface IBoundaryProps {
  map: AMap.Map
  adcode: IAdminDivisionResourcesState['adcode']
  getAdminRegionsData: IAdminDivisionResourcesModel['effects']['fetchData']
  updateState: IAdminDivisionResourcesModel['effects']['resetState']
}

let districtSearch: any;

/**
 * 行政区划边界组件
 * @param {IBoundaryProps} props
 * @returns {any}
 * @constructor
 */
const Boundary = (props: Partial<IBoundaryProps>) => {
  const {map, adcode, updateState} = props;

  useEffect(() => {
    if (!districtSearch && map) {
      AMap.plugin('AMap.DistrictSearch', () => {
        // 创建行政区查询对象
        districtSearch = new AMap.DistrictSearch({
          extensions: 'all',
          subdistrict: 0,
          showbiz: false
        });
      });
    }

    // 检测地图是否实例化完成且行政区划值有意义
    if (adcode && districtSearch) {
      // 获取边界信息
      districtSearch.search(adcode, (status: any, result: SearchResult | string) => {
        if (_.isPlainObject(result)) {
          const bounds = (result as SearchResult).districtList[0].boundaries;
          updateState!({bounds});
        }
      });
    }
  }, [adcode]);

  return null;
};

export default Boundary;
