/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 实体（监控对象）类型定义
 * @Date: 2020-04-13 周一 14:16:31
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-13 周一 14:16:31
 */

import { ModelConfig } from '@rematch/core';

declare global {
  /**
   * 位置接口
   */
  interface IPosition extends AMap.Autocomplete.Tip {}

  /**
   * 位置状态
   */
  interface IPositionState {
    /**
     * 自动补全的位置信息数据
     */
    autoPositions: IPosition[],
    /**
     * 按照关键字搜索的位置信息数据
     */
    searchPositions: IPosition[]
  }

  /**
   * 围栏model接口
   */
  interface IPositionModel extends ModelConfig {
    state: IPositionState,
    reducers: {
      updateState(state: IPositionState, payload: Partial<IPositionState>): IPositionState
    },
    effects: {
      setState(payload: Partial<IPositionState>): void
    }
  }
}
