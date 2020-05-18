/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件详情
 * @Date: 2019-12-28 15:03:33
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-18 周一 15:53:43
 */

import EventDetails from '@/components/home/eventModel/eventDetails';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  ...state.eventDetails,
  curSelectedEvent: state.eventList.curSelectedEvent
});
const mapDispatchToProps = (dispatch: Dispatch): any => ({
  fetchData: dispatch.eventDetails.fetchData,
  setState: dispatch.eventDetails.setState
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
