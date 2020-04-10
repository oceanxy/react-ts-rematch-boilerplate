/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件详情
 * @Date: 2019-12-28 15:03:33
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-03-19 17:23:31
 */

import EventDetails from '@/components/home/eventModel/eventDetails';
import { Dispatch, RootState } from '@/store';
import { RematchDispatch } from '@rematch/core';
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => state.eventDetails;
const mapDispatchToProps = (dispatch: Dispatch): any => ({
  getData: dispatch.eventDetails.getData
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);