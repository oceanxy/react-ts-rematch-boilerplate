/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 监控调度API模块
 * @Date: 2020-04-24 周五 11:23:12
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-24 周五 11:23:12
 */

import { IContainerProps } from '@/components/UI/containerComp';
import { useEffect } from 'react';

interface IMonitoringDispatchProps extends IContainerProps<any> {
  setState: IMonitoringDispatchModel['effects']['setState']
  fetchData: IMonitoringDispatchModel['effects']['fetchData']
}

/**
 * 监控调度API组件
 * @param {IMonitoringDispatchProps} props
 * @returns {any}
 * @constructor
 */
const MonitoringDispatch = (props: Partial<IMonitoringDispatchProps>) => {
  const {fetchData} = props;

  useEffect(() => {
    fetchData!();
  }, []);

  return null;
};

export default MonitoringDispatch;
