/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 海量点组件（为了在mock数据时让弹窗位置更真实，本组件做了一些额外的mock逻辑处理）
 * @Date: 2020-01-14 17:50:59
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-21 周四 15:49:11
 */

import config from '@/config';
import {HandleEvent} from '@/containers/home/eventModel';
import {CurActiveGroupType} from '@/models/home/intercom/groupName';
import {store} from '@/store';
import {message} from 'antd';
import React, {useEffect, useState} from 'react';
import carPng from './images/dispatch-car.png';
import peoplePng from './images/dispatch-people.png';
import suppliesPng from './images/dispatch-supplies.png';
import thingPng from './images/dispatch-thing.png';
import './index.scss';
import infoWindowTemplate from './infoWindow';
import MassMarks = AMap.MassMarks;
import Marker = AMap.Marker;

// 事件弹窗实例
let infoWindow: any;
// 海量点实例
let mass: any;

/**
 * 海量点组件Render Props
 */
export interface MassPointProps {
  map: IAMapState['mapInstance']
  curMassPoint: IAMapState['curMassPoint']
  fetchMassPoint: IAMapModel['effects']['fetchMassPoint']
  fetchWindowInfo: IAMapModel['effects']['fetchWindowInfo']
  data: IAMapState['massPoints']
  intercomGroupState: IIntercomGroupNameState,
  setIntercomGroupState: IIntercomGroupNameModel['effects']['setState']
  mapDispatchers: IAMapModel['effects']
  curSelectedEvent?: IEventListState['curSelectedEvent']
  searchPanelState: ISearchState
  setSearchState: ISearchModel['effects']['setState']
  triggers: IDisplayContentState['triggers']
}

/**
 * 实体对讲Props
 */
