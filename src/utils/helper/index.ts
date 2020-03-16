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
