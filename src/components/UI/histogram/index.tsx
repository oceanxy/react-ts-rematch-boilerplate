/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 图表组件-柱状图
 * @Date: 2020-04-03 周五 09:28:32
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-07 周二 10:34:25
 */

import Container from '@/components/UI/containerComp';
import { px2vw } from '@/utils/helper';
import ReactEcharts, { ReactEchartsPropsTypes } from 'echarts-for-react';
import React from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
import './index.scss';

interface IHistogramProps extends ReactEchartsPropsTypes {
  classNameForCon?: string,
  styledForCon?: FlattenSimpleInterpolation // 图例容器CSS样式
}

/**
 * 柱状图组件
 * @param {IHistogramProps} props
 * @returns {any}
 * @constructor
 */
const Histogram = (props: IHistogramProps) => {
  const {classNameForCon, styledForCon, ...rest} = props;

  return (
    <Container className={classNameForCon} styled={styledForCon}>
      <ReactEcharts {...rest} />
    </Container>
  );
};

export default Histogram;
