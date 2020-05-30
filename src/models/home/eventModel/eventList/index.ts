/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件列表model
 * @Date: 2020-03-23 14:59:49
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-25 周一 16:53:24
 */

import fetchApis from '@/apis';
import {APIResponse} from '@/interfaces/api/mock';
import {store} from '@/store';

/**
 * 事件列表model
 * @type {IEventListModel}
 */
const eventList: IEventListModel = {
  state: {
    data: [],
    curSelectedEvent: {}
  },
  reducers: {
    updateState: (state, payload) => {
      return {
        ...state,
        ...payload
      };
    }
  },
  effects: {
    async fetchData(reqPayload, state) {
      let selectFirstEvent: any;

      if (!reqPayload) {
        reqPayload = {
          isReturnEventDetails: 1,
          eventStatus: state?.eventStatistics.eventStatisticsMethod
        };
      } else {
        const {selectFirstData, ...rest} = reqPayload;
        selectFirstEvent = selectFirstData;
        reqPayload = rest;
      }

      const response = await fetchApis.fetchEventList(reqPayload);
      const {latestEventDetails, eventStatistics, eventList}: IEventListResponse = response.data;

      // 更新事件详情
      if (eventList?.length && selectFirstEvent) {
        store.dispatch.eventDetails.setState({data: latestEventDetails});
      }

      // 更新事件统计tab
      store.dispatch.eventStatistics.setState({data: eventStatistics});
      // 更新事件列表
      store.dispatch.eventList.updateState({data: eventList});

      // 选中当前列表第一条数据
      if (selectFirstEvent) {
        store.dispatch.eventList.setState!({curSelectedEvent: eventList?.[0] ?? []});
      }
    },
    async fetchDataForSelect(reqPayload?: IEventListRequest): Promise<APIResponse<IEventListResponse>> {
      if (!reqPayload) {
        reqPayload = {sortType: 1};
      }

      return await fetchApis.fetchEventList(reqPayload);
    },
    async setState(payload) {
      // 根据当前选中事件状态，来改变任务列表model的queryType（任务查询方式）的状态
      if ('curSelectedEvent' in payload) {
        if (payload.curSelectedEvent && Object.keys(payload.curSelectedEvent).length) {
          store.dispatch.taskList.setState({queryType: 1});
        } else if (payload.curSelectedEvent) {
          store.dispatch.taskList.setState({queryType: -1});
        }
      }

      store.dispatch.eventList.updateState(payload);
    }
  }
};

export default eventList;
