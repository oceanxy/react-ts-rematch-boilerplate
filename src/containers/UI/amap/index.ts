/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: amap组件
 * @Date: 2020-03-31 周二 17:03:31
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-03-31 周二 17:03:31
 */

import AMap from '@/components/UI/amap';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';
import Boundary from './boundary';
import POI from './POI';

const mapStateToProps = (state: RootState) => state.map;
const mapDispatchToProps = (dispatch: Dispatch): any => ({
  updateMapInstance: dispatch.map.updateMapInstance
});

export { POI, Boundary };
export default connect(mapStateToProps, mapDispatchToProps)(AMap);
