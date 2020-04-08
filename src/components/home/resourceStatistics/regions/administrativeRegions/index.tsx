/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 行政区划级联选择组件
 * @Date: 2020-04-08 周三 14:06:34
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-08 周三 14:06:34
 */

import Container from '@/components/UI/containerComp';
import { Boundary } from '@/containers/UI';
import {
  IAdministrativeRegionRequest,
  IAdministrativeRegionState
} from '@/models/home/resourceStatistics/administrativeRegions';
import { boundsToString } from '@/utils/helper';
import { Cascader } from 'antd';
import React, { useEffect } from 'react';
import options from './cities';
import './index.scss';

/**
 * 行政区划切换组件props
 */
interface IAdministrativeRegionProps {
  value: IAdministrativeRegionState['value'],
  bounds: IAdministrativeRegionState['bounds']
  getData: (reqPayload?: IAdministrativeRegionRequest) => void
  setValue: (value?: IAdministrativeRegionState['value']) => void
  clearData: () => void
}

/**
 * 行政区划切换组件
 * @param {Partial<IAdministrativeRegionProps>} props
 * @returns {any}
 * @constructor
 */
const AdministrativeRegions = (props: Partial<IAdministrativeRegionProps>) => {
  const {value, bounds, getData, clearData, setValue} = props;
  const boundStr = boundsToString(bounds);

  /**
   * 切换行政区划事件
   * @param {string[]} value
   */
  const onChange = (value: string[]) => {
    if (value.length) {
      setValue!(value as IAdministrativeRegionState['value']);
    } else {
      clearData!();
    }
  };

  useEffect(() => {
    if (value?.length && boundStr) {
      // 获取资源统计-行政区划柱状图数据
      getData!({
        supportMonitorType: -1,
        administrativeLngLat: boundStr
      });
    }
  }, [boundStr]);

  return (
    <Container className="resource-statistics-admin-regions">
      <Boundary />
      <Cascader
        changeOnSelect={true}
        expandTrigger="hover"
        value={value as string[]}
        options={options}
        onChange={onChange}
        placeholder="请选择行政区划"
      />
    </Container>
  );
};

export default AdministrativeRegions;