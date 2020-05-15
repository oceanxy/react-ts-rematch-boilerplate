/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: amap组件
 * @Date: 2020-03-31 周二 17:03:31
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-15 周五 16:41:52
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
  triggers: state.displayContent.triggers,
  searchPanelTarget: state.search.target,
  overlay: state.map.overlay
});

const mapDispatchToProps = (dispatch: Dispatch): any => ({
  dispatch: dispatch.map,
  setIntercomGroupState: dispatch.intercomGroup.setState,
  fenceDispatch: dispatch.fence,
  setSearchState: dispatch.search.setState,
  setTempGroupState: dispatch.temporaryGroup.setState
});

export { POI, Boundary };
export default connect(mapStateToProps, mapDispatchToProps)(AMap);
