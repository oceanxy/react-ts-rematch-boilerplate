/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 实体对讲成员组件
 * @Date: 2020-05-09 周六 15:26:15
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-09 周六 15:26:15
 */

import IntercomEntityCall from '@/components/home/intercom/entityCall';
import { RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  curTempGroupState: state.intercomGroupName,
  curMassPoint: state.map.curMassPoint
});

export default connect(mapStateToProps)(IntercomEntityCall);