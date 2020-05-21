/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 资源统计
 * @Date: 2020-01-04 15:03:43
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-03 周五 11:22:13
 */

import Container from '@/components/UI/containerComp';
import Title from '@/components/UI/title';
import { Regions, SuddenEvents } from '@/containers/home/resourceStatistics';
import styledBlocks from '@/styled';
import React from 'react';
import './index.scss';

const ResourceStatistics = () => {
  return (
    <Title name="资源统计" styled={styledBlocks.flexNone} className='no-hidden'>
      <Container conTheme="style1" style={{ marginTop: 10 }} className="resource-statistics-container">
        <SuddenEvents />
        <Regions />
      </Container>
    </Title>
  );
};

export default ResourceStatistics;
