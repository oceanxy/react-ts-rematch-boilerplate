/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 首页model入口
 * @Date: 2020-03-23 14:12:57
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-14 周二 09:59:23
 */

import eventModel from './eventModel';
import resourceStatisticsModel from './resourceStatistics';
import taskModel from './taskModel';

export default {...eventModel, ...resourceStatisticsModel, ...taskModel};
