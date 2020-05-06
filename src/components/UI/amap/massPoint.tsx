/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 海量点组件
 * @Date: 2020-01-14 17:50:59
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-30 周四 16:38:18
 */

import config from '@/config';
import { message } from 'antd';

import React, { useEffect } from 'react';
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

function closeInfoWindow(infoWindow: AMap.InfoWindow, e: Event) {
  if ((e.target as HTMLDivElement)?.className === 'inter-plat-map-info-window-close') {
    infoWindow.close();
  }
}

/**
 * 设置窗体
 * @returns {AMap.InfoWindow<any>}
 */
function setInfoWindow() {
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
function setMass(props: Pick<MassPointProps, 'data' | 'map'>) {
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
  // 事件弹窗实例
  let infoWindow: any;
  // 海量点实例
  let mass: any;
  // 标注实例
  const marker = new AMap.Marker({content: '', map});

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
   * 数据更新时，更新地图上的海量点
   */
  useEffect(() => {
    /**
     * 海量点点击事件
     */
    mass.on('click', async (e: any) => {
      console.log(e.data);
      const response = await fetchWindowInfo({
        monitorId: e.data.monitorId,
        monitorType: e.data.monitorType
      });

      if (+response.retCode === 0) {
        infoWindow.setContent(infoWindowTemplate(response.data));
        infoWindow.open(map!, e.data.lnglat);
      } else {
        message.error('获取信息失败，请稍候再试！');
      }
    });

    // 监听海量点弹窗关闭
    document
      .getElementsByClassName('amap-maps')[0]
      .addEventListener('click', closeInfoWindow.bind(null, infoWindow));

    return () => {
      // 移除事件
      mass.off('click', () => {
      });
      document
        .getElementsByClassName('amap-maps')[0]
        .removeEventListener('click', closeInfoWindow.bind(null, infoWindow));
    };
  }, [JSON.stringify(props.data.positionList)]);

  /**
   * 初始化组件时请求数据
   */
  useEffect(() => {
    fetchMassPoint(-1);
  }, []);

  return null;
};

export default MassPoint;
