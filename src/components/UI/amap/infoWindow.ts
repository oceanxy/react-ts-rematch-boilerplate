/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 地图弹窗模版。高德地图API【AMap.InfoWindow(option)】option.content不支持jsx，支持string或HTMLElement。
 * @Date: 2020-05-06 周三 16:47:18
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-05-06 周三 16:47:18
 */

import { taskTypeColor, taskTypeStatus } from '@/models/home/taskModel/taskDetails';

/**
 * 获取任务列表
 * @param {ITask[]} tasks
 * @returns {string[]}
 */
function getTasks(tasks: ITask[]) {
  return tasks.map((task) => {
    return `<li>
        <span style="color: ${taskTypeColor[task.taskLevel]}"> </span>
        <span>${task.taskName}</span>
        <span>${taskTypeStatus[task.status]}</span>
      </li>`;
  });
}

/**
 * 获取监控对象类型对应的文本
 * @param {number} type
 * @returns {string}
 */
function getEntityType(type: number) {
  switch (type) {
    case 0:
      return '车';
    case 1:
      return '人';
    case 2:
      return '动态物品';
    case 9:
      return '静态物资';
    case 10:
      return '调度员';
    default:
      return '-';
  }

}

const infoWindowTemplate = (data: InfoWindowResponse) => {
  const {monitor, location, tasks, eventNames} = data;

  return `
      <div class="inter-plat-map-info-window-container">
        <div class="inter-plat-map-info-window-close"></div>
        <div class="inter-plat-map-info-window-content">
          <div class="info-window-item">
            <span class="key">时间</span>
            <span class="value">${location.gpsTime}</span>
          </div>
          <div class="info-window-item">
            <span class="key">事件</span>
            <span class="value">${eventNames}</span>
          </div>
          <div class="info-window-item">
            <span class="key">监控对象</span>
            <span class="value">${monitor.monitorName}</span>
          </div>
          <div class="info-window-item">
            <span class="key">类型</span>
            <span class="value">${getEntityType(+monitor.monitorType)}</span>
          </div>
          <div class="info-window-item">
            <span class="key">位置</span>
            <span class="value">${location.address}</span>
          </div>
          <div class="info-window-item icon-box">
            <input type="button" class="icon-comp" title="直接处理" />
            <input type="button" class="icon-comp" title="任务处理" disabled />
            <input type="button" class="icon-comp" title="事件过程" disabled />
          </div>
          <p class="task-tag">当前任务</p>
          <ul class="task-item">
            ${getTasks(tasks)}
          </ul>
        </div>
        <div class="inter-plat-map-info-window-content-sharp"></div>
      </d
    `;
};

export default infoWindowTemplate;
