/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 编辑临时组
 * @Date: 2020-04-26 周日 16:11:02
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-26 周日 16:11:02
 */

import EditTemporaryGroup from '@/components/home/temporaryGroup/edit';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  state: state.temporaryGroup
});

const mapDispatchToProps = (dispatch: Dispatch): any => ({
  setState: dispatch.temporaryGroup.setState,
  createTemporaryGroup: dispatch.temporaryGroup.createTemporaryGroup,
  fetchDataByCircle: dispatch.entity.fetchDataByCircle
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTemporaryGroup);