/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 突发事件周边资源-事件范围控制
 * @Date: 2020-04-02 周四 17:47:00
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-03 周五 11:24:03
 */

import RangeControl from '@/components/home/resourceStatistics/rangeControl';
import { Dispatch, iRootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: iRootState) => {
  return {
    ...state.rangeControl,
    eventName: state.eventDetails.data.eventName,
    eventId: state.eventDetails.data.eventId
  };
};
const mapDispatchToProps = (dispatch: Dispatch): any => ({
  setRange: dispatch.rangeControl.updateRange
});

export default connect(mapStateToProps, mapDispatchToProps)(RangeControl);
