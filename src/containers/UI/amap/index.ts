/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: amap组件
 * @Date: 2020-03-31 周二 17:03:31
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-08 周五 15:01:34
 */

import AMap from '@/components/UI/amap';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';
import Boundary from './boundary';
import POI from './POI';

const mapStateToProps = (state: RootState) => ({
  state: state.map,
  intercomGroupState: state.intercomGroup,
  curSelectedMonitorId: state.eventList.curSelectedMonitorId
});

const mapDispatchToProps = (dispatch: Dispatch): any => ({
  dispatches: dispatch.map,
  setIntercomGroupState: dispatch.intercomGroup.setState
});

export { POI, Boundary };
export default connect(mapStateToProps, mapDispatchToProps)(AMap);
