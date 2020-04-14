/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件模块model入口
 * @Date: 2020-03-23 14:12:57
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-01 周三 11:04:01
 */

import { ESeverity } from '@/components/UI/itemLegend';
import eventDetails from './eventDetails';
import eventList from './eventList';
import eventStatistics from './eventStatistics';

/**
 * 事件类型文本
 * @type {string[]}
 */
export const eventTypeText = ['', '一般', '较重', '严重', '特别严重'];

// 事件类型颜色值
export const eventTypeColor = [
  ESeverity.GRAY,
  ESeverity.GENERAL_Event,
  ESeverity.RELATIVELY_Event,
  ESeverity.SEVERELY_Event,
  ESeverity.VERY_Event
];

// 事件处理状态
export enum EventStatisticsMethod {
  /**
   * 未处理
   * @type {number}
   */
  UNPROCESSED = 0,
  /**
   * 处理中
   * @type {number}
   */
  PROCESSING = 1,
  /**
   * 全部
   * @type {number}
   */
  ALL = -1
}

export default {eventDetails, eventList, eventStatistics};
