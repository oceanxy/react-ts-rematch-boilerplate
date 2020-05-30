/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲面板计时组件
 * @Date: 2020-05-30 周六 22:15:08
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-31 周日 02:39:33
 */

import Timing from '@/components/home/intercom/timing';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  state: state.intercomTiming,
  operationState: state.intercomOperation
});

const mapDispatchToProps = (dispatch: Dispatch): any => ({
  setState: dispatch.intercomTiming.setState
});

export default connect(mapStateToProps, mapDispatchToProps)(Timing);