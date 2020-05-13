/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 高德地图鼠标工具组件
 * @Date: 2020-04-26 周日 09:54:45
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-13 周三 11:37:56
 */

import config from '@/config';
import { MouseToolType } from '@/models/UI/amap';
import { message } from 'antd';
import React, { useEffect } from 'react';

/**
 * 位置搜索接口
 */
export interface IBoundaryProps {
  map: IAMapState['mapInstance']
  callback: IAMapState['callback']
  mouseToolType: IAMapState['mouseToolType']
  setState: IAMapModel['effects']['setState']
}

// 鼠标工具
let mouseTool: any;

/**
 * 行政区划边界组件
 * @param {IBoundaryProps} props
 * @returns {any}
 * @constructor
 */
const MouseTool = (props: Partial<IBoundaryProps>) => {
  const {map, mouseToolType, callback, setState} = props;

  if (!mouseTool && map) {
    AMap.plugin('AMap.MouseTool', () => {
      mouseTool = new AMap.MouseTool(map);
    });
  }

  useEffect(() => {
    // 检测地图是否实例化完成且鼠标工具被激活
    if (map && mouseTool && (mouseToolType != MouseToolType.Null)) {
      /**
       * 启用鼠标工具绘制
       * @param {MouseToolType} type
       */
      const draw = (type: MouseToolType) => {
        message.config({top: 100});
        message.info('请在地图上绘制区域。', 0);
        if (type === MouseToolType.Circle) {
          mouseTool.circle(config.map.mouseTool);
        }
      };

      // 监听draw事件可获取画好的覆盖物
      const overlays = [];
      /**
       * 鼠标工具绘制覆盖物结束时触发此事件，obj对象为绘制出来的覆盖物对象。
       */
      mouseTool.on('draw', ({type, obj}: any) => {
        overlays.push(obj);

        if (overlays.length > 0) {
          /**
           * 处理绘制覆盖物后的回调事件
           */
          callback && callback!(type, obj);
          /**
           * 结束绘制
           */
          mouseTool.close(true);
          message.destroy();
          /**
           * 绘制完成后重置鼠标工具状态
           */
          setState!({
            mouseToolType: MouseToolType.Null,
            callback: undefined
          });
        }
      });

      draw(mouseToolType!);
    }
  }, [mouseToolType]);

  return null;
};

export default MouseTool;
