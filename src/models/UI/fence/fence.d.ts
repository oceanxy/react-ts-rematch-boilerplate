/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 围栏类型定义文件
 * @Date: 2020-04-09 周四 11:28:28
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-09 周四 11:28:28
 */

import { ModelConfig } from '@rematch/core';

declare global {
  /**
   * 围栏接口
   */
  interface IFence {
    /**
     * 围栏(种类)名称
     */
    name: string;
    /**
     * 父亲节点ID（围栏种类为0，围栏的父节点对应围栏种类ID）
     */
    parentId: '';
    /**
     * 围栏(种类)ID
     */
    id: string;
    /**
     * fenceParent:围栏种类 fence：围栏
     */
    type: '';
    /**
     * 围栏的类型
     */
    objType: '';
    /**
     * 围栏图标
     */
    iconSkin: '';
    /**
     * 子节点
     */
    childNodes: IFence[] | null;
  }

  /**
   * 围栏数据请求参数接口
   */
  interface IFencesRequest {
    /**
     * 围栏种类名称或围栏名称关键字。为空查询全部
     */
    queryParam?: IFence['name'] | string
  }

  /**
   * 围栏状态
   */
  interface IFenceState {
    /**
     * 当前用户下所有有权限的围栏（平台所属组织的下级组织所有的围栏）
     */
    fences: IFence[]
    /**
     * 搜索框根据关键字获取的围栏数据
     */
    searchFences: IFence[]
    /**
     * 当前围栏ID
     */
    currentFenceId: string
  }

  /**
   * 围栏model接口
   */
  interface IFenceModel extends ModelConfig {
    state: IFenceState,
    reducers: {
      /**
       * 更新围栏列表数据
       * @param {IFenceState} state
       * @param {IFence[]} fences
       * @returns {IFenceState}
       */
      updateFences(state: IFenceState, fences?: Partial<IFenceState>): IFenceState,
      updateFenceId(state: IFenceState, fenceId?: (IFenceState['currentFenceId'])): IFenceState
    },
    effects: {
      /**
       * 从远程获取围栏列表数据
       * @param {IFencesRequest} reqPayload 请求参数
       */
      fetchData(reqPayload: IFencesRequest): void
      setFenceId(id?: IFenceState['currentFenceId']): void
    }
  }
}
