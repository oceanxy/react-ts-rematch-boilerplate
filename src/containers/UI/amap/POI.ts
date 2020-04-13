/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 高德地图POI搜索组件
 * @Date: 2020-04-01 周三 09:04:01
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-01 周三 09:04:01
 */

import POI from '@/components/UI/amap/POI';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  map: state.map.mapInstance,
  data: state.position.searchPositions,
  searchCondition: state.search.searchCondition,
  keyword: state.search.searchKeyword
});

const mapDispatchToProps = (dispatch: Dispatch): any => ({
  setState: dispatch.position.setState
});

export default connect(mapStateToProps, mapDispatchToProps)(POI);
