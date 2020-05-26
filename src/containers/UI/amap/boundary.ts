/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 高德地图行政区划边界组件
 * @Date: 2020-04-08 周三 14:36:42
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-26 周二 11:39:11
 */

import { Boundary } from '@/components/UI/amap';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  map: state.map.mapInstance,
  adcode: state.adminDivisionResources.adcode
});

const mapDispatchToProps = (dispatch: Dispatch): any => ({
  updateState: dispatch.adminDivisionResources.updateState
});

export default connect(mapStateToProps, mapDispatchToProps)(Boundary);
