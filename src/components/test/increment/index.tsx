import React from 'react';
import './index.scss';

export default (props: any) => {
  const { count, incrementAsync, increment } = props;

  return (
    <div>
      <h2>
        当前数字：<b className="count">{count}</b>
      </h2>
      <h2>
        <button onClick={increment.bind(null)}>自增1</button>
        <button onClick={incrementAsync}>异步自增1（1秒延迟）</button>
      </h2>
    </div>
  );
};
