/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲入口
 * @Date: 2020-04-21 周二 15:04:21
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-21 周二 15:04:21
 */

import IntercomPanel from '@/components/home/intercom';
import { RootState } from '@/store';
import { connect } from 'react-redux';
import IntercomGroupName from './group';
import IntercomMembers from './members';
import IntercomOperation from './operation';

const mapStateToProps = (state: RootState) => ({
  active: state.intercom.active
});

const Intercom = connect(mapStateToProps)(IntercomPanel);

export { IntercomGroupName, IntercomMembers, IntercomOperation, Intercom };