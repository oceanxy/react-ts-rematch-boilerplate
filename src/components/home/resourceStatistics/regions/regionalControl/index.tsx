/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 区域（围栏）选择组件
 * @Date: 2020-04-08 周三 14:06:34
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-10 周五 16:26:43
 */

import Icon, { IconSource, IconSourceHover } from '@/components/UI/iconComp';
import { monitorTypeIcon } from '@/models/UI/search';
import Select from 'antd/es/select';
import React, { useEffect } from 'react';
import './index.scss';

/**
 * 区域（围栏）切换组件props
 */
interface IRegionalControlProps {
  data: IFenceState['fences'];
  currentId: IFenceState['currentFenceId'];
  getData: IFenceModel['effects']['fetchData'];
  setFenceState: IFenceModel['effects']['setState'];
}

/**
 * 区域（围栏）切换组件

 */
const RegionalControl = (props: Partial<IRegionalControlProps>) => {
  const { getData, data, currentId, setFenceState } = props;

  /**
   * 选择区域（围栏）事件
   * @param {string[]} value
   */
  const onChange = (value: string) => {
    if (value) {
      setFenceState!({currentFenceId: value});
    } else {
      setFenceState!({currentFenceId: ''});
    }
  };

  // 获取围栏数据
  useEffect(() => {
    getData!({});
  }, []);

  // 检测默认值是否存在，然后渲染Ant Design的select组件。因为异步获取数据的原因，直接渲染会导致默认值加载失败
  if (currentId === '' || currentId) {
    return (
      <Select
        allowClear={true}
        placeholder="请选择区域"
        className="resource-statistics-fence"
        dropdownClassName="inter-plat-dropdown resource-statistics-fence-dropdown"
        onChange={onChange}
        value={currentId || undefined}
      >
        {data &&
          data.map((fence: IFence, index: number) => (
            <Select.OptGroup
              key={`resource-statistics-fence-${index}`}
              label={<Icon text={fence.name} icon={IconSource.AREA} iconHover={IconSourceHover.AREA} />}
            >
              {fence.childNodes?.map((fenceChild: IFence, childIndex: number) => (
                <Select.Option key={`resource-statistics-fence-${index}-${childIndex}`} value={fenceChild.id}>
                  <Icon
                    text={fenceChild.name}
                    icon={monitorTypeIcon[fenceChild.objType] as IconSource}
                    iconHover={monitorTypeIcon[`${fenceChild.objType}_hover`] as IconSourceHover}
                  />
                </Select.Option>
              ))}
            </Select.OptGroup>
          ))}
      </Select>
    );
  }

  return null;
};

export default RegionalControl;
