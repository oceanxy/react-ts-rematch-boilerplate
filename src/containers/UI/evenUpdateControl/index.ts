/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 即时更新控制组件（通过websocket订阅/接收数据控制）
 * @Date: 2020-05-29 周五 13:51:10
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-05-29 周五 13:51:10
 */

import EvenUpdateControl from '@/components/UI/evenUpdateControl';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  stompClient: state.evenUpdateControl.stompClient
});
const mapDispatchToProps = (dispatch: Dispatch): any => ({
  open: dispatch.evenUpdateControl.open
});

export default connect(mapStateToProps, mapDispatchToProps)(EvenUpdateControl);
