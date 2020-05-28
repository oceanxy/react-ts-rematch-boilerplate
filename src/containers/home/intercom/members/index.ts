/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲成员组件
 * @Date: 2020-04-21 周二 15:05:35
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-28 周四 13:56:05
 */

import IntercomMembers from '@/components/home/intercom/members';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  state: state.intercomMembers,
  curTempGroupState: state.intercomGroupName,
  isActiveIntercom: state.intercom.active,
  timing: state.intercomOperation.timing
});

const mapDispatchToProps = (dispatch: Dispatch): any => ({
  dispatches: dispatch.intercomMembers,
  setTemporaryGroupState: dispatch.temporaryGroup.setState
});

export default connect(mapStateToProps, mapDispatchToProps)(IntercomMembers);