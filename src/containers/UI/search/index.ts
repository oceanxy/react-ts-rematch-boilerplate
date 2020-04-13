/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: search组件
 * @Date: 2020-03-26 18:22:00
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-13 周一 15:20:58
 */

import Search from '@/components/UI/search';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  searchState: {
    ...state.search,
    searchFences: state.fence.searchFences,
    searchEntities: state.entity.searchEntities,
    searchPositions: state.position.searchPositions
  }
});
const mapDispatchToProps = (dispatch: Dispatch): any => ({
  fetchData: dispatch.search.fetchData,
  setState: dispatch.search.setState,
  clearData: dispatch.search.clearData
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
