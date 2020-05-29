/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 区域（围栏）组件
 * @Date: 2020-05-11 周一 16:23:37
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-20 周三 09:31:35
 */

import infoWindowTemplate from '@/components/UI/amap/infoWindow';
import { FenceType } from '@/models/UI/fence';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
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
  searchPanelState: ISearchState
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
    offset: new AMap.Pixel(0, -30)
  });
};

/**
 * 区域（围栏）组件
 * @param {AreaProps} props
 * @returns {null}
 * @constructor
 */
const Area = (props: AreaProps) => {
  const {map, triggers, dispatch, data, curArea, mapDispatch, searchPanelState, setSearchState} = props;
  const {target, isShowResultPanel} = searchPanelState;
  const {setState: setMapState} = mapDispatch;
  const {fetchAreaData, setState, fetchDetails} = dispatch;
  const areaTrigger: ITrigger = triggers.slice(-1)[0];
  // 绘制的临时围栏集合
  const [tempArea, setTempArea] = useState({ids: [] as string[], overlays: [] as any});
  // 定时刷新地图围栏定时器的缓存
  const [areaPolling, setAreaPolling] = useState(0);

  /**
   * 处理点击围栏事件
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
      message.error('获取围栏信息失败，请稍候再试！');
    }
  };

  /**
   * 创建围栏
   * @param {IFenceArea[]} data
   * @param {boolean} tempFence 绘制为临时围栏
   * @returns {any[]}
   */
  const createOverlays = (data: IFenceArea[], tempFence?: boolean) => {
    let fenceStyle: any;

    if (!tempFence) {
      fenceStyle = {
        strokeWeight: 0,  // 边框线粗细度
        strokeColor: 'transparent' // 边框线颜色
      };
    } else {
      fenceStyle = {
        strokeWeight: 2,  // 边框线粗细度
        strokeColor: '#3f8ee0', // 边框线颜色
        strokeStyle: 'dashed', // 边框线类型
        zIndex: 1000
      };
    }

    return data.map((fence) => {
      const {radius, points, centerPoint} = fence.locationData;
      const {longitude, latitude} = centerPoint;
      let tempOverlays;

      if (fence.fenceType === FenceType.Circle) {
        tempOverlays = new AMap.Circle({
          extData: fence,
          ...fenceStyle,
          center: new AMap.LngLat(longitude, latitude), // 圆心位置
          radius: radius,  // 半径
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
          ...fenceStyle,
          path: points,
          strokeWeight: 4, // 线条宽度，默认为 1
          lineJoin: 'round', // 折线拐点连接处样式
          strokeColor: `#${fence.colorCode}` // 线条颜色
        });
      } else {
        tempOverlays = new AMap.Polygon({
          extData: fence,
          ...fenceStyle,
          path: points,
          fillColor: `#${fence.colorCode}`, // 多边形填充颜色
          fillOpacity: fence.transparency / 100,
          lineJoin: 'round' // 折线拐点连接处样式
        });
      }

      if (!tempFence) {
        (tempOverlays as Overlay).on('click', handleClickOverlay);
      }

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

  // 显示内容组件控制的地图围栏显示状态
  useEffect(() => {
    if (areaTrigger.status) {
      fetchAreaData();

      if (!areaPolling) {
        setAreaPolling(setInterval(() => {
          fetchAreaData();
        }, 30000));
      }
    } else {
      setState({mapFences: undefined});
      clearInterval(areaPolling);
      setAreaPolling(0);
    }

    return () => {
      clearInterval(areaPolling);
      setAreaPolling(0);
    };
  }, [areaTrigger.status]);

  // 区域数据变更后触发地图上的区域重绘
  useEffect(() => {
    const areas = createOverlays(data?.fenceList || []);

    // 清除地图上已存在的覆盖物
    map?.clearMap();

    if (areas) {
      // 将新的覆盖物覆盖物添加到地图上
      map!.add(areas);
    }
  }, [data]);

  // 地图上当前选中区域状态变更后触发弹窗
  useEffect(() => {
    if (curArea) {
      if (curArea?.fenceDetails) {
        const {longitude, latitude} = curArea?.fenceDetails?.locationData.centerPoint;

        // 如果是通过搜索面板触发的围栏信息更新，则在地图上新绘制一个临时围栏
        if (target) {
          // 避免重复绘制
          if (!tempArea.ids.includes(target.id)) {
            const overlay = createOverlays([target.details as IFenceArea], true);

            setTempArea({
              ids: [...tempArea.ids, target.id],
              overlays: [...tempArea.overlays, overlay[0]]
            });

            map!.add(overlay);
          }

          // 重置搜索面板的target状态
          setSearchState({target: undefined});
        }

        if (longitude && latitude) {
          infoWindow.setContent(infoWindowTemplate(curArea));
          infoWindow.open(map!, [longitude, latitude]);
          map!.setCenter([longitude, latitude]);
        } else {
          console.error('区域的经纬度有误，请确认！');
        }
      } else {
        message.error('获取围栏信息失败，请稍候再试！');
      }
    }
  }, [curArea]);

  // 如果关闭了搜索组件的搜索结果面板，则清空临时围栏
  useEffect(() => {
    if (!isShowResultPanel && tempArea.overlays.length) {
      map?.remove(tempArea.overlays);
      setTempArea({ids: [], overlays: []});
    }
  }, [isShowResultPanel]);

  return null;
};

export default Area;
