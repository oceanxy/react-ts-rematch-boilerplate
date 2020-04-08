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
import { Dispatch, iRootState, store } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: iRootState) => {
  const {currentType} = state.regionTabs;

  return {
    type: currentType,
    // eventId: state.eventDetails.data.eventId, // 与事件联动需要这个值——事件ID，目前未联动
    data: currentType === ERegionSRType.AR ?
      state.administrativeRegions.data :
      state.regions.data
  };
};

const mapDispatchToProps = (dispatch: Dispatch): any => {
  const state = store.getState();
  const {currentType} = state.regionTabs;

  return {
    getData: currentType === ERegionSRType.AR ?
      dispatch.administrativeRegions.getData :
      dispatch.regions.getData
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Region);
