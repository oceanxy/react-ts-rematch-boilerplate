/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 突发事件周边资源
 * @Date: 2020-04-02 周四 17:47:00
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-19 周二 09:44:50
 */

import SuddenEvents from '@/components/home/resourceStatistics/suddenEvents';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';
import RangeControl from './rangeControl';

const mapStateToProps = (state: RootState) => ({
  ...state.suddenEvents,
  range: state.rangeControl.range,
  eventId: state.eventDetails.data?.eventId
});
const mapDispatchToProps = (dispatch: Dispatch): any => ({
  getData: dispatch.suddenEvents.getData
});

export { RangeControl };

export default connect(mapStateToProps, mapDispatchToProps)(SuddenEvents);
