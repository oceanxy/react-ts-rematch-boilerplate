/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 图表组件-突发事件周围资源
 * @Date: 2020-01-10 11:46:14
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-01-13 14:59:22
 */

import Container from '@/components/UI/containerComp';
import ItemLegend from '@/components/UI/itemLegend';
import Histogram from '@/components/UI/histogram';
import { RangeControl } from '@/containers/home/resourceStatistics';
import styledBlocks from '@/styled';
import * as echarts from 'echarts';
import React, { useEffect } from 'react';
import './index.scss';

interface ISuddenEventProps {
  className: string
  data: IResourceStatisticsData
  getData: (reqPayload?: ISuddenEventRequest) => void,
  range: IRangeControlState['range'],
  eventId: IEventDetailsData['eventId']
}

const SuddenEvents = (props: Partial<ISuddenEventProps>) => {
  const {data, getData, range, eventId} = props;
  /**
   * 图表配置
   * @type {EChartOption}
   */
  const option: echarts.EChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: 20,
      top: 20,
      bottom: 20
    },
    xAxis: [
      {
        type: 'category',
        data: data?.itemName ?? [],
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#ffffff',
          fontSize: '50%' as unknown as number
        },
        axisLine: {
          lineStyle: {
            color: '#2e5a76'
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#ffffff',
          fontSize: '50%' as unknown as number
        },
        axisLine: {
          lineStyle: {
            color: '#2e5a76'
          }
        },
        splitLine: {
          lineStyle: {
            color: ['#2e5a76']
          }
        }
      }
    ],
    series: [
      {
        name: '',
        type: 'bar',
        barWidth: '40%' as unknown as number,
        data: data?.totalNum ?? [],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 0, color: '#55a4d0'},
            {offset: 1, color: '#1a425a'}
          ]) as unknown as string
        }
      }
    ]
  };

  useEffect(() => {
    getData!();
  }, [range, eventId]);

  return (
    <Container className="resource-statistics-left">
      <ItemLegend
        name="突发事件周边资源"
        nameStyled={styledBlocks.subtitle}
        styled={styledBlocks.marginBottom10}
        icon={false}
      />
      <RangeControl />
      <Histogram option={option} classNameForCon="resource-statistics-left-chart" />
    </Container>
  );
};

export default SuddenEvents;

