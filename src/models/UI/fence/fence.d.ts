/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 围栏类型定义文件
 * @Date: 2020-04-09 周四 11:28:28
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-11 周一 17:24:26
 */

import { APIResponse } from '@/interfaces/api/mock';
import { FenceType } from '@/models/UI/fence/index';
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
   * 点
   */
  type IPoint = [number, number]

  /**
   * 围栏区域位置信息
   */
  interface ILocation {
    /**
     * 纬度
     */
    latitude: number
    /**
     * 半径
     */
    radius: number
    /**
     * 经度
     */
    longitude: number
    /**
     * 线条宽度
     */
    width: number
    /**
     * 点坐标集合
     */
    points: IPoint[]
  }

  /**
   * 围栏区域数据
   */
  interface IFenceArea {
    /**
     * 围栏ID
     */
    fenceId: string
    /**
     * 围栏名称
     */
    fenceName: string
    /**
     * 围栏种类
     */
    fenceType: FenceType
    /**
     * 围栏展示颜色
     */
    colorCode: string
    /**
     * 透明度
     */
    transparency: number
    /**
     * 围栏位置数据数组(与获取围栏详情相同)
     */
    locationData: ILocation
  }

  /**
   * 围栏列表数据请求参数接口
   */
  interface IFenceRequest {
    /**
     * 围栏种类名称或围栏名称关键字。为空查询全部
     */
    queryParam?: IFence['name'] | string
  }

  /**
   * 围栏详情request
   */
  interface IFenceDetailsRequest {
    /**
     * 围栏ID
     */
    fenceId: string
    /**
     * 0：不返回经纬度信息 1：返回经纬度信息 默认0
     */
    queryType?: 0 | 1
    /**
     * 围栏类型
     */
    fenceType: FenceType
  }

  /**
   * 围栏详情response
   */
  interface IFenceDetailsResponse {
    /**
     * 围栏详情数据
     */
    fenceDetails: {
      /**
       * 围栏ID
       */
      fenceId: string
      /**
       * 围栏名称
       */
      fenceName: string
      /**
       * 围栏种类
       */
      fenceType: FenceType
      /**
       * 围栏展示颜色
       */
      colorCode: string
      /**
       * 透明度
       */
      transparency: number
      /**
       * 围栏位置数据数组
       */
      locationData: ILocation
    }
  }

  /**
   * 围栏区域数据response（用于在地图上绘制围栏）
   */
  interface IFenceAreaResponse {
    fenceList: IFenceArea[]
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
     * 用于在地图上绘制围栏的数据集
     */
    mapFences?: IFenceAreaResponse
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
       * @param {Partial<IFenceState>} payload
       * @returns {IFenceState}
       */
      updateState(state: IFenceState, payload?: Partial<IFenceState>): IFenceState
    },
    effects: {
      /**
       * 从远程获取围栏列表数据 （用于搜索、下拉列表等）
       * @param {IFenceRequest} reqPayload 请求参数
       */
      fetchData(reqPayload: IFenceRequest): void
      /**
       * 设置状态
       * @param {Partial<IFenceState>} payload
       */
      setState(payload: Partial<IFenceState>): void
      /**
       * 获取围栏区域数据（用于在地图上绘制围栏）
       */
      fetchAreaData(): void
      /**
       * 获取围栏详情数据
       * @param {IFenceDetailsRequest} reqPayload
       * @returns {Promise<APIResponse<IFenceDetailsResponse>>}
       */
      fetchDetails(reqPayload: IFenceDetailsRequest): Promise<APIResponse<IFenceDetailsResponse>>
    }
  }
}
