/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 完成任务
 * @Date: 2020-04-20 周一 17:36:01
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-20 周一 17:36:01
 */

import CompleteTask from '@/components/home/taskModel/completeTask';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  isShowModal: state.completeTask.isShowModal,
});
const mapDispatchToProps = (dispatch: Dispatch): any => ({
  showModal: dispatch.completeTask.showModal,
  completeRemoteTask: dispatch.completeTask.completeRemoteTask
});

export default connect(mapStateToProps, mapDispatchToProps)(CompleteTask);
