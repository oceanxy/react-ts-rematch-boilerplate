/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 创建临时组
 * @Date: 2020-04-25 周六 15:26:39
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-14 周四 17:17:59
 */

import CreateTemporaryGroup from '@/components/home/temporaryGroup/create';
import { Dispatch, RootState } from '@/store';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: Dispatch): any => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTemporaryGroup);