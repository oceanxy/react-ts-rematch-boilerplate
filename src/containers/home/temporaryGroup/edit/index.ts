/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 编辑临时组
 * @Date: 2020-04-26 周日 16:11:02
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-14 周四 23:05:14
 */

import EditTemporaryGroup from '@/components/home/temporaryGroup/edit';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  state: state.temporaryGroup,
  mouseToolType: state.map.mouseToolType,
  byCondition: state.entity.byCondition
});

const mapDispatchToProps = (dispatch: Dispatch): any => ({
  setState: dispatch.temporaryGroup.setState,
  createTemporaryGroup: dispatch.temporaryGroup.createTemporaryGroup,
  addTempGroupMember: dispatch.monitoringDispatch.addTempGroupMember,
  entityDispatch: dispatch.entity,
  setMapState: dispatch.map.setState
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTemporaryGroup);
