/**
 * px转vw通用函数
 * @param {number} px 像素
 * @returns {string} 转换后的vw值
 */
export function px2vw(px: number) {
  return `${((px / 1920) * 100).toFixed(3)}vw`;
}
