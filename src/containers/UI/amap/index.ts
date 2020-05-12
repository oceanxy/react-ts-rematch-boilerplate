/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: amap组件
 * @Date: 2020-03-31 周二 17:03:31
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-12 周二 09:58:16
 */

import AMap from '@/components/UI/amap';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';
import Boundary from './boundary';
import POI from './POI';

const mapStateToProps = (state: RootState) => ({
  state: state.map,
  mapFences: state.fence.mapFences,
  intercomGroupState: state.intercomGroup,
  curSelectedMonitorId: state.eventList.curSelectedMonitorId,
  triggers: state.displayContent.triggers
});

const mapDispatchToProps = (dispatch: Dispatch): any => ({
  dispatches: dispatch.map,
  setIntercomGroupState: dispatch.intercomGroup.setState,
  fenceDispatch: dispatch.fence
});

export { POI, Boundary };
export default connect(mapStateToProps, mapDispatchToProps)(AMap);
