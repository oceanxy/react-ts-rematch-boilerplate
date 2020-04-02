/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 高德地图组件
 * @Date: 2020-01-04 11:43:57
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-01 周三 09:04:01
 */

import Container, { IContainer } from '@/components/UI/containerComp';
import config from '@/config';
import { useScript } from '@/utils/hooks/loadScript';
import React from 'react';
import './index.scss';
import Map from './map';
import POI from './POI';

/**
 * 动态加载高德地图
 * @type {(props: any) => any}
 */
const UseMap = useScript(`https://webapi.amap.com/maps?v=${config.map.mapVersion}&key=${config.map.mapKey}`, () =>
  import('./map')
);

export interface IZWMap extends IContainer<any> {
  map?: AMap.Map;
  updateMapInstance?: (map: AMap.Map) => void;
}

/**
 * 地图组件
 */
const ZWMap = (props: IZWMap) => {
  const { map, updateMapInstance } = props;

  return (
    <Container id="mapContainer" className="inter-plat-map" {...props}>
      {map ? null : <UseMap updateMapInstance={updateMapInstance} />}
    </Container>
  );
};

export { POI, Map };
export default ZWMap;
