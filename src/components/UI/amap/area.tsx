/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 区域（围栏）组件
 * @Date: 2020-05-11 周一 16:23:37
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-12 周二 16:36:16
 */

import infoWindowTemplate from '@/components/UI/amap/infoWindow';
import { FenceType } from '@/models/UI/fence';
import { message } from 'antd';
import React, { useEffect } from 'react';
import './index.scss';
import Overlay = AMap.Overlay;

// 区域弹窗实例
let infoWindow: any;

/**
 * 区域组件Render Props
 */
export interface AreaProps {
  map: IAMapState['mapInstance']
  mapDispatch: IAMapModel['effects']
  data: IFenceState['mapFences']
  triggers: IDisplayContentState['triggers']
  dispatch: IFenceModel['effects']
  curArea: IAMapState['curArea']
  searchPanelTarget: ISearchState['target']
  setSearchState: ISearchModel['effects']['setState']
}

/**
 * 设置窗体
 * @returns {AMap.InfoWindow<any>}
 */
const setInfoWindow = (): AMap.InfoWindow => {
  return new AMap.InfoWindow({
    content: infoWindowTemplate(),
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
  const {map, triggers, dispatch, data, curArea, mapDispatch, searchPanelTarget, setSearchState} = props;
  const {setState: setMapState} = mapDispatch;
  const {fetchAreaData, setState, fetchDetails} = dispatch;
  const areaTrigger: ITrigger = triggers.slice(-1)[0];

  /**
   * 处理围栏点击事件
   * @param e
   * @returns {Promise<void>}
   */
  const handleClickOverlay = async (e: any) => {
    const data: IFenceArea = e.target.getExtData();

    const response = await fetchDetails({
      fenceId: data.fenceId,
      queryType: 1,
      fenceType: data.fenceType
    });

    if (+response.retCode === 0) {
      setMapState({curArea: response.data});
    } else {
      message.error('获取信息失败，请稍候再试！');
    }
  };

  /**
   * 创建围栏
   * @param {IFenceState["mapFences"]} data
   * @returns {any[] | undefined}
   */
  const createOverlays = (data: IFenceState['mapFences']) => {
    return data?.fenceList.map((fence) => {
      const {longitude, latitude, radius, width, points} = fence.locationData;
      let tempOverlays;

      if (fence.fenceType === FenceType.Circle) {
        tempOverlays = new AMap.Circle({
          extData: fence,
          center: new AMap.LngLat(longitude, latitude), // 圆心位置
          radius: radius,  // 半径
          strokeWeight: 0,  // 线粗细度
          strokeColor: 'transparent',
          fillColor: `#${fence.colorCode}`,  // 填充颜色
          fillOpacity: fence.transparency / 100 // 填充透明度
        });
      } else if (fence.fenceType === FenceType.Marker) {
        tempOverlays = new AMap.Marker({
          extData: fence,
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: [longitude, latitude]
        });
      } else if (fence.fenceType === FenceType.Line) {
        tempOverlays = new AMap.Polyline({
          extData: fence,
          path: points,
          borderWeight: width, // 线条宽度，默认为 1
          strokeColor: `#${fence.colorCode}`, // 线条颜色
          lineJoin: 'round' // 折线拐点连接处样式
        });
      } else {
        tempOverlays = new AMap.Polygon({
          extData: fence,
          path: points,
          fillColor: `#${fence.colorCode}`, // 多边形填充颜色
          fillOpacity: fence.transparency / 100,
          strokeWeight: 0,
          strokeColor: 'transparent',
          lineJoin: 'round' // 折线拐点连接处样式
        });
      }

      (tempOverlays as Overlay).on('click', handleClickOverlay);

      return tempOverlays;
    });
  };

  // 初始化弹窗
  if (!infoWindow) {
    infoWindow = setInfoWindow();

    const mapContainer = document.querySelector('.amap-maps');
    // 监听地图元素事件
    mapContainer?.addEventListener('click', (e: any) => {
      const ele = (e.target as HTMLButtonElement);

      if (ele?.className.includes('inter-plat-map-info-window-close')) {
        // 关闭海量点弹窗
        map!.clearInfoWindow();
      }
    });
  }

  useEffect(() => {
    if (areaTrigger.status) {
      fetchAreaData();
    } else {
      setState({mapFences: undefined});
    }
  }, [areaTrigger.status]);

  useEffect(() => {
    const areas = createOverlays(data);

    // 清除地图上已存在的覆盖物
    map?.clearMap();

    if (areas) {
      // 将新的覆盖物覆盖物添加到地图上
      map!.add(areas);
    }
  }, [data]);

  useEffect(() => {
    if (curArea) {
      const {longitude, latitude} = curArea?.fenceDetails.locationData!;

      infoWindow.setContent(infoWindowTemplate(curArea));
      infoWindow.open(map!, [longitude, latitude]);
      map!.setCenter([longitude, latitude]);

      if (searchPanelTarget) {
        setSearchState({target: undefined});
      }
    }
  }, [curArea]);

  return null;
};

export default Area;
