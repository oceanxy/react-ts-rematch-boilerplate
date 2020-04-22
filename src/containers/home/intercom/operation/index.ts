/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 操作对讲组件
 * @Date: 2020-04-21 周二 15:05:35
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-21 周二 15:05:35
 */

import IntercomOperation from '@/components/home/intercom/operarion';
import { RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  curActiveGroupType: state.intercomGroup.curActiveGroupType
});

export default connect(mapStateToProps)(IntercomOperation);