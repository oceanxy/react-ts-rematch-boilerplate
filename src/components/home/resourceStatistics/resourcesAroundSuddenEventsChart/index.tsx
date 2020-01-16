/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 图表组件-突发事件周围资源
 * @Date: 2020-01-10 11:46:14
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-01-13 14:59:22
 */

import Container from '@/components/UI/container';
import { px2vw } from '@/utils/helper';
import * as echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';
import React from 'react';
import './index.scss';

interface IResourcesAroundSuddenEventsChart {
  className?: string;
  data?: any;
  getData?: () => void;
}

const ResourcesAroundSuddenEventsChart = (props: IResourcesAroundSuddenEventsChart) => {
  const { data, getData } = props;
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      top: 20,
      bottom: 20
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#ffffff',
          fontSize: '50%'
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
          fontSize: '50%'
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
        barWidth: '40%',
        data: [10, 52, 200, 334, 390, 330, 220],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#55a4d0' },
            { offset: 1, color: '#1a425a' }
          ])
        }
      }
    ]
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <Container className="resource-statistics-left-chart">
      <ReactEcharts option={option} style={{ height: 160 }} />
    </Container>
  );
};

export default ResourcesAroundSuddenEventsChart;
