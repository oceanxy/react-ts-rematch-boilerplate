/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: amap组件
 * @Date: 2020-03-31 周二 17:03:31
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-07 周四 10:59:37
 */

import AMap from '@/components/UI/amap';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';
import Boundary from './boundary';
import POI from './POI';

const mapStateToProps = (state: RootState) => ({
  state: state.map
});

const mapDispatchToProps = (dispatch: Dispatch): any => ({
  dispatches: dispatch.map
});

export { POI, Boundary };
export default connect(mapStateToProps, mapDispatchToProps)(AMap);
