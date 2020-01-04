/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 高德地图组件
 * @Date: 2020-01-04 11:43:57
 * @LastModified: Oceanxy
 * @LastModifiedTime: 2020-01-04 11:43:57
 */

import React, { CSSProperties } from 'react';
import { Map } from 'react-amap';
import './index.scss';

export interface IMap {
  mapKey: string;
  style: CSSProperties;
}

/**
 * 导航菜单组件
 */
const AMap = (props: IMap) => {
  return (
    <div className="map-container" style={props.style}>
      <Map amapkey={props.mapKey} mapStyle="amap://styles/grey" />
    </div>
  );
};

export default AMap;
