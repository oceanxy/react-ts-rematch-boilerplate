/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 资源统计模块入口
 * @Date: 2020-04-02 周四 17:45:33
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-10 周五 16:32:26
 */

import Regions from '@/containers/home/resourceStatistics/regions';
import AdminDivisionControl from '@/containers/home/resourceStatistics/regions/adminDivisionControl';
import RegionalControl from '@/containers/home/resourceStatistics/regions/regionalControl';
import RegionTabs from '@/containers/home/resourceStatistics/regions/regionTabs';
import SuddenEvents, { RangeControl } from '@/containers/home/resourceStatistics/suddenEvents';

export {
  SuddenEvents,
  RangeControl,
  Regions,
  RegionTabs,
  AdminDivisionControl,
  RegionalControl
};
