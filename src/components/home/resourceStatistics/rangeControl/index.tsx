/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 突发事件周边资源-事件范围控制组件
 * @Date: 2020-04-03 周五 10:40:52
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-03 周五 10:40:52
 */

import Container from '@/components/UI/containerComp';
import { IEventDetailsData } from '@/models/home/eventModel/eventDetails';
import { IRangeControlState } from '@/models/home/resourceStatistics/rangeControl';
import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import './index.scss';

interface IRangeControlProps {
  range?: IRangeControlState['range']
  setRange?: (range: IRangeControlState['range']) => void
  eventId?: IEventDetailsData['eventId']
}

/**
 * 资源范围控制组件
 * @param {IRangeControlProps} props
 * @returns {any}
 * @constructor
 */
const RangeControl = (props: IRangeControlProps) => {
  const {range, setRange, eventId} = props;
  const [radius, setRadius] = useState(String(range));

  /**
   * 按键事件
   * @param {KeyboardEvent<HTMLInputElement>} e
   */
  const onKeyup = (e: KeyboardEvent<HTMLInputElement>) => {
    const value = parseInt((e.target as HTMLInputElement).value);

    if (e.keyCode === 13 && !isNaN(value)) {
      setRange!(value);
    }
  };

  /**
   * 只允许输入纯数字
   * @param {ChangeEvent<HTMLInputElement>} e
   */
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.replace(/[^\d]/g, '');

    setRadius(value);
  };

  useEffect(() => {
    // 当前事件变化时，初始化搜索范围值
    setRange!(1);
  }, [eventId]);

  return (
    <Container className="resource-statistics-left-range">
      <span>事件周边</span>
      <input
        type="text"
        className="highlight range-input"
        value={radius}
        onChange={onChange}
        onKeyUp={onKeyup}
        maxLength={3}
        title={radius ? `请按回车键搜索${radius}公里以内的资源` : '请输入合法值以搜索资源\n合法值：200以内的正整数'}
      />
      <span>公里</span>
    </Container>
  );
};

export default RangeControl;
