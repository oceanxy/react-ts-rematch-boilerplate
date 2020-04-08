/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 高德地图行政区划边界组件
 * @Date: 2020-04-08 周三 14:36:42
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-08 周三 14:36:42
 */

import { Boundary } from '@/components/UI/amap';
import { Dispatch, iRootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: iRootState) => ({
  map: state.map.mapInstance,
  district: state.administrativeRegions.value
});

const mapDispatchToProps = (dispatch: Dispatch): any => ({
  setBounds: dispatch.administrativeRegions.updateBounds
});

export default connect(mapStateToProps, mapDispatchToProps)(Boundary);
