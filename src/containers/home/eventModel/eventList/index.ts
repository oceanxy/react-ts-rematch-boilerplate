/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件列表
 * @Date: 2019-12-28 15:03:33
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-18 周一 16:02:40
 */

import EventList from '@/components/home/eventModel/eventList';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => state.eventList;
const mapDispatchToProps = (dispatch: Dispatch): any => ({
  fetchData: dispatch.eventList.fetchData,
  setState: dispatch.eventList.setState
});

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
