/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 处理事件
 * @Date: 2020-05-07 周四 15:38:36
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-12 周二 08:58:57
 */

import HandleEvent from '@/components/home/eventModel/handleEvent';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => state.handleEvent;

const mapDispatchToProps = (dispatch: Dispatch): any => ({
  handleEvent: dispatch.handleEvent.handleEvent,
  clearCurMassPoint: dispatch.map.clearCurMassPoint
});

export default connect(mapStateToProps, mapDispatchToProps)(HandleEvent);
