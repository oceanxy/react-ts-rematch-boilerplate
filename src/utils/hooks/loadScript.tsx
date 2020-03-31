import { importScript } from '@/utils/helper';
import React, { ComponentType, lazy, Suspense } from 'react';

/**
 * 异步加载script标签
 * @param {string} src 异步资源地址
 * @param {()=>Promise} factory 需要使用异步资源的组件
 * @param {React.ComponentType} Fallback
 * @returns {(props: any) => any}
 */
export function useScript<T extends ComponentType<any>>(
  src: string,
  factory: () => Promise<{default: T}>,
  Fallback?: React.ComponentType
) {
  const Comp = lazy(() => importScript(src).then(factory));

  return (props: any) => (
    <Suspense fallback={Fallback ? <Fallback /> : null}>
      <Comp {...props} />
    </Suspense>
  );
}
