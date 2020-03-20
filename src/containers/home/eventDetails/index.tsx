/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 主页
 * @Date: 2019-12-28 15:03:33
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-03-19 17:23:31
 */

import EventDetails from '@/components/home/eventDetails';
import { Dispatch, iRootState } from '@/store';
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state: iRootState) => ({data: state.eventDetails});
const mapDispatchToProps = (dispatch: Dispatch): any => ({
  getData: dispatch.eventDetails.getEventDetailsData
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
