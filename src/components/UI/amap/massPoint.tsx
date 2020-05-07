/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 海量点组件
 * @Date: 2020-01-14 17:50:59
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-07 周四 10:59:56
 */

import config from '@/config';
import { HandleEvent } from '@/containers/home/eventModel';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import carPng from './images/dispatch-car.png';
import peoplePng from './images/dispatch-people.png';
import thingPng from './images/dispatch-thing.png';
import './index.scss';
import infoWindowTemplate from './infoWindow';

export interface MassPointProps {
  map: IAMapState['mapInstance']
  fetchMassPoint: IAMapModel['effects']['fetchMassPoint']
  fetchWindowInfo: IAMapModel['effects']['fetchWindowInfo']
  data: IAMapState['massPoints']
}

/**
 * 设置窗体
 * @returns {AMap.InfoWindow<any>}
 */
function setInfoWindow(): AMap.InfoWindow {
  return new AMap.InfoWindow({
    content: undefined,  //使用默认信息窗体框样式，显示信息内容
    closeWhenClickMap: true,
    autoMove: true,
    isCustom: true,
    showShadow: false,
    offset: new AMap.Pixel(0, 6)
  });
}

/**
 * 设置海量点
 * @param {Pick<MassPointProps, "data">} props
 */
function setMass(props: Pick<MassPointProps, 'data' | 'map'>): AMap.MassMarks {
  const {data} = props;

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
      url: peoplePng,
      anchor: new AMap.Pixel(12, -5),
      size: new AMap.Size(24, 24)
    }, {
      url: carPng,
      anchor: new AMap.Pixel(12, -5),
      size: new AMap.Size(24, 24)
    }, {
      url: thingPng,
      anchor: new AMap.Pixel(12, -5),
      size: new AMap.Size(24, 24)
    }];
  }

  return new AMap.MassMarks(data.positionList, {
    zIndex: 100, // 海量点图层叠加的顺序
    style, // 设置样式对象
    cursor: 'pointer'
  });
}

/**
 * 海量点组件
 */
const MassPoint = (props: MassPointProps) => {
  const {fetchMassPoint, data, fetchWindowInfo} = props;
  const map = props.map!;
  /**
   * 处理事件对话框显示状态
   */
  const [isShowModal, setIsShowModal] = useState(false);
  /**
   * 当前实体（监控对象）信息
   */
  const [curMassPointInfo, setCurMassPointInfo] = useState(undefined as undefined | InfoWindowResponse);
  // 事件弹窗实例
  let infoWindow: any;
  // 海量点实例
  let mass: any;
  // 标注实例
  // const marker = new AMap.Marker({content: '', map});

  if (!infoWindow) {
    infoWindow = setInfoWindow();
  }

  if (!mass) {
    mass = setMass(props);
  }

  // 在地图上设置海量点
  if (mass && data.positionList.length) {
    mass.setMap(map);
  }

  /**
   * 处理事件对话框
   * @param {Event} e
   */
  const openHandleEvent = (e: Event) => {
    if ((e.target as HTMLButtonElement)?.className.includes('handle-Event')) {
      infoWindow.close();
      setIsShowModal(true);
    }
  };

  /**
   * 关闭窗体事件
   * @param {Event} e
   */
  const closeInfoWindow = (e: Event) => {
    if ((e.target as HTMLDivElement)?.className === 'inter-plat-map-info-window-close') {
      infoWindow.close();
      setIsShowModal(false);
    }
  };

  /**
   * 数据更新时，更新地图上的海量点
   */
  useEffect(() => {
    // 获取元素
    const amapContainer = document.querySelector('.amap-maps');
    const amapOverlays = document.querySelector('.amap-overlays');

    // 监听海量点弹窗关闭事件
    amapContainer?.addEventListener('click', closeInfoWindow);

    /**
     * 海量点点击事件
     */
    mass.on('click', async (e: any) => {
      const {monitorId, monitorType} = e.data;
      // 请求弹窗内的数据
      const response = await fetchWindowInfo({
        monitorId,
        monitorType
      });

      if (+response.retCode === 0) {
        // 窗体绑定数据并显示
        infoWindow.setContent(infoWindowTemplate(response.data));
        infoWindow.open(map!, e.data.lnglat);
        setCurMassPointInfo(response.data);

        // 监听点击处理事件按钮事件
        amapOverlays?.addEventListener('click', openHandleEvent);
      } else {
        setCurMassPointInfo(undefined);
        message.error('获取信息失败，请稍候再试！');
      }
    });

    return () => {
      // 移除事件
      mass.off('click');
      amapContainer?.removeEventListener('click', closeInfoWindow);
      amapOverlays?.removeEventListener('click', openHandleEvent);
    };
  }, [JSON.stringify(props.data.positionList)]);

  /**
   * 初始化组件时请求数据
   */
  useEffect(() => {
    fetchMassPoint(-1);
  }, []);

  return (
    <HandleEvent
      visible={isShowModal}
      curMassPointInfo={curMassPointInfo}
      setIsShowModal={setIsShowModal}
    />
  );
};

export default MassPoint;
