/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 按区域统计数据组件
 * @Date: 2020-04-07 周二 15:19:04
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-10 周五 16:26:54
 */

import Container from '@/components/UI/containerComp';
import Histogram from '@/components/UI/histogram';
import { AdminDivisionControl, RegionalControl, RegionTabs } from '@/containers/home/resourceStatistics';
import { ERegionSRType } from '@/models/home/resourceStatistics/regionTabs';
import { boundsToString, px2vw } from '@/utils/helper';
import * as echarts from 'echarts';
import React, { useEffect } from 'react';
import './index.scss';

/**
 * 按区域搜索资源组件props
 */
interface IRegionProps {
  type: IRegionTabsState['currentType']
  data: IResourceStatisticsData
  fenceId: IFenceState['currentFenceId']
  value: IAdminDivisionResourcesState['value'],
  bounds: IAdminDivisionResourcesState['bounds']
  getARData: IAdminDivisionResourcesModel['effects']['fetchData']
  getRRData: IRegionalResourcesModel['effects']['fetchData']
}

/**
 * 按区域搜索资源组件
 * @param props
 * @returns {any}
 * @constructor
 */
const Region = (props: Partial<IRegionProps>) => {
  const {data, type, bounds, getARData, getRRData, value, fenceId} = props;
  const boundStr = boundsToString(bounds);

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
      top: 10,
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

  // 获取资源统计柱状图数据-行政区划内资源
  useEffect(() => {
    if (value?.length && boundStr) {
      getARData!({
        supportMonitorType: -1,
        administrativeLngLat: boundStr
      });
    }
  }, [boundStr]);

  // 获取资源统计柱状图数据-区域内资源
  useEffect(() => {
    if (fenceId === '' || fenceId) {
      getRRData!();
    }
  }, [fenceId]);

  return (
    <Container className="resource-statistics-right">
      <RegionTabs />
      {
        type === ERegionSRType.AR ? (
          <AdminDivisionControl />
        ) : (
          <RegionalControl />
        )
      }
      <Histogram option={option} style={{height: px2vw(120)}} />
    </Container>
  );
};

export default Region;