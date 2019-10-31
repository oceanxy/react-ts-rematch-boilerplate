import Increment from '@/components/increment';
import Test from '@/components/test';
import React from 'react';
import { connect } from 'react-redux';
import { iRootState, Dispatch } from '@/store';

const mapState = (state: iRootState) => ({test: state.test});

const mapDispatch = (dispatch: Dispatch): any => ({
  increment: dispatch.test.increment,
  incrementAsync: dispatch.test.incrementAsync,
  getData: dispatch.test.getData,
  getWebSocketData: dispatch.test.getWebSocketData
});

type Props = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

const TestContainer = (props: Props) => {
  return (
    <>
      <Increment count={props.test.count} increment={props.increment} incrementAsync={props.incrementAsync} />
      <Test data={props.test.data} websocketData={props.test.websocketData} getData={props.getData} getWebSocketData={props.getWebSocketData} />
    </>
  );
};

export default connect(
  mapState,
  mapDispatch
)(TestContainer);
