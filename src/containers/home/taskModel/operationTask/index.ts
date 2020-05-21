/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 操作任务
 * @Date: 2020-04-20 周一 17:53:18
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-20 周一 17:53:18
 */

import OperationTask from '@/components/home/taskModel/operationTask';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  data: state.taskDetails.data,
  intercomGroupState: state.intercomGroupName,
  isShowEditTaskModal: state.editTask.isShowModal,
  isShowCompleteTaskModal: state.completeTask.isShowModal
});
const mapDispatchToProps = (dispatch: Dispatch): any => ({
  showEditTaskModal: dispatch.editTask.showModal,
  showCompleteTaskModal: dispatch.completeTask.showModal,
  setIntercomGroupState: dispatch.intercomGroupName.setState
});

export default connect(mapStateToProps, mapDispatchToProps)(OperationTask);
