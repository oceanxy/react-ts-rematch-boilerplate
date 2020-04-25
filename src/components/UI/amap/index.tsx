/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 高德地图组件
 * @Date: 2020-01-04 11:43:57
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-08 周三 14:47:41
 */

import Container, { IContainerProps } from '@/components/UI/containerComp';
import config from '@/config';
import { useScript } from '@/utils/hooks/loadScript';
import React from 'react';
import './index.scss';
import Map from './map';
import POI from './POI';
import Boundary from './boundary';

/**
 * 动态加载高德地图
 * @type {(props: any) => any}
 */
const UseMap = useScript(`https://webapi.amap.com/maps?v=${config.map.mapVersion}&key=${config.map.mapKey}`, () =>
  import('./map')
);

export interface IZWMapProps extends IContainerProps<any> {
  map?: AMap.Map;
  updateMapInstance?: (map: AMap.Map) => void;
}

/**
 * 地图组件
 */
const ZWMap = (props: IZWMapProps) => {
  const { map, updateMapInstance } = props;

  return (
    <Container id="mapContainer" className="inter-plat-map" {...props}>
      {map ? null : <UseMap updateMapInstance={updateMapInstance} />}
    </Container>
  );
};

export { POI, Map, Boundary };
export default ZWMap;
