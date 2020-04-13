/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 突发事件周边资源-事件范围控制组件
 * @Date: 2020-04-03 周五 10:40:52
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-03 周五 10:40:52
 */

import Container from '@/components/UI/containerComp';
import React, { ChangeEvent, KeyboardEvent, useEffect } from 'react';
import './index.scss';

/**
 * 范围控制组件props接口
 */
interface IRangeControlProps {
  range: IRangeControlState['range']
  rangeAsState: IRangeControlState['rangeAsState']
  setRange: (range: IRangeControlState['range'] | IRangeControlState['rangeAsState']) => void
  eventId: IEventDetailsData['eventId']
}

/**
 * 资源范围控制组件
 * @param {IRangeControlProps} props
 * @returns {any}
 * @constructor
 */
const RangeControl = (props: Partial<IRangeControlProps>) => {
  const {rangeAsState, setRange, eventId} = props;

  /**
   * 按键事件
   * @param {KeyboardEvent<HTMLInputElement>} e
   */
  const onKeyup = (e: KeyboardEvent<HTMLInputElement>) => {
    const value = parseInt((e.target as HTMLInputElement).value);

    // 合法值范围区间 [1, 200]
    if (e.keyCode === 13 && !isNaN(value)) {
      if (value > 200) {
        setRange!(200);
      } else if (value < 1) {
        setRange!(1);
      } else {
        setRange!(value);
      }
    }
  };

  /**
   * 只允许输入纯数字
   * @param {ChangeEvent<HTMLInputElement>} e
   */
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.replace(/[^\d]/g, '');

    setRange!(value);
  };

  // 当前选中事件变化时，初始化搜索范围值
  useEffect(() => {
    setRange!(1);
  }, [eventId]);

  return (
    <Container className="resource-statistics-left-range">
      <span>事件周边</span>
      <input
        type="text"
        className="highlight range-input"
        value={rangeAsState}
        onChange={onChange}
        onKeyUp={onKeyup}
        maxLength={3}
        title={rangeAsState ? `请按回车键搜索${rangeAsState}公里以内的资源` : '请输入合法值以搜索资源\n合法值：200以内的正整数'}
      />
      <span>公里</span>
    </Container>
  );
};

export default RangeControl;
