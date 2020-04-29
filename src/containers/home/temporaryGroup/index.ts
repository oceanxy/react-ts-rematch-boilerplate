/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 临时组组件
 * @Date: 2020-04-23 周四 14:22:02
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-26 周日 16:12:16
 */

import TemporaryGroup from '@/components/home/temporaryGroup';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';
import CreateTemporaryGroup from './create';
import EditTemporaryGroup from './edit';

const mapStateToProps = (state: RootState) => ({
  data: state.temporaryGroup.data,
  intercomGroupState: state.intercomGroup
});
const mapDispatchToProps = (dispatch: Dispatch): any => ({
  fetchData: dispatch.temporaryGroup.fetchData,
  setIntercomGroupState: dispatch.intercomGroup.setState,
  unbindTemporaryGroup: dispatch.temporaryGroup.unbindTemporaryGroup
});

export {
  CreateTemporaryGroup,
  EditTemporaryGroup
};

export default connect(mapStateToProps, mapDispatchToProps)(TemporaryGroup);
