/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 资源统计-按区域统计资源
 * @Date: 2020-04-08 周三 10:16:36
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-08 周三 10:16:36
 */

import Region from '@/components/home/resourceStatistics/regions';
import { ERegionSRType } from '@/models/home/resourceStatistics/regionTabs';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => {
  const {currentType} = state.regionTabs;

  return {
    value: state.adminDivisionResources.value,
    bounds: state.adminDivisionResources.bounds,
    fenceId: state.fence.currentFenceId,
    type: currentType,
    data: currentType === ERegionSRType.AR ?
      state.adminDivisionResources.data :
      state.regionalResources.data
  };
};

const mapDispatchToProps = (dispatch: Dispatch): any => ({
  getARData: dispatch.adminDivisionResources.fetchData,
  getRRData: dispatch.regionalResources.fetchData
});

export default connect(mapStateToProps, mapDispatchToProps)(Region);
