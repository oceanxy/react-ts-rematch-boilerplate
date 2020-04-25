/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 临时组组件
 * @Date: 2020-04-23 周四 14:22:02
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-23 周四 14:22:02
 */

import TemporaryGroup from '@/components/home/temporaryGroup';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';
import CreateTemporaryGroup from './create';

const mapStateToProps = (state: RootState) => ({
  data: state.temporaryGroup.data,
  intercomGroupState: state.intercomGroup
});
const mapDispatchToProps = (dispatch: Dispatch): any => ({
  fetchData: dispatch.temporaryGroup.fetchData,
  setState: dispatch.intercomGroup.setState,
  unbindTemporaryGroup: dispatch.temporaryGroup.unbindTemporaryGroup
});

export {
  CreateTemporaryGroup
};

export default connect(mapStateToProps, mapDispatchToProps)(TemporaryGroup);
