/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 行政区划控制组件
 * @Date: 2020-04-08 周三 09:39:54
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-08 周三 14:04:57
 */

import AdminDivisionControl from '@/components/home/resourceStatistics/regions/adminDivisionControl';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  value: state.adminDivisionResources.value,
  bounds: state.adminDivisionResources.bounds
});

const mapDispatchToProps = (dispatch: Dispatch): any => ({
  getData: dispatch.adminDivisionResources.fetchData,
  updateState: dispatch.adminDivisionResources.updateState,
  resetState: dispatch.adminDivisionResources.resetState
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminDivisionControl);
