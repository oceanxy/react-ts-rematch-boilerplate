/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 日志model
 * @Date: 2020-04-29 周三 13:36:35
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-29 周三 13:36:35
 */

import fetchApis from '@/apis';

/**
 * 增加日志类型
 */
export enum LogType {
  /**
   * 个呼
   * @type {number}
   */
  EntityCall = 1,
  /**
   * 电话
   * @type {number}
   */
  Call = 2,
  /**
   * 禁言
   * @type {number}
   */
  Ban = 3,
  /**
   * 解除禁言
   */
  LiftBan = 4,
  /**
   * 开启定位
   * @type {number}
   */
  Positioning = 5,
  /**
   * 组呼
   * @type {number}
   */
  GroupCall = 6,
  /**
   * 加入群组
   * @type {number}
   */
  AddIntercomGroup = 7,
  /**
   * 踢出群组
   * @type {number}
   */
  ExitIntercomGroup = 8,
  /**
   * 抢麦
   * @type {number}
   */
  TakeMicrophone = 9
}

const log: ILogModel = {
  state: {},
  effects: {
    async addLog(request: IAddLogRequest) {
      await fetchApis.addLog(request);
    }
  }
};

export default log;
