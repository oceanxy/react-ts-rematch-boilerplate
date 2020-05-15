/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 高德地图组件
 * @Date: 2020-01-04 11:43:57
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-15 周五 16:41:59
 */

import Area from '@/components/UI/amap/area';
import MassPoint from '@/components/UI/amap/massPoint';
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
  state: IAMapState,
  dispatch: IAMapModel['effects']
  intercomGroupState: IIntercomGroupState,
  setIntercomGroupState: IIntercomGroupModel['effects']['setState']
  curSelectedMonitorId: IEventListState['curSelectedMonitorId']
  triggers: IDisplayContentState['triggers']
  mapFences: IFenceState['mapFences']
  fenceDispatch: IFenceModel['effects']
  searchPanelTarget: ISearchState['target']
  setSearchState: ISearchModel['effects']['setState']
  overlay: IAMapState['overlay']
  setTempGroupState: ITemporaryGroupModel['effects']['setState']
}

/**
 * 地图组件
 */
const ZWMap = (props: Partial<IZWMapProps>) => {
  const {
    state, dispatch, intercomGroupState,
    setIntercomGroupState, curSelectedMonitorId,
    triggers, fenceDispatch, setSearchState,
    mapFences, searchPanelTarget, overlay, setTempGroupState
  } = props;
  const {setState, fetchMassPoint, fetchWindowInfo} = dispatch!;
  const {mapInstance: map, mouseToolType, massPoints, curMassPoint, curArea} = state!;

  return (
    <Container id="mapContainer" className="inter-plat-map" {...props}>
      {
        map ?
          (<>
            <MouseTool
              map={map}
              mouseToolType={mouseToolType}
              setState={setState}
              setTempGroupState={setTempGroupState}
              overlay={overlay}
            />
            <Area
              map={map}
              triggers={triggers!}
              mapDispatch={dispatch!}
              data={mapFences!}
              curArea={curArea}
              dispatch={fenceDispatch!}
              searchPanelTarget={searchPanelTarget}
              setSearchState={setSearchState!}
            />
            <MassPoint
              map={map}
              data={massPoints}
              setSearchState={setSearchState!}
              searchPanelTarget={searchPanelTarget}
              triggers={triggers!}
              mapDispatchers={dispatch!}
              curMassPoint={curMassPoint}
              fetchMassPoint={fetchMassPoint}
              fetchWindowInfo={fetchWindowInfo}
              intercomGroupState={intercomGroupState!}
              setIntercomGroupState={setIntercomGroupState!}
              curSelectedMonitorId={curSelectedMonitorId!}
            />
          </>) :
          <UseMap setState={setState} />
      }
    </Container>
  );
};

export { POI, Map, Boundary };
export default ZWMap;
