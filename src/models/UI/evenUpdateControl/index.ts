/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 围栏model
 * @Date: 2020-04-09 周四 09:40:08
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-10 周五 16:26:37
 */

import fetchApis from '@/apis';
import { store } from '@/store';
import _ from 'lodash';
import moment from 'moment';
import { Client, Frame } from 'stompjs';
import { message } from 'antd';

const position: IEvenUpdateControlModel = {
  state: {
    stompClient: undefined
  },
  reducers: {
    updateState(state, payload) {
      return {
        ...state,
        ...payload
      };
    }
  },
  effects: {
    async open(reqPayload, state) {
      const name = state?.monitoringDispatch.config?.name!;

      if (!reqPayload) {
        reqPayload = {
          desc: {
            MsgId: 40968,
            UserName: name,
            SysTime: moment().format('YYYY/MM/DD HH:mm:ss')
          }
        };
      }

      const stompClient = await fetchApis.fetchSockJs((stompClient: Client, frame?: Frame) => {
        // 登录用户订阅事件信息
        stompClient?.subscribe(`/user/${name}/eventInfo`, (res) => {
          store.dispatch.eventList.fetchData();
          message.info('事件列表已更新');
        });
        // 登录用户订阅任务信息
        stompClient?.subscribe(`/user/${name}/taskInfo`, (res) => {
          const task = JSON.parse(res.body).data;

          const tempEventData = [...state?.taskList.data.records || []];

          const diffTaskIndex = _.findIndex(state?.taskList.data.records, (value: ITask, index: number) => value.taskId === task.taskId);

          // 更新任务数据
          if (diffTaskIndex !== -1) {
            tempEventData[diffTaskIndex].status = task.status;
          }

          // 如果当前选中的任务被更新，则更新任务详情
          if (state?.taskList.curSelectedTask?.taskId === task.taskId) {
            const taskDetails = {
              ...state?.taskDetails.data,
              status: task.status
            };

            store.dispatch.taskDetails.setState({data: taskDetails});
          }
        });

        // 发送订阅topic
        stompClient?.send('/app/taskStatusInfo', {}, JSON.stringify(reqPayload));
        stompClient?.send('/app/vehicle/subscribeStatus', {}, JSON.stringify(reqPayload));
      });

      store.dispatch.evenUpdateControl.setState({stompClient});
    },
    async setState(payload) {
      store.dispatch.evenUpdateControl.updateState(payload);
    }
  }
};

export default position;
