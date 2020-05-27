/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 操作对讲组件
 * @Date: 2020-04-21 周二 15:05:35
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-27 周三 10:35:40
 */

import IntercomOperation from '@/components/home/intercom/operarion';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  intercomGroupNameState: state.intercomGroupName,
  intercomNoticeState: state.intercomNotice,
  curMassPoint: state.map.curMassPoint,
  state: state.intercomOperation,
  monitoringDispatchConfig: state.monitoringDispatch.config
});

const mapDispatchToProps = (dispatch: Dispatch): any => ({
  intercomNoticeDispatch: dispatch.intercomNotice,
  dispatches: dispatch.intercomOperation
});

export default connect(mapStateToProps, mapDispatchToProps)(IntercomOperation);