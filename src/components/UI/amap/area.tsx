/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 区域（围栏）组件
 * @Date: 2020-05-11 周一 16:23:37
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-11 周一 16:23:37
 */

import { FenceType } from '@/models/UI/fence';
import React, { useEffect } from 'react';
import './index.scss';

// 区域弹窗实例
let infoWindow: any;

/**
 * 区域组件Render Props
 */
export interface AreaProps {
  map: IAMapState['mapInstance']
  data: IFenceState['mapFences']
  triggers: IDisplayContentState['triggers']
  fetchFenceAreaData: IFenceModel['effects']['fetchAreaData']
  fetchFenceDetails: IFenceModel['effects']['fetchDetails']
}

/**
 * 设置窗体
 * @returns {AMap.InfoWindow<any>}
 */
const setInfoWindow = (): AMap.InfoWindow => {
  return new AMap.InfoWindow({
    closeWhenClickMap: true,
    autoMove: true,
    isCustom: true,
    showShadow: false,
    offset: new AMap.Pixel(0, 6)
  });
};

/**
 * 海量点组件
 */
const Area = (props: AreaProps) => {
  const {map, triggers, fetchFenceAreaData, data} = props;

  useEffect(() => {
    fetchFenceAreaData();
  }, [JSON.stringify(triggers.slice(-1))]);

  useEffect(() => {
    const areas = data?.fenceList.map((fence) => {
      const {longitude, latitude, radius, width, points} = fence.locationData;

      switch (fence.fenceType) {
        case FenceType.Circle:
          return new AMap.Circle({
            center: new AMap.LngLat(longitude, latitude), // 圆心位置
            radius: radius,  // 半径
            strokeWeight: 0,  // 线粗细度
            fillColor: `#${fence.colorCode}`,  // 填充颜色
            fillOpacity: fence.transparency / 100 // 填充透明度
          });
        case FenceType.Marker:
          return new AMap.Marker({
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
            position: [longitude, latitude]
          });
        case FenceType.Line:
          return new AMap.Polyline({
            path: points,
            borderWeight: width, // 线条宽度，默认为 1
            strokeColor: `#${fence.colorCode}`, // 线条颜色
            lineJoin: 'round' // 折线拐点连接处样式
          });
        case FenceType.Polygon:
        case FenceType.Administration:
        default:
          return new AMap.Polygon({
            path: points,
            fillColor: `#${fence.colorCode}`, // 多边形填充颜色
            fillOpacity: fence.transparency / 100
          });
      }
    });

    // 将以上覆盖物添加到地图上
    if (areas) {
      map!.add(areas);
    }
  }, [JSON.stringify(data)]);

  return null;
};

export default Area;
