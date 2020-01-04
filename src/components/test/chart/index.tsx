/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 图表组件
 * @Date: 2019-12-28 15:20:27
 * @LastModified: Oceanxy
 * @LastModifiedTime: 2019-12-28 15:20:27
 */

import './index.scss';
import React, { useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';

const TestChart = (props: any) => {
  const { data, getData } = props;
  const option = {
    // @ts-ignore
    backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
      {
        offset: 0,
        color: '#f7f8fa'
      },
      {
        offset: 1,
        color: '#cdd0d5'
      }
    ]),
    title: {
      text: '1990 与 2015 年各国家人均寿命与 GDP'
    },
    legend: {
      right: 10,
      data: ['1990', '2015']
    },
    xAxis: {
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      scale: true
    },
    series: [
      {
        name: '1990',
        data: data[0],
        type: 'scatter',
        symbolSize: (data: any) => {
          return Math.sqrt(data[2]) / 5e2;
        },
        label: {
          emphasis: {
            show: true,
            formatter: (param: any) => {
              return param.data[3];
            },
            position: 'top'
          }
        },
        itemStyle: {
          normal: {
            shadowBlur: 10,
            shadowColor: 'rgba(120, 36, 50, 0.5)',
            shadowOffsetY: 5,
            // @ts-ignore
            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
              {
                offset: 0,
                color: 'rgb(251, 118, 123)'
              },
              {
                offset: 1,
                color: 'rgb(204, 46, 72)'
              }
            ])
          }
        }
      },
      {
        name: '2015',
        data: data[1],
        type: 'scatter',
        symbolSize: (data: any) => {
          return Math.sqrt(data[2]) / 5e2;
        },
        label: {
          emphasis: {
            show: true,
            formatter: (param: any) => {
              return param.data[3];
            },
            position: 'top'
          }
        },
        itemStyle: {
          normal: {
            shadowBlur: 10,
            shadowColor: 'rgba(25, 100, 150, 0.5)',
            shadowOffsetY: 5,
            // @ts-ignore
            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
              {
                offset: 0,
                color: 'rgb(129, 227, 238)'
              },
              {
                offset: 1,
                color: 'rgb(25, 183, 207)'
              }
            ])
          }
        }
      }
    ]
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="test-chart">
      <span>ECharts测试：</span>
      {data && data.length > 1 ? <ReactEcharts option={option} /> : <span>暂无数据</span>}
    </div>
  );
};

export default TestChart;
