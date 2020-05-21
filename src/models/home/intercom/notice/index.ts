/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲通知model
 * @Date: 2020-04-22 周三 17:21:04
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-23 周四 10:42:05
 */

import { CurActiveGroupType } from '@/models/home/intercom/groupName';
import { store } from '@/store';
import { message } from 'antd';

const notice: IIntercomNoticeModel = {
  state: {
    active: false,
    value: ''
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
    async sendData(reqPayload) {
      const state = store.getState();
      const {
        monitoringDispatch: {
          hjMediaEngine
        },
        intercomNotice: {value},
        intercomGroupName: {curActiveGroupType, intercomId}
      } = state;

      if (!reqPayload) {
        reqPayload = {
          smsType: 0,
          smsContent: value,
          targetObjectList: [{
            objectType: curActiveGroupType === CurActiveGroupType.Entity ? 1 : 0,
            objectId: intercomId
          }]
        };
      }

      // 检查第三方引擎是否初始化
      if (hjMediaEngine) {
        hjMediaEngine.audioEngine.sendSMS(reqPayload);
        // 至开发时，第三方未提供发送消息的返回以及发送消息的事件监听，故不能获取发送消息后的状态（是否发送成功等）
        message.success('通知已发送！');
      } else {
        message.error('第三方对讲服务未启动');
      }

      // 成功发送消息之后，退出消息编辑框模块
      store.dispatch.intercomNotice.updateState({active: false, value: ''});
    },
    setState(payload) {
      store.dispatch.intercomNotice.updateState(payload);
    }
  }
};

export default notice;
