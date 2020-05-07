/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件详情
 * @Date: 2019-12-28 15:03:33
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-07 周四 10:03:49
 */

import EventDetails from '@/components/home/eventModel/eventDetails';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  ...state.eventDetails,
  curSelectedMonitorId: state.eventList.curSelectedMonitorId
});
const mapDispatchToProps = (dispatch: Dispatch): any => ({
  fetchData: dispatch.eventDetails.fetchData,
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
