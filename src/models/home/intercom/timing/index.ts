/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲面板倒计时model
 * @Date: 2020-05-30 周六 22:45:29
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-05-30 周六 22:45:29
 */

import { store } from '@/store';
import moment from 'moment';

const operation: IIntercomTimingModel = {
  state: {
    timing: false,
    startTime: moment(),
    isCountdown: false,
    countdownDuration: 0,
    value: 0,
    text: '00:00:00'
  },
  reducers: {
    updateState(state: IIntercomTimingState, payload: Partial<IIntercomTimingState>) {
      return {
        ...state,
        ...payload
      };
    }
  },
  effects: {
    setState(payload: Partial<IIntercomTimingState>) {
      if ('timing' in payload && !payload.timing) {
        payload = {
          ...payload,
          value: 0,
          text: '00:00:00',
          countdownDuration: 0
        };
      }

      store.dispatch.intercomTiming.updateState(payload);
    }
  }
};

export default operation;
