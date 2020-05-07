/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件/任务统计model
 * @Date: 2020-05-07 周四 15:19:23
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-07 周四 15:19:23
 */

import fetchApis from '@/apis';
import { APIResponse } from '@/interfaces/api/mock';

/**
 * 处理事件model
 * @type {IHandleEventModel}
 */
const handleEvent: IHandleEventModel = {
  state: {
    monitorId: '',
    eventType: -1,
    description: '',
    startTime: null
  },
  reducers: {
    updateData: (state, data) => {
      return {
        ...state,
        ...data
      };
    }
  },
  effects: {
    async handleEvent(reqPayload: IHandleEventRequest): Promise<APIResponse<IHandleEventResponse>> {
      return await fetchApis.handleEvent(reqPayload);
    }
  }
};

export default handleEvent;
