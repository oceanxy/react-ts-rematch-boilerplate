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
