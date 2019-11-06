/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 入口文件
 * @Date: 2019-11-06 10:37:25
 * @LastModified: Oceanxy
 * @LastModifiedTime: 2019-11-06 10:37:25
 */

import { initFetchApi } from '@/apis';
import config from '@/config';
import '@/screens/App';

// 初始化mock和API
initFetchApi(config);
