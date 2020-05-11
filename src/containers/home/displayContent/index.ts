/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 显示内容
 * @Date: 2020-05-11 周一 14:28:31
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-11 周一 14:28:31
 */

import DisplayContent from '@/components/home/displayContent';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  ...state.displayContent
});
const mapDispatchToProps = (dispatch: Dispatch): any => ({
  ...dispatch.displayContent
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayContent);
