/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 脚手架功能测试页面（正式项目请删除）
 * @Date: 2019-12-28 15:03:55
 * @LastModified: Oceanxy
 * @LastModifiedTime: 2019-12-28 15:03:55
 */

import React from 'react';
import { connect } from 'react-redux';
import { RootState, Dispatch } from '@/store';
import TestContainer from '@/components/test';

const mapState = (state: RootState) => ({ test: state.test });

const mapDispatch = (dispatch: Dispatch): any => ({
  increment: dispatch.test.increment,
  incrementAsync: dispatch.test.incrementAsync,
  getListData: dispatch.test.getListData,
  getWebSocketData: dispatch.test.getWebSocketData,
  getEChartsData: dispatch.test.getEChartsData
});

export default connect(
  mapState,
  mapDispatch
)(TestContainer);
