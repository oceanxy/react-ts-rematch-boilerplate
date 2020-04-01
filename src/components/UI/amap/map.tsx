/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 高德地图POI搜索组件
 * @Date: 2020-03-31 周二 09:03:31
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-03-31 周二 09:03:31
 */

import React, { useEffect } from 'react';

interface IMap {
  updateMapInstance: (map: AMap.Map) => void;
}

const Map = (props: IMap) => {
  useEffect(() => {
    const map = new AMap.Map('mapContainer', {
      viewMode: '3D',
      pitch: 50,
      zoom: 14,
      resizeEnable: true,
      // center: [116.397428, 39.90923], //地图中心点
      keyboardEnable: false,
      mapStyle: 'amap://styles/grey'
    });

    props.updateMapInstance(map);
  }, []);

  return null;
};

export default Map;
