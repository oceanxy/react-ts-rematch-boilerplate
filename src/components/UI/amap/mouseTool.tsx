/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 高德地图鼠标工具组件
 * @Date: 2020-04-26 周日 09:54:45
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-18 周一 10:14:09
 */

import config from '@/config';
import { MouseToolType } from '@/models/UI/amap';
import { message } from 'antd';
import React, { useEffect } from 'react';
import Circle = AMap.Circle;

/**
 * 位置搜索接口
 */
export interface IBoundaryProps {
  map: IAMapState['mapInstance']
  mouseToolType: IAMapState['mouseToolType']
  setState: IAMapModel['effects']['setState']
  overlay: IAMapState['overlay']
  setTempGroupState: ITemporaryGroupModel['effects']['setState']
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
  const {map, mouseToolType, setState, setTempGroupState, overlay} = props;

  if (!mouseTool && map) {
    AMap.plugin('AMap.MouseTool', () => {
      mouseTool = new AMap.MouseTool(map);
    });
  }

  /**
   * 启动高德地图鼠标工具绘制模式
   * @param {any} type
   * @param {any} obj 绘制出来的覆盖物对象。
   */
  const drawOverlay = ({obj}: any) => {
    // 绘制完成后更新覆盖物状态
    setState!({overlay: obj});
    // 结束绘制
    mouseTool.close(true);
    message.destroy();
  };

  useEffect(() => {
    setState!({overlay: undefined});

    // 检测地图是否实例化完成且鼠标工具被激活
    if (map && mouseTool && (mouseToolType != MouseToolType.Null)) {
      // 鼠标工具绘制覆盖物结束时触发此事件
      mouseTool.on('draw', drawOverlay);

      message.config({top: 100});
      message.info('请在地图上绘制区域。', 0);

      if (mouseToolType === MouseToolType.Circle) {
        mouseTool.circle(config.map.mouseTool);
      } else if (mouseToolType === MouseToolType.Rectangle) {
        mouseTool.rectangle(config.map.mouseTool);
      }
    }

    return () => mouseTool && mouseTool.off('draw', drawOverlay);
  }, [mouseToolType]);

  useEffect(() => {
    if (overlay) {
      let backFillInfo: any;

      if (mouseToolType === MouseToolType.Circle) {
        const radius = (overlay as Circle).getRadius();
        const center = (overlay as Circle).getCenter();
        backFillInfo = {radius, center};
      } else if (mouseToolType === MouseToolType.Rectangle) {
        const northWest = overlay.getBounds()?.getNorthWest() ?? [];
        const southEast = overlay.getBounds()?.getSouthEast() ?? [];
        backFillInfo = {northWest, southEast};
      }

      setTempGroupState!({isShowEditModal: true, backFillInfo});
    }
  }, [overlay]);

  return null;
};

export default MouseTool;
