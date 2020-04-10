/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: search组件
 * @Date: 2020-03-26 18:22:00
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-03-27 21:59:46
 */

import Search from '@/components/UI/search';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  searchState: {...state.search, fences: state.fence.searchFences}
});
const mapDispatchToProps = (dispatch: Dispatch): any => ({
  getData: dispatch.search.fetchData,
  setSearchCondition: dispatch.search.updateSearchCondition,
  setKeyword: dispatch.search.updateSearchKeyword,
  clearData: dispatch.search.clearData
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
