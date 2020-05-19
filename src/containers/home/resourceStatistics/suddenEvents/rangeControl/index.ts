/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 突发事件周边资源-事件范围控制
 * @Date: 2020-04-02 周四 17:47:00
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-19 周二 09:44:21
 */

import RangeControl from '@/components/home/resourceStatistics/suddenEvents/rangeControl';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => {
  return {
    ...state.rangeControl,
    eventName: state.eventDetails.data?.eventName,
    eventId: state.eventDetails.data?.eventId
  };
};
const mapDispatchToProps = (dispatch: Dispatch): any => ({
  setRange: dispatch.rangeControl.updateRange
});

export default connect(mapStateToProps, mapDispatchToProps)(RangeControl);
