import React from 'react';
import { connect } from 'react-redux';
import { iRootState, Dispatch } from '@/store';
import TestContainer from '@/components/test';

const mapState = (state: iRootState) => ({ test: state.test });

const mapDispatch = (dispatch: Dispatch): any => ({
  increment: dispatch.test.increment,
  incrementAsync: dispatch.test.incrementAsync,
  getData: dispatch.test.getData,
  getWebSocketData: dispatch.test.getWebSocketData
});

export default connect(
  mapState,
  mapDispatch
)(TestContainer);
