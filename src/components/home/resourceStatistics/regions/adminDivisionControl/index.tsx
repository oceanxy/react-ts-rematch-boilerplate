/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 行政区划级联选择组件
 * @Date: 2020-04-08 周三 14:06:34
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-26 周二 11:52:52
 */

import Container from '@/components/UI/containerComp';
import { Boundary } from '@/containers/UI';
import { Cascader } from 'antd';
import { CascaderOptionType } from 'antd/es/cascader';
import React from 'react';
import options from './cities';
import './index.scss';

/**
 * 行政区划切换组件props
 */
interface IAdminDivisionControlProps {
  value: IAdminDivisionResourcesState['value'],
  resetState: IAdminDivisionResourcesModel['effects']['resetState']
}

/**
 * 行政区划切换组件
 * @param {Partial<IAdminDivisionControlProps>} props
 * @returns {any}
 * @constructor
 */
const AdminDivisionControl = (props: Partial<IAdminDivisionControlProps>) => {
  const {value, resetState} = props;

  /**
   * 切换行政区划事件
   * @param {string[]} value
   * @param {CascaderOptionType[]} selectedOptions
   */
  const onChange = (value: string[], selectedOptions?: CascaderOptionType[]) => {
    if (value.length) {
      resetState!({
        value,
        adcode: selectedOptions?.[selectedOptions?.length - 1].code
      } as {value: IAdminDivisionResourcesState['value'], adcode: IAdminDivisionResourcesState['adcode']});
    } else {
      resetState!();
    }
  };

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

export default AdminDivisionControl;