/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 搜索组件类型定义
 * @Date: 2020-04-13 周一 10:42:06
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-12 周二 15:04:22
 */

import { EntityType } from '@/models/UI/entity';
import { SearchCondition } from '@/models/UI/search/index';
import { ModelConfig } from '@rematch/core';

declare global {
  /**
   * 获取搜索数据参数接口
   */
  interface ISearchRequest {
    params: IEntityRequest | IFenceRequest;
    condition: SearchCondition;
  }

  /**
   * 搜索组件model接口
   */
  interface ISearchState {
    /**
     * 搜索条件
     */
    searchCondition?: SearchCondition
    /**
     * 搜索关键字
     */
    searchKeyword: string
    /**
     * 是否显示搜索结果面板
     */
    isShowResultPanel: boolean
    /**
     * 当前搜索面板触发的项
     */
    target?: {
      /**
       * 触发项的类型 实体（监控对象）类型或区域（围栏）类型
       */
      type: EntityType | 'area',
      /**
       * ID
       */
      id: string
    }
  }

  /**
   * 搜索框搜索结果数据集（包含围栏、实体及POI数据）
   */
  type SearchResultData = {
    searchPositions: IPositionState['searchPositions']
    searchFences: IFenceState['searchFences']
    searchEntities: IEntityState['searchEntities']
  }

  /**
   * 搜索组件model
   */
  interface ISearchModel extends ModelConfig {
    state: ISearchState,
    reducers: {
      updateState(state: ISearchState, payload: Partial<ISearchState>): ISearchState,
    },
    effects: {
      fetchData(payload?: ISearchRequest): void
      setState(payload: Partial<ISearchState>): void
      clearData(): void
    }
  }
}