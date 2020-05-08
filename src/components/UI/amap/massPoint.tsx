/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 海量点组件
 * @Date: 2020-01-14 17:50:59
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-08 周五 14:41:59
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
  fetchMassPoint: IAMapModel['effects']['fetchMassPoint']
  fetchWindowInfo: IAMapModel['effects']['fetchWindowInfo']
  data: IAMapState['massPoints']
  intercomGroupState: IIntercomGroupState,
  setIntercomGroupState: IIntercomGroupModel['effects']['setState']
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
}

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
  const {fetchMassPoint, data, fetchWindowInfo, intercomGroupState, setIntercomGroupState} = props;
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
   * 处理窗体按钮事件
   * @param {Event} e
   */
  const handleButtonEvent = (e: Event) => {
    const ele = (e.target as HTMLButtonElement);

    if (ele?.className.includes('handle-event')) {
      infoWindow.close();
      setIsShowModal(true);
    } else if (ele?.className.includes('intercom-call')) {
      const intercomParams = {
        intercomGroupState,
        setIntercomGroupState,
        curMassPointInfo: curMassPointInfo as InfoWindowResponse
      };

      openIntercomCall(intercomParams);
    }
  };

  /**
   * 关闭海量点弹窗
   * @param {Event} e
   */
  const closeInfoWindow = (e: Event) => {
    if ((e.target as HTMLDivElement)?.className === 'inter-plat-map-info-window-close') {
      // 关闭海量点信息弹窗
      infoWindow.close();
      // 关闭时间处理对话框
      setIsShowModal(false);
      // 清空当前选中的海量点信息
      setCurMassPointInfo(undefined);
    }
  };

  /**
   * 海量点数据更新时，重新渲染海量点及绑定事件
   */
  useEffect(() => {
    // 获取元素
    const amapContainer = document.querySelector('.amap-maps');
    const amapOverlays = document.querySelector('.amap-overlays');

    // 监听按钮事件
    amapContainer?.removeEventListener('click', closeInfoWindow);
    amapContainer?.addEventListener('click', closeInfoWindow);
    amapOverlays?.removeEventListener('click', handleButtonEvent);
    amapOverlays?.addEventListener('click', handleButtonEvent);

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
        // 窗体绑定数据并显示
        infoWindow.setContent(infoWindowTemplate(response.data, e.data as MassPoint));
        infoWindow.open(map!, e.data.lnglat);
        setCurMassPointInfo(response.data);
      } else {
        setCurMassPointInfo(undefined);
        message.error('获取信息失败，请稍候再试！');
      }
    });

    return () => {
      // 移除事件
      mass.off('click');
      amapContainer?.removeEventListener('click', closeInfoWindow);
      amapOverlays?.removeEventListener('click', handleButtonEvent);
    };
  }, [JSON.stringify(props.data.positionList), intercomGroupState, JSON.stringify(curMassPointInfo)]);

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
