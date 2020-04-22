/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲通知组件
 * @Date: 2020-04-22 周三 17:28:06
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-22 周三 17:28:06
 */

import IntercomMNotice from '@/components/home/intercom/notice';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  value: state.intercomNotice.value
});

const mapDispatchToProps = (dispatch: Dispatch): any => ({
  setState: dispatch.intercomNotice.setState
});

export default connect(mapStateToProps, mapDispatchToProps)(IntercomMNotice);