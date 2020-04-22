/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲组名称组件
 * @Date: 2020-04-21 周二 15:07:10
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-21 周二 15:07:10
 */

import ItemLegend from '@/components/UI/itemLegend';
import styledBlocks from '@/styled';
import React from 'react';

interface IIntercomGroupProps {
  name: IIntercomGroupState['name']
}

const IntercomGroupName = (props: Partial<IIntercomGroupProps>) => {
  const {name} = props;

  return (
    <ItemLegend
      name={name!}
      icon={false}
      nameStyled={styledBlocks.centerTitle}
      styled={styledBlocks.justifyContent}
    />
  );
};

export default IntercomGroupName;
