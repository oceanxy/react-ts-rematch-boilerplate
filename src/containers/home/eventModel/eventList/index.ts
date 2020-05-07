/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件列表
 * @Date: 2019-12-28 15:03:33
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-03-19 17:23:31
 */

import EventList from '@/components/home/eventModel/eventList';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => state.eventList;
const mapDispatchToProps = (dispatch: Dispatch): any => ({
  fetchData: dispatch.eventList.fetchData,
  setEventDetailsState: dispatch.eventDetails.setState,
  clearEventDetailsData: dispatch.eventDetails.clearData,
  setCurMonitorId: dispatch.eventList.setCurId
});

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
