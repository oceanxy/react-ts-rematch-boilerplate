import LngLat = AMap.LngLat;
import { EntityType } from '@/models/UI/entity';

const headElement = document.body || document.getElementsByTagName('body')[0];
const _importedScript: {[src: string]: true} = {};

/**
 * load dependency by script tag
 * @param {string} src
 * @returns {Promise<void>}
 */
export function importScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (src in _importedScript) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.onerror = err => {
      headElement.removeChild(script);
      reject(new URIError(`The Script ${src} is no accessible.`));
    };

    script.onload = () => {
      _importedScript[src] = true;
      resolve();
    };

    headElement.appendChild(script);
    script.src = src;
  });
}

/**
 * px转vw通用函数
 * @param {number} px 像素
 * @returns {string} 转换后的vw值
 */
export function px2vw(px: number) {
  return `${((px / 1920) * 100).toFixed(3)}vw`;
}

/**
 * px转vh通用函数
 * @param {number} px 像素
 * @returns {string} 转换后的vh值
 */
export function px2vh(px: number) {
  return `${((px / 1080) * 100).toFixed(3)}vh`;
}

/**
 * 将高德地图返回的边界值转换成字符串的形式
 * 如果边界值数组有多个值，则用“-”分割
 * @param {AMap.LngLat[][] | undefined} bounds
 * @returns {string}
 */
export function boundsToString(bounds: LngLat[][] | undefined) {
  const boundsStr = [];

  if (bounds && bounds.length) {
    for (let bound of bounds) {
      boundsStr.push(bound?.toString() ?? null);
    }
  }

  return boundsStr.join('-');
}

/**
 * 获取监控对象类型对应的文本
 * @param {number} type
 * @returns {string}
 */
export function getEntityTypeText(type: number) {
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
