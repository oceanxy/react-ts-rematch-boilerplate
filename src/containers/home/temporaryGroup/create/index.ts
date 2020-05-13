/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 创建临时组
 * @Date: 2020-04-25 周六 15:26:39
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-13 周三 16:26:00
 */

import CreateTemporaryGroup from '@/components/home/temporaryGroup/create';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: Dispatch): any => ({
  setState: dispatch.temporaryGroup.setState,
  setAMapState: dispatch.map.setState,
  setEntityState: dispatch.entity.setState
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTemporaryGroup);