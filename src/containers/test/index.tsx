/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: 脚手架功能测试页面（正式项目请删除）
 * @Date: 2019-12-28 15:03:55
 * @LastModified: Oceanxy(xyzsyx@163.com)
 * @LastModifiedTime: 2020-05-28 周四 15:24:57
 */

import { connect } from 'react-redux';
import { RootState, Dispatch } from '@/store';
// import TestContainer from '@/components/test';
import TestContainer from '@/components/testReactTabllist';

const mapState = (state: RootState) => ({ test: state.test });

const mapDispatch = (dispatch: Dispatch): any => ({
  ...dispatch.test
});

export default connect(mapState, mapDispatch)(TestContainer);
