/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 行政区划控制组件
 * @Date: 2020-04-08 周三 09:39:54
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-08 周三 14:04:57
 */

import AdministrativeRegions from '@/components/home/resourceStatistics/regions/administrativeRegions';
import { Dispatch, iRootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: iRootState) => ({
  value: state.administrativeRegions.value,
  bounds: state.administrativeRegions.bounds
});
const mapDispatchToProps = (dispatch: Dispatch): any => ({
  getData: dispatch.administrativeRegions.getData,
  setValue: dispatch.administrativeRegions.updateValue,
  clearData: dispatch.administrativeRegions.clearData
});

export default connect(mapStateToProps, mapDispatchToProps)(AdministrativeRegions);
