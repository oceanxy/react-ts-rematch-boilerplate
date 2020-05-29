/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 即时更新控制组件（通过websocket订阅/接收数据控制）
 * @Date: 2020-05-29 周五 13:35:42
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-05-29 周五 13:35:42
 */

import React, { useEffect } from 'react';

/**
 * 组件Props
 */
export interface IEvenUpdateControlProps {
  stompClient: IEvenUpdateControlState['stompClient']
  open: IEvenUpdateControlModel['effects']['open']
}

/**
 * 组件
 */
const EvenUpdateControl = (props: Partial<IEvenUpdateControlProps>) => {
  const {stompClient, open} = props;

  useEffect(() => {
    // 延迟打开websocket通道
    setTimeout(() => open!(), 10000);

    return () => stompClient?.disconnect(() => {
      // message.info('websocket已关闭！');
    });
  }, []);

  return null;
};

export default EvenUpdateControl;
