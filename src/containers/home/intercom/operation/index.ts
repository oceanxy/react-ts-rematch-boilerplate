/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 操作对讲组件
 * @Date: 2020-04-21 周二 15:05:35
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-23 周四 10:47:39
 */

import IntercomOperation from '@/components/home/intercom/operarion';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  curActiveGroupType: state.intercomGroup.curActiveGroupType,
  intercomNoticeState: state.intercomNotice
});

const mapDispatchToProps = (dispatch: Dispatch): any => ({
  intercomNoticeDispatch: dispatch.intercomNotice,
  dispatches: dispatch.intercomOperation
});

export default connect(mapStateToProps, mapDispatchToProps)(IntercomOperation);