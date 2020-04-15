/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 任务详情组件
 * @Date: 2020-04-14 周二 10:10:44
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-14 周二 17:33:25
 */

import TaskDetails from '@/components/home/taskModel/taskDetails';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  ...state.taskDetails,
  curSelTaskId: state.taskList.curSelectedTaskId
});
const mapDispatchToProps = (dispatch: Dispatch): any => ({
  fetchData: dispatch.taskDetails.fetchData,
  clearData: dispatch.taskDetails.clearData,
  showEditTaskModal: dispatch.editTask.showModal
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails);
