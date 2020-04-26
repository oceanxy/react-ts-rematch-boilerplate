/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 高德地图组件
 * @Date: 2020-01-04 11:43:57
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-26 周日 09:55:39
 */

import Container, { IContainerProps } from '@/components/UI/containerComp';
import config from '@/config';
import { useScript } from '@/utils/hooks/loadScript';
import React from 'react';
import Boundary from './boundary';
import './index.scss';
import Map from './map';
import MouseTool from './mouseTool';
import POI from './POI';

/**
 * 动态加载高德地图
 * @type {(props: any) => any}
 */
const UseMap = useScript(`https://webapi.amap.com/maps?v=${config.map.mapVersion}&key=${config.map.mapKey}`, () =>
  import('./map')
);

/**
 * 地图组件Render Props
 */
export interface IZWMapProps extends IContainerProps<any> {
  map: IAMapState['mapInstance']
  mouseToolType: IAMapState['mouseToolType']
  callback: IAMapState['callback']
  setState: IAMapModel['effects']['setState']
}

/**
 * 地图组件
 */
const ZWMap = (props: Partial<IZWMapProps>) => {
  const {map, setState, mouseToolType, callback} = props;

  return (
    <Container id="mapContainer" className="inter-plat-map" {...props}>
      {
        map ?
          <MouseTool map={map} mouseToolType={mouseToolType} callback={callback} setState={setState} /> :
          <UseMap setState={setState} />
      }
    </Container>
  );
};

export { POI, Map, Boundary };
export default ZWMap;