interface EntityIntercomCallProps {
  intercomGroupState: IIntercomGroupNameState,
  setIntercomGroupState: IIntercomGroupNameModel['effects']['setState'],
  curMassPointInfo: InfoWindowResponse
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
 * 创建marker
 * @param {InfoWindowResponse} point
 */
const createMarkers = (point: InfoWindowResponse) => {
  const {location: {latitude, longitude}, monitor: {icon}} = point;

  return new AMap.Marker({
    position: new AMap.LngLat(longitude, latitude),
    offset: icon ? new AMap.Pixel(-18, 5) : new AMap.Pixel(-10, 5),
    icon
  });
};

/**
 * 设置海量点
 * @param {IAMapState['massPoints']} data
 */
const setMass = (data: IAMapState['massPoints']): AMap.MassMarks => {
  // 海量点图标样式
  const style = getStyle(data.iconSortList);

  return new AMap.MassMarks(data.positionList, {
    zIndex: 119, // 海量点图层叠加的顺序
    style, // 设置样式对象
    cursor: 'pointer'
  });
};

/**
 * 获取海量点style集合
 * @param {string[]} iconSortList
 * @returns {AMap.MassMarks.Style[]}
 */
const getStyle = (iconSortList?: string[]): MassMarks.Style[] => {
  if (config.mock) {
    return [
      {
        url: carPng,
        anchor: new AMap.Pixel(12, -5),
        size: new AMap.Size(24, 24)
      }, {
        url: peoplePng,
        anchor: new AMap.Pixel(12, -5),
        size: new AMap.Size(24, 24)
      }, {
        url: thingPng,
        anchor: new AMap.Pixel(12, -5),
        size: new AMap.Size(24, 24)
      }, {
        url: suppliesPng,
        anchor: new AMap.Pixel(12, -5),
        size: new AMap.Size(24, 24)
      }
    ];
  }

  return (iconSortList || []).map((iconSrc) => ({
    url: iconSrc,
    anchor: new AMap.Pixel(12, -5),
    size: new AMap.Size(24, 24)
  }));
};

/**
 * 打开对讲面板
 * @param {EntityIntercomCallProps} intercomParams
 */
const openIntercomCall = (intercomParams: EntityIntercomCallProps) => {
  const {intercomGroupState, setIntercomGroupState, curMassPointInfo} = intercomParams;
  const {curActiveGroupType, id, name} = intercomGroupState;
  const {monitorName, monitorId, userId} = curMassPointInfo.monitor;

  if (curActiveGroupType === CurActiveGroupType.Null) {
    setIntercomGroupState!({
      name: monitorName,
      intercomId: userId,
      id: monitorId,
      curActiveGroupType: CurActiveGroupType.Entity
    });
  } else if (curActiveGroupType === CurActiveGroupType.Task) {
    message.destroy();
    message.warning((
      <span>任务组（<span className="highlight"> {name} </span>）正在进行对讲，暂不能进行此操作！</span>
    ));
  } else if (curActiveGroupType === CurActiveGroupType.Temporary) {
    message.destroy();
    message.warning((
      <span>临时组（<span className="highlight"> {name} </span>）正在进行对讲，暂不能进行此操作！</span>
    ));
  } else {
    message.destroy();

    if (id === curMassPointInfo.monitor.monitorId) {
      message.destroy();
      message.info((
        <span>当前监控对象（<span className="highlight"> {name} </span>）已激活对讲功能，请勿重复操作！</span>
      ));
    } else {
      message.destroy();
      message.warning((
        <span>其他监控对象（<span className="highlight"> {name} </span>）正在进行对讲，暂不能进行此操作！</span>
      ));
    }
  }
};

/**
 * 海量点组件
 */
const MassPoint = (props: MassPointProps) => {
  const {
    fetchMassPoint, data, fetchWindowInfo, curMassPoint,
    curSelectedEvent, intercomGroupState, setIntercomGroupState,
    mapDispatchers, triggers, setSearchState, searchPanelState
  } = props;
  const {target, isShowResultPanel} = searchPanelState;
  const map = props.map!;
  const {setState, clearCurMassPoint} = mapDispatchers;
  // 处理事件对话框显示状态
  const [isShowModal, setIsShowModal] = useState(false);
  // 定时刷新地图海量点定时器的缓存
  const [massPointPolling, setMassPointPolling] = useState(0);
  // 临时点集合（通过搜索面板绘制的临时点）
  const [tempMarker, setTempMarker] = useState({ids: [] as string[], markers: [] as Marker[]});

  if (!mass) {
    mass = setMass(props.data);
  } else {
    mass.clear();
    mass.setData(props.data.positionList);
    mass.setStyle(getStyle(props.data.iconSortList));
  }

  if (!infoWindow) {
    infoWindow = setInfoWindow();
  }

  /**
   * 处理海量点点击事件
   * @param e
   * @returns {Promise<void>}
   */
  const handleMassPointClick = async (e: any) => {
    const {monitorId, monitorType} = e.data;

    // 请求弹窗内的数据
    const response = await fetchWindowInfo({
      monitorId,
      monitorType
    });

    if (+response.retCode === 0) {
      // 按监控对象查，则清空当前选中事件（按监控对象查，与按事件查互斥）
      // 非事件组件内部重置此状态时，设置为undefined，禁止设置为空对象，此字段的undefined和{}是两种不同的状态
      store.dispatch.eventList.setState({curSelectedEvent: undefined});
      setState({curMassPoint: response.data});

      // 请求弹窗信息成功后，获取当前监控对象的所有事件下的所有任务
      store.dispatch.taskList.fetchData({
        selectFirstData: true,
        byMonitorId: true,
        monitorId: response.data.monitor.monitorId,
        queryType: 0,
        length: 2000
      });

      // 开启mock时，直接使用当前点击的海量点的坐标
      if (config.mock) {
        infoWindow.setContent(infoWindowTemplate(response.data));
        infoWindow.open(map!, e.data.lnglat);
        map.setCenter(e.data.lnglat);
      }
    } else {
      clearCurMassPoint();
      message.error('获取信息失败，请稍候再试！');
    }
  };

  /**
   * 处理地图事件
   * 因高德地图信息弹窗不支持JSX及ReactNode，所以本组件使用DOM的HTMLElement，
   * 并用DOM2级方法 addEventListener 和 removeEventListener来处理事件监听
   * @param e
   */
  const handleMapEvent = (e: Event) => {
    const ele = (e.target as HTMLButtonElement);

    if (curMassPoint) {
      // 打开处理事件对话框
      if (ele?.className.includes('handle-event')) {
        // 清除海量点弹窗。目前改为不关闭海量点弹窗，而是移动地图可视区域，以便处理事件对话框不重叠在海量点弹窗上
        // map.clearInfoWindow();

        // 视图移动前，复位地图视图到原经纬度坐标，防止每点击一次就移动一次地图
        map.setCenter([curMassPoint.location.longitude, curMassPoint.location.latitude]);
        // 设置地图视图移动
        map.panBy(-350, -80);

        setIsShowModal(true);
      } /** 开启监控对象对讲面板 */ else if (ele?.className.includes('intercom-call')) {
        const intercomParams = {
          intercomGroupState,
          setIntercomGroupState,
          curMassPointInfo: curMassPoint
        };

        openIntercomCall(intercomParams);
      } /** 处理关闭海量点弹窗相关逻辑 */ else if (ele?.className.includes('inter-plat-map-info-window-close')) {
        // 关闭海量点弹窗
        map.clearInfoWindow();
        // 关闭事件处理对话框
        setIsShowModal(false);
        // 清空当前选中的海量点信息
        clearCurMassPoint();
      }
    }
  };

  // 获取海量点数据
  useEffect(() => {
    fetchMassPoint();

    if (!massPointPolling) {
      setMassPointPolling(setInterval(() => {
        fetchMassPoint();
      }, 30000));
    }

    return () => {
      clearInterval(massPointPolling);
      setMassPointPolling(0);
    };
  }, [JSON.stringify(triggers.slice(0, 4))]);

  // 海量点数据变更时更新地图上的海量点
  useEffect(() => {
    // 在地图上设置海量点
    if (data.positionList.length) {
      mass.setMap(map);
    }

    // 海量点点击事件
    mass.on('click', handleMassPointClick);

    return () => {
      mass.off('click', handleMassPointClick);
    };
  }, [props.data.positionList]);

  // 当前点击海量点弹窗或其他事件激活的弹窗的信息更新
  useEffect(() => {
    // curMassPoint字段更新后打开地图上指定海量点的信息弹窗
    if ((!config.mock || target) && curMassPoint) {
      const longitude = curMassPoint.location?.longitude;
      const latitude = curMassPoint.location?.latitude;

      if (longitude && latitude) {
        const lnglat: [number, number] = [longitude, latitude];

        infoWindow.setContent(infoWindowTemplate(curMassPoint));
        infoWindow.open(map!, lnglat);
        map.setCenter(lnglat);

        // 当通过点击搜索结果面板激活海量点弹窗时，当弹窗打开后清除该状态
        if (target) {
          // 避免重复绘制marker
          if (!tempMarker.ids.includes(target.id)) {
            const marker = createMarkers(curMassPoint);

            setTempMarker({
              ids: [...tempMarker.ids, target.id],
              markers: [...tempMarker.markers, marker]
            });

            map!.add(marker);
          }

          // 重置搜索面板的target状态
          setSearchState({target: undefined});
        }
      }
    }
  }, [curMassPoint]);

  // 如果关闭了搜索组件的搜索结果面板，则清空临时marker
  useEffect(() => {
    if (!isShowResultPanel && tempMarker.markers.length) {
      map?.remove(tempMarker.markers);
      setTempMarker({ids: [], markers: []});
    }
  }, [isShowResultPanel]);

  /**
   * 根据海量点弹窗信息以及对讲面板状态的变更，重新绑定事件
   */
  useEffect(() => {
    // 获取地图元素
    const mapContainer = document.querySelector('.amap-maps');

    // 监听地图元素事件
    mapContainer?.addEventListener('click', handleMapEvent);

    return () => {
      mapContainer?.removeEventListener('click', handleMapEvent);
    };
  }, [intercomGroupState, curMassPoint]);

  /**
   * 点击事件激活弹窗时，获取弹窗数据
   */
  useEffect(() => {
    if (curSelectedEvent) {
      if (curSelectedEvent.eventId) {
        (async () => {
          // 请求弹窗内的数据
          const response = await fetchWindowInfo({
            queryType: 1, // 按事件查
            monitorId: curSelectedEvent.monitorId!,
            startTime: curSelectedEvent.startTime,
            eventType: curSelectedEvent.eventType
          });

          if (+response.retCode === 0) {
            setState({curMassPoint: response.data});
            // 开启mock时，使用mock数据展示
            if (config.mock) {
              const {data} = response;
              const {location: {longitude, latitude}} = data;

              infoWindow.setContent(infoWindowTemplate(response.data));
              infoWindow.open(map!, [longitude, latitude]);
              map.setCenter([longitude, latitude]);
            }
          } else {
            clearCurMassPoint();
            message.error('获取信息失败，请稍候再试！');
          }
        })();
      } /** 取消选中事件时清除弹框 */ else {
        map.clearInfoWindow();
      }
    }
  }, [curSelectedEvent?.eventId]);

  return isShowModal ? (
    // 事件处理组件
    <HandleEvent
      visible={isShowModal}
      curMassPointInfo={curMassPoint}
      setIsShowModal={setIsShowModal}
    />
  ) : null;
};

export default MassPoint;
