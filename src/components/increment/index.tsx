import React from 'react';

export default (props: any) => {
  const { count, incrementAsync, increment } = props;

  return (
    <div>
      <h2>
        count is <b style={{ backgroundColor: '#cccccc' }}>{count}</b>
      </h2>
      <h2>
        <button onClick={increment.bind(null)}>Increment count</button>
      </h2>
      <h2>
        <button onClick={incrementAsync}>Async increment count (delayed 1 second)</button>
      </h2>
    </div>
  );
};
