/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 任务模块model入口
 * @Date: 2020-04-13 周一 17:18:39
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-14 周二 09:24:05
 */

import { ESeverity } from '@/components/UI/itemLegend';
import taskDetails from './taskDetails';
import taskList from './taskList';
import taskStatistics from './taskStatistics';

/**
 * 任务类型文本
 * @type {string[]}
 */
const taskTypeText = ['', '一般', '重要', '紧急'];

/**
 * 任务类型颜色值
 * @type {(ESeverity.GENERAL_TASK | ESeverity.IMPORTANT_TASK | ESeverity.URGENT_TASK)[]}
 */
const taskTypeColor = [
  ESeverity.GRAY,
  ESeverity.GENERAL_TASK,
  ESeverity.IMPORTANT_TASK,
  ESeverity.URGENT_TASK
];

/**
 * 任务类型状态对应文字
 * @type {string[]}
 */
const taskTypeStatus = ['未开始', '执行中', '已完成'];

const enum TaskStatisticsMethod {
  /**
   * 未开始
   * @type {number}
   */
  NOTSTART = 0,
  /**
   * 执行中
   * @type {number}
   */
  PROCESSING = 1,
  /**
   * 已完成
   * @type {number}
   */
  COMPLETED = 2,
  /**
   * 全部
   * @type {number}
   */
  ALL = -1
}

/**
 * 任务周期
 */
const enum TaskPeriod {
  /**
   * 即时
   * @type {number}
   */
  Immediate = 1,
  /**
   * 定时
   * @type {number}
   */
  Timing = 2
}

export {
  TaskPeriod,
  TaskStatisticsMethod,
  taskTypeStatus,
  taskTypeColor,
  taskTypeText
};

export default {taskList, taskDetails, taskStatistics};
