/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 处理事件
 * @Date: 2020-05-07 周四 15:38:36
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-19 周二 16:48:28
 */

import HandleEvent from '@/components/home/eventModel/handleEvent';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => state.handleEvent;

const mapDispatchToProps = (dispatch: Dispatch): any => ({
  handleEvent: dispatch.handleEvent.handleEvent,
  fetchEventListData: dispatch.eventList.fetchData
});

export default connect(mapStateToProps, mapDispatchToProps)(HandleEvent);
