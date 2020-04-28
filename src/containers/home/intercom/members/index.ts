/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲成员组件
 * @Date: 2020-04-21 周二 15:05:35
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-28 周二 13:58:37
 */

import IntercomMembers from '@/components/home/intercom/members';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  curTempGroupState: state.intercomGroup,
  data: state.intercomMembers.data,
  isActiveIntercom: state.intercom.active
});

const mapDispatchToProps = (dispatch: Dispatch): any => ({
  fetchData: dispatch.intercomMembers.fetchData,
  removeMember: dispatch.intercomMembers.removeMember,
  addMember: dispatch.intercomMembers.addMember,
  setTempGroupState: dispatch.temporaryGroup.setState,
  setAMapState: dispatch.map.setState
});

export default connect(mapStateToProps, mapDispatchToProps)(IntercomMembers);