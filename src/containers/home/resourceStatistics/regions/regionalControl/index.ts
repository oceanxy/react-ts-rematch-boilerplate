/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 资源统计-区域内搜索-下拉框
 * @Date: 2020-04-09 周四 15:37:41
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-09 周四 15:37:41
 */

import RegionalControl from '@/components/home/resourceStatistics/regions/regionalControl';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  data: state.fence.fences,
  currentId: state.fence.currentFenceId
});
const mapDispatchToProps = (dispatch: Dispatch): any => ({
  getData: dispatch.fence.fetchData,
  setFenceState: dispatch.fence.setState
});

export default connect(mapStateToProps, mapDispatchToProps)(RegionalControl);
