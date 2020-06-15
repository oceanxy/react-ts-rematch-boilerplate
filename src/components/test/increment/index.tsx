import React from 'react';
import './index.scss';

export default (props: any) => {
  const {count, incrementAsync, increment} = props;

  return (
    <div>
      <span className='test-title'>同步/异步事件测试</span>
      <div className="count">{count}</div>
      <p>
        <button onClick={increment.bind(null)}>自增1</button>
        <button onClick={incrementAsync}>异步自增1（1秒延迟）</button>
      </p>
    </div>
  );
};
