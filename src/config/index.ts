/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 平台全局属性配置
 * @Date: 2019-10-16 10:57:25
 * @LastModified: Oceanxy
 * @LastModifiedTime: 2019-10-16 10:57:25
 */

export interface IConfig {
  basename: string;
  mock: boolean;
}

export default {
  // host主机
  host: 'localhost',
  // 端口号
  port: 8080,
  // 根目录
  basename: '/',
  // mock数据开关
  mock: true
};
