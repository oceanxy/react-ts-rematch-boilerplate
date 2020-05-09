/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 地图弹窗模版。高德地图API【AMap.InfoWindow(option)】option.content不支持jsx，支持string或HTMLElement。
 * @Date: 2020-05-06 周三 16:47:18
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-05-06 周三 16:47:18
 */

import { taskTypeColor, taskTypeStatus } from '@/models/home/taskModel/taskDetails';
import { EntityType } from '@/models/UI/entity';

/**
 * 获取任务HTML element
 * @param {ITask[]} tasks
 * @returns {string}
 */
function getTasks(tasks: ITask[]) {
  return `
    <p class="task-tag">当前任务</p>
    <ul class="task-item">
      ${generatorTaskItems(tasks)}
    </ul>
  `;
}

/**
 * 生成任务项HTML element
 * @param {ITask[]} tasks
 * @returns {string}
 */
function generatorTaskItems(tasks: ITask[]) {
  return tasks.reduce((liStr, task) => {
    return liStr + `<li>
      <span style="color: ${taskTypeColor[task.taskLevel]}"> </span>
      <span>${task.taskName}</span>
      <span>${taskTypeStatus[task.status]}</span>
    </li>`;
  }, '');
}

/**
 * 获取监控对象类型对应的文本
 * @param {number} type
 * @returns {string}
 */
function getEntityType(type: number) {
  switch (type) {
    case EntityType.Car:
      return '车';
    case EntityType.People:
      return '人';
    case EntityType.Thing:
      return '动态物品';
    case EntityType.Supplies:
      return '静态物资';
    case EntityType.Dispatcher:
      return '调度员';
    default:
      return '-';
  }
}

/**
 * 设置窗体字段
 * @param {InfoWindowResponse} data
 * @param {MassPoint} massPointData
 * @returns {string}
 */
function setWindowFields(data: InfoWindowResponse, massPointData: MassPoint) {
  const {eventNames, monitor, location} = data;
  let str: string = '';

  // 监控对象类型不为静态物资时
  if (massPointData.monitorType !== EntityType.Supplies) {
    str += `
    <div class="info-window-item" title="监控对象最近一次上报的定位时间">
      <span class="key">时间</span>
      <span class="value">${location.gpsTime}</span>
    </div>
    <div class="info-window-item" title="事件名称">
      <span class="key">事件名称</span>
      <span class="value">${eventNames}</span>
    </div>
  `;

    // 是否有事件上报
    if (massPointData.happenEvent) {
      str += `
      <div class="info-window-item" title="事件名称">
        <span class="key">事件名称</span>
        <span class="value">${eventNames}</span>
      </div>
    `;
    } else {
      str += `
      <div class="info-window-item" title="当前组">
        <span class="key">当前组</span>
        <span class="value">${monitor.curAssignmentName}</span>
      </div>
    `;
    }
  }

  return str;
}

/**
 * 设置窗体按钮
 * @param {MassPoint} massPointData
 * @param {ITask[]} tasks
 * @returns {string}
 */
function setWindowButton(massPointData: MassPoint, tasks: ITask[]) {
  let str = '';

  if (massPointData.monitorType !== EntityType.Supplies) {
    str += '<div class="info-window-item icon-box">';
    str += '<input type="button" class="icon-comp intercom-call" title="打开对讲" />';

    if (massPointData.happenEvent) {
      str += '<input type="button" class="icon-comp handle-event" title="直接处理" />';
    }

    str += '</div>';
    str += massPointData.happenEvent ? getTasks(tasks) : '';
  }

  return str;
}

/**
 * 地图弹窗模版
 * @param {InfoWindowResponse} data
 * @param {MassPoint} massPointData
 * @returns {string}
 */
const infoWindowTemplate = (data: InfoWindowResponse, massPointData: MassPoint) => {
  if (!data || !massPointData) {
    return '';
  }

  const {monitor, location, tasks} = data;

  return `
    <div class="inter-plat-map-info-window-container">
      <div class="inter-plat-map-info-window-close"></div>
      <div class="inter-plat-map-info-window-content">
        ${setWindowFields(data, massPointData)}
        <div class="info-window-item" title="上报事件的监控对象名称">
          <span class="key">监控对象</span>
          <span class="value">${monitor.monitorName}</span>
        </div>
        <div class="info-window-item" title="监控对象的类型">
          <span class="key">类型</span>
          <span class="value">${getEntityType(+massPointData.monitorType!)}</span>
        </div>
        <div class="info-window-item" title="监控对象最近一次上报的位置描述">
          <span class="key">位置</span>
          <span class="value">${location.address}</span>
        </div>
        ${setWindowButton(massPointData, tasks)}
      </div>
      <div class="inter-plat-map-info-window-content-sharp"></div>
    </d
  `;
};

export default infoWindowTemplate;
