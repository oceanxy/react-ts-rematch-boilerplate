/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 地图弹窗模版。高德地图API【AMap.InfoWindow(option)】option.content不支持jsx，支持string或HTMLElement。
 * @Date: 2020-05-06 周三 16:47:18
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-18 周一 10:47:42
 */

import { taskTypeColor, taskTypeStatus } from '@/models/home/taskModel/taskDetails';
import { EntityType } from '@/models/UI/entity';
import { getEntityTypeText } from '@/utils/helper';

/**
 * 获取任务HTML element
 * @param {ITask[]} tasks
 * @returns {string}
 */
function getTasks(tasks: ITask[]) {
  const taskList = generatorTaskItems(tasks);

  if (tasks?.length) {
    return `
      <p class="task-tag">当前任务</p>
      <ul class="task-item">${taskList}</ul>
    `;
  }

  return '<p class="task-tag">当前暂无任务</p>';
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
 * 设置窗体字段
 * @param {InfoWindowResponse} data
 * @param {boolean} happenEvent 是否存在上报事件
 * @returns {string}
 */
function setWindowFields(data: InfoWindowResponse, happenEvent: boolean) {
  const {eventNames, monitor, location} = data;
  let str: string = '';

  // 监控对象类型不为静态物资时
  if (data.monitor?.monitorType !== EntityType.Supplies) {
    str += `
    <div class="info-window-item" title="监控对象最近一次上报的定位时间">
      <span class="key">时间</span>
      <span class="value">${location?.gpsTime}</span>
    </div>
  `;

    // 是否有事件上报
    if (happenEvent) {
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
        <span class="value">${monitor?.curAssignmentName}</span>
      </div>
    `;
    }
  }

  return str;
}

/**
 * 设置窗体按钮
 * @param {InfoWindowResponse} data
 * @param {ITask[]} tasks
 * @param {boolean} onlineStatus
 * @param {boolean} happenEvent
 * @returns {string}
 */
function setWindowButton(data: InfoWindowResponse, tasks: ITask[], onlineStatus: boolean, happenEvent: boolean) {
  let str = '';

  // 静态物资没有以下功能
  if (+data.monitor?.monitorType !== EntityType.Supplies) {
    let btn = '';

    // 是否在线
    if (onlineStatus) {
      btn += '<input type="button" class="icon-comp intercom-call" title="打开对讲" />';
    }

    // 是否有事件发生
    if (happenEvent) {
      btn += '<input type="button" class="icon-comp handle-event" title="直接处理" />';
    }

    if (btn) {
      str = `<div class="info-window-item icon-box">${btn}</div>`;
    }

    str += happenEvent ? getTasks(tasks) : '';
  }

  return str;
}

/**
 * 海量点弹窗模版
 * @param {InfoWindowResponse} data
 * @returns {string}
 */
const massPointInfoWindow = (data: InfoWindowResponse) => {
  const {monitor, location, tasks, eventList} = data;
  const happenEvent = !!eventList?.length;

  return `
    ${setWindowFields(data, happenEvent)}
    <div class="info-window-item" title="上报事件的监控对象名称">
      <span class="key">监控对象</span>
      <span class="value">${monitor?.monitorName}</span>
    </div>
    <div class="info-window-item" title="监控对象的类型">
      <span class="key">类型</span>
      <span class="value">${getEntityTypeText(+monitor?.monitorType!)}</span>
    </div>
    <div class="info-window-item" title="监控对象最近一次上报的位置描述">
      <span class="key">位置</span>
      <span class="value">${location?.address}</span>
    </div>
    ${setWindowButton(data, tasks, !!monitor?.onlineStatus, happenEvent)}
  `;
};

/**
 * 围栏弹窗模版
 * @param {IFenceDetailsResponse} data
 * @returns {string}
 */
const fenceInfoWindow = (data: IFenceDetailsResponse) => {
  const {fenceDetails} = data;
  const {fenceName, locationData} = fenceDetails;

  return `
    <div class="info-window-item" title="监控对象最近一次上报的定位时间">
      <span class="key">名称</span>
      <span class="value">${fenceName}</span>
    </div>
    <div class="info-window-item" title="事件名称">
      <span class="key">位置</span>
      <span class="value">${locationData.position || '-'}</span>
    </div>
  `;
};

/**
 * 地图弹窗模版
 * @param {InfoWindowResponse} data 弹窗数据
 * @returns {string}
 */
const infoWindowTemplate = (data?: InfoWindowResponse | IFenceDetailsResponse) => {
  let template = `
    <div class="inter-plat-map-info-window-container">
      <div class="inter-plat-map-info-window-close"></div>
      <div class="inter-plat-map-info-window-content">
  `;

  if (data) {
    const {fenceDetails}: IFenceDetailsResponse = data as IFenceDetailsResponse;
    if (fenceDetails) {
      template += fenceInfoWindow(data as IFenceDetailsResponse);
    } else {
      template += massPointInfoWindow(data as InfoWindowResponse);
    }
  }

  return template += `
    </div>
    <div class="inter-plat-map-info-window-content-sharp"></div>
  </div>`;
};

export default infoWindowTemplate;
