/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 高德地图POI搜索组件
 * @Date: 2020-03-31 周二 09:03:31
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-26 周日 14:24:54
 */

import React, { useEffect } from 'react';

/**
 * 高德地图Render Props
 */
interface IMapProps {
  setState: IAMapModel['effects']['setState']
}

/**
 * 高德地图组件
 * @param {IMapProps} props
 * @returns {null}
 * @constructor
 */
const Map = (props: IMapProps) => {
  useEffect(() => {
    const map = new AMap.Map('mapContainer', {
      // viewMode: '3D',
      pitch: 50,
      zoom: 14,
      resizeEnable: true,
      // center: [116.397428, 39.90923], //地图中心点
      keyboardEnable: false,
      mapStyle: 'amap://styles/grey'
    });

    props.setState({mapInstance: map});
  }, []);

  return null;
};

export default Map;
