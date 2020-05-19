/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 面板控制类型定义
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-19 周二 10:52:33
 */

import { ModelConfig } from '@rematch/core';

declare global {
  /**
   * 位置状态
   */
  interface IPanelControlState {
    /**
     * 全局加载状态
     */
    loading: boolean
    /**
     * 是否显示面板
     */
    showPanel: boolean
  }

  /**
   * 围栏model接口
   */
  interface IPanelControlModel extends ModelConfig {
    state: IPanelControlState,
    reducers: {
      updateState(state: IPanelControlState, payload: Partial<IPanelControlState>): IPanelControlState
    },
    effects: {
      setState(payload: Partial<IPanelControlState>): void
    }
  }
}
