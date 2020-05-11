/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 显示内容类型定义
 * @Date: 2020-05-11 周一 14:36:21
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-11 周一 14:36:21
 */

import { EntityType } from '@/models/UI/entity';
import { RootState } from '@/store';
import { ModelConfig } from '@rematch/core';

declare global {
  /**
   * （开关组件）定义
   */
  interface ITrigger {
    status: boolean,
    value: EntityType | 'area',
    text: '人员' | '车辆' | '物品' | '物资' | '区域'
  }

  /**
   * 显示内容state
   */
  interface IDisplayContentState {
    /**
     * 渲染开关组件的数据集合
     */
    triggers: ITrigger[]
  }

  /**
   * 显示内容model
   */
  interface IDisplayContentModel extends ModelConfig {
    state: IDisplayContentState
    reducers: {
      /**
       * 更新本地状态
       * @param {IDisplayContentState} state
       * @param {Partial<IDisplayContentState>} payload
       * @returns {IDisplayContentState}
       */
      updateState(state: IDisplayContentState, payload: Partial<IDisplayContentState>): IDisplayContentState
    }
    effects: {
      /**
       * 更新状态
       * @param {Partial<IDisplayContentState>} payload
       */
      setState(payload: Partial<IDisplayContentState>): void
      /**
       * 获取当前触发的trigger的状态对象以及其下标
       * @param {string} triggerName
       * @param {RootState} rootState
       * @returns {{trigger: ITrigger, index: number}}
       */
      getCurTrigger(triggerName: string, rootState?: RootState): {trigger: ITrigger, index: number}
    }
  }
}
