/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 高德地图组件
 * @Date: 2020-01-04 11:43:57
 * @LastModified: Oceanxy
 * @LastModifiedTime: 2020-01-04 11:43:57
 */

// @ts-ignore
// eslint-disable-next-line import/extensions,import/no-unresolved
import AMap from 'AMap';
import React, { CSSProperties, useEffect, useRef } from 'react';
import './index.scss';

export interface IMap {
  mapKey: string;
  style?: CSSProperties;
}

/**
 * 地图组件
 */
const ZWMap = (props: IMap) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = new AMap.Map('mapContainer', {
        viewMode: '3D',
        pitch: 50,
        zoom: 14
      });

      map.setMapStyle('amap://styles/grey');
    }
  });

  return <div id="mapContainer" className="map-container" ref={mapRef} />;
};

export default ZWMap;
