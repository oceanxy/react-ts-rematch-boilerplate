/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 海量点组件
 * @Date: 2020-01-14 17:50:59
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-11 周一 10:07:42
 */

import config from '@/config';
import { HandleEvent } from '@/containers/home/eventModel';
import { CurActiveGroupType } from '@/models/home/intercom/group';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import carPng from './images/dispatch-car.png';
import peoplePng from './images/dispatch-people.png';
import suppliesPng from './images/dispatch-supplies.png';
import thingPng from './images/dispatch-thing.png';
import './index.scss';
import infoWindowTemplate from './infoWindow';

/**
 * 海量点组件Render Props
 */
export interface MassPointProps {
  map: IAMapState['mapInstance']
  curMassPoint: IAMapState['curMassPoint']
  fetchMassPoint: IAMapModel['effects']['fetchMassPoint']
  fetchWindowInfo: IAMapModel['effects']['fetchWindowInfo']
  data: IAMapState['massPoints']
  intercomGroupState: IIntercomGroupState,
  setIntercomGroupState: IIntercomGroupModel['effects']['setState']
  mapDispatchers: IAMapModel['effects']
  curSelectedMonitorId: IEventListState['curSelectedMonitorId']
}

/**
 * 实体对讲Props
 */
interface EntityIntercomCallProps {
  intercomGroupState: IIntercomGroupState,
  setIntercomGroupState: IIntercomGroupModel['effects']['setState'],
  curMassPointInfo: InfoWindowResponse
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
 * 设置海量点
 * @param {IAMapState['massPoints']} data
 */
const setMass = (data: IAMapState['massPoints']): AMap.MassMarks => {
  // 海量点图标样式
  let style;
  if (!config.mock) {
    style = data.iconSortList.map((icon) => ({
      url: icon,
      anchor: new AMap.Pixel(0, 0),
      size: new AMap.Size(24, 24)
    }));
  } else {
    style = [{
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
    }];
  }

  return new AMap.MassMarks(data.positionList, {
    zIndex: 100, // 海量点图层叠加的顺序
    style, // 设置样式对象
    cursor: 'pointer'
  });
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
    fetchMassPoint, data, fetchWindowInfo, curMassPoint, curSelectedMonitorId,
    intercomGroupState, setIntercomGroupState, mapDispatchers
  } = props;
  const map = props.map!;
  const {setState, clearCurMassPoint} = mapDispatchers;
  /**
   * 处理事件对话框显示状态
   */
  const [isShowModal, setIsShowModal] = useState(false);
  // 事件弹窗实例
  let infoWindow: any;
  // 海量点实例
  let mass: any;
  // 标注实例
  // const marker = new AMap.Marker({content: '', map});

  if (!mass) {
    mass = setMass(props.data);
  } else {
    mass.setData(props.data);
  }

  if (!infoWindow) {
    infoWindow = setInfoWindow();
  }

  /**
   * 处理窗体按钮事件
   * @param {Event} e
   */
  const handleButtonEvent = (e: Event) => {
    const ele = (e.target as HTMLButtonElement);

    if (curMassPoint) {
      if (ele?.className.includes('handle-event')) {
        map.clearInfoWindow();
        clearCurMassPoint();
        setIsShowModal(true);
      } else if (ele?.className.includes('intercom-call')) {
        const intercomParams = {
          intercomGroupState,
          setIntercomGroupState,
          curMassPointInfo: curMassPoint
        };

        openIntercomCall(intercomParams);
      }
    }
  };

  /**
   * 关闭海量点弹窗
   * @param {Event} e
   */
  const closeInfoWindow = (e: Event) => {
    if ((e.target as HTMLDivElement)?.className === 'inter-plat-map-info-window-close') {
      // 关闭海量点信息弹窗
      map.clearInfoWindow();
      // 关闭时间处理对话框
      setIsShowModal(false);
      // 清空当前选中的海量点信息
      clearCurMassPoint();
    }
  };

  useEffect(() => {
    // 获取海量点数据
    fetchMassPoint(-1);
  }, []);

  /**
   * 初始化地图组件及地图相关元素和数据
   */
  useEffect(() => {
    // 在地图上设置海量点
    if (data.positionList.length) {
      mass.setMap(map);
    }

    // curMassPoint字段更新后打开地图上指定海量点的信息弹窗
    if (!config.mock && curMassPoint) {
      const lnglat: [number, number] = [curMassPoint.location.longitude, curMassPoint.location.latitude];

      infoWindow.setContent(infoWindowTemplate(curMassPoint));
      infoWindow.open(map!, lnglat);
      map.setCenter(lnglat);
    }

    /**
     * 海量点点击事件
     */
    mass.off('click').on('click', async (e: any) => {
      const {monitorId, monitorType} = e.data;

      // 请求弹窗内的数据
      const response = await fetchWindowInfo({
        monitorId,
        monitorType
      });

      if (+response.retCode === 0) {
        setState({curMassPoint: response.data});
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
    });
  }, [JSON.stringify(props.data.positionList), curMassPoint]);

  useEffect(() => {
    // 获取地图元素
    const amapOverlays = document.querySelector('.amap-overlays');
    const amapContainer = document.querySelector('.amap-maps');

    // 监听地图弹窗关闭事件
    amapContainer?.addEventListener('click', closeInfoWindow);
    // 监听功能按钮事件
    amapOverlays?.addEventListener('click', handleButtonEvent);

    return () => {
      amapContainer?.removeEventListener('click', closeInfoWindow);
      amapOverlays?.removeEventListener('click', handleButtonEvent);
    };
  }, [intercomGroupState, JSON.stringify(curMassPoint)]);

  useEffect(() => {
    (async () => {
      // 请求弹窗内的数据
      const response = await fetchWindowInfo();

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
  }, [curSelectedMonitorId]);

  return (
    <HandleEvent
      visible={isShowModal}
      curMassPointInfo={curMassPoint}
      setIsShowModal={setIsShowModal}
    />
  );
};

export default MassPoint;
