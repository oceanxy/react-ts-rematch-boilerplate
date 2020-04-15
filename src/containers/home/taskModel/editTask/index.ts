/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 编辑任务
 * @Date: 2020-04-15 周三 16:23:22
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-15 周三 16:23:22
 */

import EditTask from '@/components/home/taskModel/editTask';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  isShowModal: state.editTask.isShowModal
});
const mapDispatchToProps = (dispatch: Dispatch): any => ({
  showModal: dispatch.editTask.showModal,
  updateTask: dispatch.editTask.updateTask
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTask);
