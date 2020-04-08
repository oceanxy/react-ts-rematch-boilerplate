/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 按区域统计数据组件
 * @Date: 2020-04-07 周二 15:19:04
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-08 周三 11:40:13
 */

import Container from '@/components/UI/containerComp';
import Histogram from '@/components/UI/histogram';
import { AdministrativeRegions, RegionTabs } from '@/containers/home/resourceStatistics';
import { IEventDetailsData } from '@/models/home/eventModel/eventDetails';
import { IResourceStatisticsData } from '@/models/home/resourceStatistics';
import { IAdministrativeRegionRequest } from '@/models/home/resourceStatistics/administrativeRegions';
import { IRegionsRequest } from '@/models/home/resourceStatistics/regions';
import { ERegionSRType, IRegionTabsState } from '@/models/home/resourceStatistics/regionTabs';
import Select from 'antd/es/select';
import * as echarts from 'echarts';
import React, { useEffect } from 'react';
import './index.scss';

/**
 * 按区域搜索资源组件props
 */
interface IRegionsProps {
  type: IRegionTabsState['currentType']
  eventId: IEventDetailsData['eventId']
  data: IResourceStatisticsData
  getData: (reqPayload?: IAdministrativeRegionRequest | IRegionsRequest) => void
}

/**
 * 按区域搜索资源组件
 * @param props
 * @returns {any}
 * @constructor
 */
const Region = (props: Partial<IRegionsProps>) => {
  const {
    // eventId 与事件联动
    data,
    getData,
    type
  } = props;

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
    // 页面加载后，且按区域统计资源的类型为按区域（围栏）统计时，才加载数据
    // 因为按行政区划统计目前是手动触发，需要选择行政区划后才加载数据
    if (type === ERegionSRType.FR) {
      getData!();
    }
  }, [
    // eventId // 与事件联动
  ]);

  return (
    <Container className="resource-statistics-right">
      <RegionTabs />
      {
        type === ERegionSRType.AR ? (
          <AdministrativeRegions />
        ) : (
          <Select placeholder="防火区域" className='resource-statistics-fence'>
            <Select.Option value={1}>1</Select.Option>
            <Select.Option value={2}>2</Select.Option>
            <Select.Option value={3}>3</Select.Option>
          </Select>
        )
      }
      <Histogram option={option} />
    </Container>
  );
};

export default Region;