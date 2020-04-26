/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 高德地图鼠标工具组件
 * @Date: 2020-04-26 周日 09:54:45
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-26 周日 09:54:45
 */

import config from '@/config';
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

/**
 * 行政区划边界组件
 * @param {IBoundaryProps} props
 * @returns {any}
 * @constructor
 */
const MouseTool = (props: Partial<IBoundaryProps>) => {
  const {map, mouseToolType, callback, setState} = props;

  useEffect(() => {
    // 检测地图是否实例化完成切且鼠标工具被激活
    if (map && mouseToolType) {
      AMap.plugin('AMap.MouseTool', () => {
        // 创建鼠标工具对象
        const mouseTool = new AMap.MouseTool(map);

        const draw = (type: IAMapState['mouseToolType']) => {
          mouseTool.circle(config.map.mouseTool);
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
            /**
             * 绘制完成后重置鼠标工具状态
             */
            setState!({
              mouseToolType: null,
              callback: undefined
            });
          }
        });

        draw(mouseToolType);
      });
    }
  }, [mouseToolType]);

  return null;
};

export default MouseTool;
