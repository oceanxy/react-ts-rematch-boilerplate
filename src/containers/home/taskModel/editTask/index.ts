/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 编辑任务
 * @Date: 2020-04-15 周三 16:23:22
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-26 周二 16:24:41
 */

import EditTask from '@/components/home/taskModel/editTask';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  data: state.taskDetails.data,
  isShowModal: state.editTask.isShowModal,
  events: state.eventList.data
});
const mapDispatchToProps = (dispatch: Dispatch): any => ({
  showModal: dispatch.editTask.showModal,
  updateRemoteTask: dispatch.editTask.updateRemoteTask,
  fetchDataForSelect: dispatch.eventList.fetchDataForSelect,
  fetchEventDetailsData: dispatch.eventDetails.fetchData,
  fetchEventListData: dispatch.eventList.fetchData
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTask);
