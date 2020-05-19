/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 主页入口
 * @Date: 2019-12-28 15:03:33
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-03-19 17:23:31
 */

import home from '@/components/home';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  showPanel: state.panelControl.showPanel,
  mouseToolType: state.map.mouseToolType,
  map: state.map.mapInstance
});

const mapDispatchToProps = (dispatch: Dispatch): any => ({
  setState: dispatch.panelControl.setState
});

export default connect(mapStateToProps, mapDispatchToProps)(home);
