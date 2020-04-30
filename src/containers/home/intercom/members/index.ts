/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲成员组件
 * @Date: 2020-04-21 周二 15:05:35
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-30 周四 09:12:17
 */

import IntercomMembers from '@/components/home/intercom/members';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  curTempGroupState: state.intercomGroup,
  state: state.intercomMembers,
  isActiveIntercom: state.intercom.active
});

const mapDispatchToProps = (dispatch: Dispatch): any => ({
  dispatches: dispatch.intercomMembers,
  setTempGroupState: dispatch.temporaryGroup.setState,
  setAMapState: dispatch.map.setState
});

export default connect(mapStateToProps, mapDispatchToProps)(IntercomMembers);