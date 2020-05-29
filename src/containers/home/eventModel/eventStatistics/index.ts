/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 事件/任务统计
 * @Date: 2019-12-28 15:03:33
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-29 周五 11:05:19
 */

import EventStatistics from '@/components/home/eventModel/eventStatistics';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({ ...state.eventStatistics });

const mapDispatchToProps = (dispatch: Dispatch): any => ({
  fetchData: dispatch.eventList.fetchData,
  setState: dispatch.eventStatistics.setState
});

export default connect(mapStateToProps, mapDispatchToProps)(EventStatistics);
