/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 首页model入口
 * @Date: 2020-03-23 14:12:57
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-11 周一 14:40:51
 */

import displayContent from './displayContent';
import eventModel from './eventModel';
import intercom from './intercom';
import resourceStatisticsModel from './resourceStatistics';
import taskModel from './taskModel';
import temporaryGroup from './temporaryGroup';

export default {
  ...eventModel,
  ...resourceStatisticsModel,
  ...taskModel,
  ...intercom,
  ...temporaryGroup,
  ...displayContent
};
