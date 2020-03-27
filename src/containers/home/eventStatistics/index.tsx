/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件/任务统计
 * @Date: 2019-12-28 15:03:33
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-03-19 17:23:31
 */

import EventStatistics from '@/components/home/eventStatistics';
import { Dispatch, iRootState } from '@/store';
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state: iRootState) => ({data: state.eventStatistics});

const mapDispatchToProps = (dispatch: Dispatch): any => ({
  getData: dispatch.eventList.getData,
});

export default connect(mapStateToProps, mapDispatchToProps)(EventStatistics);
