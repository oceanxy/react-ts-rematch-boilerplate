/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 平台全局属性配置
 * @Date: 2019-10-16 10:57:25
 * @LastModified: Oceanxy
 * @LastModifiedTime: 2019-10-16 10:57:25
 */

export enum EProtocal {
  HTTP = 'http://',
  HTTPS = 'https://'
}

export interface IConfig {
  protocol: string,
  host: string;
  port: number;
  basename: string;
  mock: boolean;
}

export default {
  // 接口协议
  // websocket链接'http://'将自动转换为'ws://'，'https://'将自动转换为'wss://'
  protocol: EProtocal.HTTP,
  // 接口host主机
  host: 'localhost',
  // 接口端口号
  port: 3001,
  // 根目录
  basename: '/',
  // mock数据开关
  mock: true
};
