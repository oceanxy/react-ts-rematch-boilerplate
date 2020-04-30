/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 海量点组件
 * @Date: 2020-01-14 17:50:59
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-30 周四 16:38:18
 */

import config from '@/config';
import React, { useEffect } from 'react';
import './index.scss';

interface MassPointProps {
  map: IAMapState['mapInstance']
  fetchMassPoint: IAMapModel['effects']['fetchMassPoint']
  data: IAMapState['massPoints']
}

/**
 * 海量点组件
 */
const MassPoint = (props: MassPointProps) => {
  const {fetchMassPoint, data} = props;
  const map = props.map!;

  let style;
  if (!config.mock) {
    style = data.iconSortList.map((icon) => ({
      url: icon,
      anchor: new AMap.Pixel(6, 6),
      size: new AMap.Size(24, 24)
    }));
  } else {
    style = [{
      url: 'https://a.amap.com/jsapi_demos/static/images/mass0.png',
      anchor: new AMap.Pixel(6, 6),
      size: new AMap.Size(24, 24)
    }, {
      url: 'https://a.amap.com/jsapi_demos/static/images/mass1.png',
      anchor: new AMap.Pixel(4, 4),
      size: new AMap.Size(24, 24)
    }, {
      url: 'https://a.amap.com/jsapi_demos/static/images/mass2.png',
      anchor: new AMap.Pixel(3, 3),
      size: new AMap.Size(24, 24)
    }];
  }

  const mass = new AMap.MassMarks(data.positionList, {
    zIndex: 5, // 海量点图层叠加的顺序
    style, // 设置样式对象
    cursor: 'pointer'
  });

  // const marker = new AMap.Marker({content: '', map});

  // mass.on('mouseover', (e: any) => {
  //   marker.setPosition(e.data.lnglat);
  //   marker.setLabel({content: e.data.name});
  // });

  mass.setMap(map);

  useEffect(() => {
    fetchMassPoint(-1);
  }, [data]);

  return null;
};

export default MassPoint;
