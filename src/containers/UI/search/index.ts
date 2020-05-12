/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: search组件
 * @Date: 2020-03-26 18:22:00
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-12 周二 18:04:24
 */

import Search from '@/components/UI/search';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  searchState: state.search
});
const mapDispatchToProps = (dispatch: Dispatch): any => ({
  dispatch: dispatch.search
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
