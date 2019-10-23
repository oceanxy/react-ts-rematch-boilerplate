/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: mock数据模版
 * @Date: 2019-10-17 10:04:40
 * @LastModified: Oceanxy
 * @LastModifiedTime: 2019-10-17 10:04:40
 */

import { IFetchAPIs } from '@/mock/apis';
import { mock } from 'mockjs';

export interface IMock {
  code: number;
  msg: string;
  data: any;
}

type mocks = { [mocksName in keyof IFetchAPIs]: IMock };

export const productionData = (mocks: mocks, apis: IFetchAPIs, fetchApi: keyof IFetchAPIs) => {
  mock(apis[fetchApi].url, mocks[fetchApi]);
};

const mocks: mocks = {
  fetchTest: {
    code: 0,
    msg: '',
    data: {
      'name|+1': ['苹果', 'OPPO', '三星', '华为', '小米'],
      'value|10-100': 1,
      'child|2-5': [
        {
          name: '@cname',
          'value|10-100': 1
        }
      ]
    }
  },
  fetchTest2: {
    code: 0,
    msg: '',
    data: {}
  }
};

// 注意返回对象内的fetchAPI名称需要与url目录内的名称对应
export default mocks;
