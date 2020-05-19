/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 临时组组件
 * @Date: 2020-04-23 周四 14:22:02
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-19 周二 10:58:35
 */

import TemporaryGroup from '@/components/home/temporaryGroup';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';
import CreateTemporaryGroup from './create';
import TemporaryGroupCreationWay from './creationWay';
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
  EditTemporaryGroup,
  TemporaryGroupCreationWay
};

export default connect(mapStateToProps, mapDispatchToProps)(TemporaryGroup);
