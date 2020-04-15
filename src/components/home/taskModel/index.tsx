/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 任务
 * @Date: 2020-01-04 15:05:34
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-01-04 15:05:34
 */

import ItemLegend from '@/components/UI/itemLegend';
import Title from '@/components/UI/title';
import { TaskDetails, TaskList, TaskStatistics } from '@/containers/home/taskModel';
import { taskTypeColor, taskTypeText } from '@/models/home/taskModel/taskDetails';
import React from 'react';
import './index.scss';

const TaskModel = () => {
  return (
    <Title
      name="任务列表"
      titleExtraElement={
        <>
          <ItemLegend name={taskTypeText[1]} iconColor={taskTypeColor[1]} />
          <ItemLegend name={taskTypeText[2]} iconColor={taskTypeColor[2]} />
          <ItemLegend name={taskTypeText[3]} iconColor={taskTypeColor[3]} />
        </>
      }
    >
      <TaskDetails />
      <TaskStatistics />
      <TaskList />
    </Title>
  );
};

export default TaskModel;
