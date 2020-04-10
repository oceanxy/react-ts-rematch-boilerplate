/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 区域内资源统计tab切换
 * @Date: 2020-04-08 周三 09:39:54
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-08 周三 09:39:54
 */

import RegionTabs from '@/components/home/resourceStatistics/regions/regionTabs';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  type: state.regionTabs.currentType
});
const mapDispatchToProps = (dispatch: Dispatch): any => ({
  setType: dispatch.regionTabs.updateType
});

export default connect(mapStateToProps, mapDispatchToProps)(RegionTabs);
