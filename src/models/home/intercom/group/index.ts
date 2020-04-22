/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲群组model
 * @Date: 2020-04-21 周二 11:40:57
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-21 周二 11:40:57
 */

import { store } from '@/store';

/**
 * 当前已激活的群组类别（同时只能激活一种群组）
 */
export enum CurActiveGroupType {
  /**
   * 未激活任何群组
   */
  Null,
  /**
   * 激活任务组
   */
  Task,
  /**
   * 激活临时组
   */
  Temporary,
  /**
   * 激活个呼（对单个的实体（监控）对象）
   */
  Entity
}

/**
 * 对讲群组model
 * @type {{effects: {setState(payload: Partial<IIntercomGroupState>): void}; reducers: {updateState(state, payload): {name: string; curActiveGroupType: CurActiveGroupType; id: string}}; state: {name: string; curActiveGroupType: CurActiveGroupType; id: string}}}
 */
const group: IIntercomGroupModel = {
  state: {
    name: '',
    id: '',
    curActiveGroupType: CurActiveGroupType.Null
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
    setState(payload: Partial<IIntercomGroupState>): void {
      store.dispatch.intercomGroup.updateState(payload);
    }
  }
};

export default group;
