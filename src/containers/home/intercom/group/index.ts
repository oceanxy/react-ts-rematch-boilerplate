/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲群组组件
 * @Date: 2020-04-21 周二 15:05:35
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-21 周二 15:05:35
 */

import IntercomGroupName from '@/components/home/intercom/groupName';
import { RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({name: state.intercomGroup.name});

export default connect(mapStateToProps)(IntercomGroupName);