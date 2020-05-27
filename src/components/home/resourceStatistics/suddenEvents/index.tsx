/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 图表组件-突发事件周围资源
 * @Date: 2020-01-10 11:46:14
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-20 周三 17:41:36
 */

import Container from '@/components/UI/containerComp';
import Histogram from '@/components/UI/histogram';
import ItemLegend from '@/components/UI/itemLegend';
import { RangeControl } from '@/containers/home/resourceStatistics';
import styledBlocks from '@/styled';
import { px2vw } from '@/utils/helper';
import * as echarts from 'echarts';
import React, { useEffect } from 'react';
import './index.scss';

interface ISuddenEventProps {
  className: string
  data: IResourceStatisticsData
  getData: ISuddenEventsModel['effects']['getData']
  range: IRangeControlState['range'],
  eventId: IEventDetailsData['eventId']
  setState: ISuddenEventsModel['effects']['setState']
}

/**
 * 获取eCharts图表配置
 * @param {string[]} itemName X轴数据数组
 * @param {number[]} totalNum series数据数组
 * @returns {echarts.EChartOption}
 */
function getOption(itemName: string[], totalNum: number[]): echarts.EChartOption {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: 20,
      top: 10,
      bottom: 30
    },
    xAxis: [
      {
        type: 'category',
        data: itemName,
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#ffffff',
          fontSize: '50%' as unknown as number,
          interval: 0,
          rotate: 40
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
          fontSize: '50%' as unknown as number,
          margin: 2,
          formatter: (value: any) => {
            if (value >= 10000 && value < 10000000) {
              value = value / 10000 + '万';
            } else if (value >= 10000000) {
              value = value / 10000000 + '千万';
            }

            return value;
          }
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
        data: totalNum,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 0, color: '#55a4d0'},
            {offset: 1, color: '#1a425a'}
          ]) as unknown as string
        }
      }
    ]
  };
}

const SuddenEvents = (props: Partial<ISuddenEventProps>) => {
  const {data, getData, range, eventId, setState} = props;
  const option = getOption(data?.itemName ?? [], data?.totalNum ?? []);

  useEffect(() => {
    if (eventId) {
      getData!();
    } else {
      setState!({data: {itemName: [], totalNum: []}});
    }
  }, [range, eventId]);

  return (
    <Container className="resource-statistics-left">
      <ItemLegend
        name="事件周边资源"
        nameStyled={styledBlocks.subtitle}
        styled={styledBlocks.marginBottom10}
        icon={false}
      />
      <RangeControl />
      <Histogram
        option={option}
        classNameForCon="resource-statistics-left-chart"
        style={{height: px2vw(130)}}
      />
    </Container>
  );
};

export default SuddenEvents;

