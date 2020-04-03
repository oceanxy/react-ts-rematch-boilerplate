/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 突发事件周边资源
 * @Date: 2020-04-02 周四 17:47:00
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-02 周四 17:47:00
 */

import SuddenEvents from '@/components/home/resourceStatistics/suddenEvents';
import { Dispatch, iRootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: iRootState) => ({
  ...state.suddenEvents,
  range: state.rangeControl.range,
  eventId: state.eventDetails.data.eventId
});
const mapDispatchToProps = (dispatch: Dispatch): any => ({
  getData: dispatch.suddenEvents.getData
});

export default connect(mapStateToProps, mapDispatchToProps)(SuddenEvents);
