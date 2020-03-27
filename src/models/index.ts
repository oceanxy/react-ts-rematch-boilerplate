/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: rematch model入口文件
 * @Date: 2019-11-06 10:34:51
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-03-26 18:21:35
 */

import allHomeModel from './home';
import { test } from './test';
import UIComponents from './UI';

export default {test, ...allHomeModel, ...UIComponents};
