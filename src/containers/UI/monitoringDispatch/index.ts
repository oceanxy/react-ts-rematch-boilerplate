/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 监控调度
 * @Date: 2020-04-24 周五 14:31:11
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-24 周五 14:31:11
 */

import MonitoringDispatch from '@/components/UI/monitoringDispatch';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({});
const mapDispatchToProps = (dispatch: Dispatch): any => ({
  setState: dispatch.monitoringDispatch.setState,
  fetchData: dispatch.monitoringDispatch.fetchData
});

export default connect(mapStateToProps, mapDispatchToProps)(MonitoringDispatch);
