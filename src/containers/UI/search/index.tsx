/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: search组件
 * @Date: 2020-03-26 18:22:00
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-03-27 21:59:46
 */

import Search from '@/components/UI/search';
import { Dispatch, iRootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: iRootState) => ({data: state.search});
const mapDispatchToProps = (dispatch: Dispatch): any => ({
  getData: dispatch.search.getData
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
