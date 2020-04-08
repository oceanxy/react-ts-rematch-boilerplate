/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 资源统计模块入口
 * @Date: 2020-04-02 周四 17:45:33
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-08 周三 14:07:48
 */

import Regions from '@/containers/home/resourceStatistics/regions';
import AdministrativeRegions from '@/containers/home/resourceStatistics/regions/administrativeRegions';
import RegionTabs from '@/containers/home/resourceStatistics/regions/regionTabs';
import SuddenEvents, { RangeControl } from '@/containers/home/resourceStatistics/suddenEvents';

export { SuddenEvents, RangeControl, Regions, RegionTabs, AdministrativeRegions };
