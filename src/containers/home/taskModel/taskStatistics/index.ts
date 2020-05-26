/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 任务统计组件
 * @Date: 2020-04-14 周二 10:12:37
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-26 周二 16:43:13
 */

import TaskStatistics from '@/components/home/taskModel/taskStatistics';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  data: state.taskStatistics,
  curSelectedEvent: state.eventList.curSelectedEvent,
  curMassPoint: state.map.curMassPoint
});

const mapDispatchToProps = (dispatch: Dispatch): any => ({
  fetchData: dispatch.taskList.fetchData
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskStatistics);
