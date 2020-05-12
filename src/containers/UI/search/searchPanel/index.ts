/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: search搜索结果面板组件
 * @Date: 2020-05-12 周二 13:57:37
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-12 周二 16:35:53
 */

import SearchPanel from '@/components/UI/search/searchPanel';
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
  mapDispatch: dispatch.map,
  fenceDispatch: dispatch.fence,
  setState: dispatch.search.setState
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
