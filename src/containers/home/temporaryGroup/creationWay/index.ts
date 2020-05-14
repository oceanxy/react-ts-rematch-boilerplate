/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 临时组创建方式
 * @Date: 2020-05-14 周四 16:51:33
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-14 周四 16:51:33
 */

import CreationWay from '@/components/home/temporaryGroup/creationWay';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  overlay: state.map.overlay,
  mouseToolType: state.map.mouseToolType
});

const mapDispatchToProps = (dispatch: Dispatch): any => ({
  setTempGroupState: dispatch.temporaryGroup.setState,
  setAMapState: dispatch.map.setState,
  setEntityState: dispatch.entity.setState
});

export default connect(mapStateToProps, mapDispatchToProps)(CreationWay);