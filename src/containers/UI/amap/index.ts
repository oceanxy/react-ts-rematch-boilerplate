/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: amap组件
 * @Date: 2020-03-31 周二 17:03:31
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-12 周二 16:36:01
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
  searchPanelTarget: state.search.target
});

const mapDispatchToProps = (dispatch: Dispatch): any => ({
  dispatch: dispatch.map,
  setIntercomGroupState: dispatch.intercomGroup.setState,
  fenceDispatch: dispatch.fence,
  setSearchState: dispatch.search.setState
});

export { POI, Boundary };
export default connect(mapStateToProps, mapDispatchToProps)(AMap);
