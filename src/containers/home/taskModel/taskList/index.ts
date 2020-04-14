/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 任务列表组件
 * @Date: 2020-04-14 周二 10:11:14
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-14 周二 10:11:14
 */

import TaskList from '@/components/home/taskModel/taskList';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => state.taskList;
const mapDispatchToProps = (dispatch: Dispatch): any => ({
  fetchData: dispatch.taskList.fetchData,
  itemClick: dispatch.taskList.itemClick,
  clearTaskDetailsData: dispatch.taskDetails.clearData,
  setState: dispatch.taskList.setState
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
