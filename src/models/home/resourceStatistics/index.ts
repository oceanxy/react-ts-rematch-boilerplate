/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 资源统计model入口
 * @Date: 2020-04-02 周四 16:52:35
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-03 周五 11:06:50
 */

import administrativeRegions from './administrativeRegions';
import rangeControl from './rangeControl';
import regions from './regions';
import regionTabs from './regionTabs';
import suddenEvents from './suddenEvents';

/**
 * 按行政区划统计资源接口
 */
export interface IResourceStatisticsData {
  /**
   * 突发事件周边资源名称
   */
  itemName: string[],
  /**
   * 突发事件周边资源数量
   */
  totalNum: number[]
}

/**
 * 资源统计模块通用请求参数接口
 */
export interface IResourceStatisticsRequest {
  /**
   * 监控对象类型。
   * -1:全部(默认); 0:车; 1:人; 2:动态物品; 9:静态物资; 10:调度员
   * 多个用逗号隔开。
   */
  supportMonitorType?: -1 | 0 | 1 | 2 | 9 | 10 | string
}

export default {
  suddenEvents,
  rangeControl,
  administrativeRegions,
  regions,
  regionTabs
};
