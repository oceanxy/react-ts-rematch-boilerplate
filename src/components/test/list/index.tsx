import React, { useEffect } from 'react';
import './index.scss';

const TestList = (props: any) => {
  const {data, getData} = props;

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div>数据列表测试：</div>
      {
        data &&
        data.child &&
        data.child.map((d: {value: number; name: string}, index: number) => {
          return (
            <div key={index} className="test">
              {d.name} {d.value}
            </div>
          );
        })
      }
    </div>
  );
};

export default TestList;
