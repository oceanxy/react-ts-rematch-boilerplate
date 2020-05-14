/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲成员组件
 * @Date: 2020-04-21 周二 15:05:35
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-14 周四 17:09:44
 */

import IntercomMembers from '@/components/home/intercom/members';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  state: state.intercomMembers,
  curTempGroupState: state.intercomGroup,
  isActiveIntercom: state.intercom.active
});

const mapDispatchToProps = (dispatch: Dispatch): any => ({
  dispatches: dispatch.intercomMembers
});

export default connect(mapStateToProps, mapDispatchToProps)(IntercomMembers);