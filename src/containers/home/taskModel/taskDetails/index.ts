/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 任务详情组件
 * @Date: 2020-04-14 周二 10:10:44
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-21 周四 18:28:21
 */

import TaskDetails from '@/components/home/taskModel/taskDetails';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  ...state.taskDetails,
  curSelTask: state.taskList.curSelectedTask
});
const mapDispatchToProps = (dispatch: Dispatch): any => ({
  fetchData: dispatch.taskDetails.fetchData,
  setState: dispatch.taskDetails.setState
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails);
