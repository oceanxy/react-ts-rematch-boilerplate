/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 日志类型定义
 * @Date: 2020-04-29 周三 13:37:20
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-29 周三 13:37:20
 */

import { LogType } from '@/models/UI/log/index';
import { ModelConfig } from '@rematch/core';

declare global {
  /**
   * 增加日志request
   */
  interface IAddLogRequest {
    /**
     * 日志类型
     */
    type: LogType
    /**
     * type(1-5)为对讲对象调度传对讲对象uuid，type(6-9)为对讲群组调度传群组uuid
     */
    id: string
  }

  /**
   * 日志model
   */
  interface ILogModel extends ModelConfig {
    state: {},
    effects: {
      /**
       * 增加日志
       * @param {IAddLogRequest} request
       */
      addLog(request?: IAddLogRequest): void
    }
  }
}
