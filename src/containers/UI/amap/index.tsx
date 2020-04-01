/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: amap组件
 * @Date: 2020-03-31 周二 17:03:31
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-03-31 周二 17:03:31
 */

import AMap from '@/components/UI/amap';
import { Dispatch, iRootState } from '@/store';
import { connect } from 'react-redux';
import POI from './POI';

const mapStateToProps = (state: iRootState) => state.map;
const mapDispatchToProps = (dispatch: Dispatch): any => ({
  updateMapInstance: dispatch.map.updateMapInstance
});

export { POI };
export default connect(mapStateToProps, mapDispatchToProps)(AMap);
