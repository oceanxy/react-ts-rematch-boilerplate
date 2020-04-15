import { AxiosResponse } from 'axios';

/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 接口响应数据结构
 * @Date: 2019-12-24 13:58:49
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-03-19 16:49:28
 */

// HTTP接口响应
export interface APIResponse {
  /**
   * 服务器状态码 数字0:成功 其他：失败
   */
  retCode: number;
  /**
   * 服务器消息
   */
  retMsg: string;
  /**
   * 服务器返回数据集
   */
  data: any;
}

// 轮询对象
export interface IPolling {
  // 关闭轮询
  close: () => void;
  // 重新启动轮询
  reconnect: () => void;
}
