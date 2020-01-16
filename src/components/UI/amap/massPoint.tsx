/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 海量点组件
 * @Date: 2020-01-14 17:50:59
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-01-14 17:50:59
 */

import React from 'react';
import './index.scss';

/**
 * 导航菜单组件
 */
const MassPoint = (props: any) => {
  const map = props.__map__;
  console.log(map.MassMarks);

  const styleObject = new map.StyleObject({
    url: '//vdata.amap.com/icons/b18/1/2.png', // 图标地址
    size: [11, 11], // 图标大小
    anchor: [5, 5] // 图标显示位置偏移量，基准点为图标左上角
  });

  const massMarks = new map.MassMarks({
    zIndex: 5, // 海量点图层叠加的顺序
    zooms: [3, 19], // 在指定地图缩放级别范围内展示海量点图层
    style: styleObject // 设置样式对象
  });

  const data = [
    {
      lnglat: [116.405285, 39.904989], //点标记位置
      name: 'beijing',
      id: 1
    } // {}, …,{}, …
  ];

  massMarks.setData(data);

  // 将海量点添加至地图实例
  massMarks.setMap(map);

  return <div></div>;
};

export default MassPoint;
