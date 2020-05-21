/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲入口
 * @Date: 2020-04-21 周二 15:04:21
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-09 周六 11:54:19
 */

import IntercomPanel from '@/components/home/intercom';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';
import IntercomEntityCall from './entityCall';
import IntercomGroupName from './groupName';
import IntercomMembers from './members';
import IntercomNotice from './notice';
import IntercomOperation from './operation';

const mapStateToProps = (state: RootState) => ({
  active: state.intercom.active,
  curActiveGroupType: state.intercomGroupName.curActiveGroupType,
  isIntercomNoticeActive: state.intercomNotice.active
});

const mapDispatchToProps = (dispatch: Dispatch): any => ({
  setActive: dispatch.intercom.setActive
});

const Intercom = connect(mapStateToProps, mapDispatchToProps)(IntercomPanel);

export { IntercomGroupName, IntercomMembers, IntercomOperation, Intercom, IntercomNotice, IntercomEntityCall };