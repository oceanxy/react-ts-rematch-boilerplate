/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 实体对讲成员组件
 * @Date: 2020-05-09 周六 11:55:01
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-09 周六 16:16:50
 */

import Container from '@/components/UI/containerComp';
import Member from '@/components/UI/member';
import { getEntityTypeText } from '@/utils/helper';
import React, { useState } from 'react';
import './index.scss';

interface IIntercomEntityCallProps {
  curMassPoint: IAMapState['curMassPoint']
}

const IntercomEntityCall = (props: Partial<IIntercomEntityCallProps>) => {
  const {curMassPoint} = props;
  // 拷贝当前弹窗的海量点对象。
  // 因为curMassPoint是IAMapModel内的状态，受到地图海量点弹窗关闭/打开状态的影响。
  // 避免因监控对面面板处于打开状态时关闭了海量点弹框，从而导致当前弹窗的海量点对象（curMassPoint）被清空，进而影响到本组件的状态。
  // 本组件通过在初次渲染时拷贝curMassPoint对象，实现临时的数据缓存。
  // 当监控对象面板关闭后，该临时数据缓存自然就不存在了，不影响下一次打开监控对象面板时的渲染。
  const [tempCurMassPoint] = useState({...curMassPoint} as IAMapState['curMassPoint']);

  return (
    <Container className="inter-plat-intercom-entity-call">
      <Member
        name={`(${getEntityTypeText(tempCurMassPoint?.monitor.monitorType!)})`}
        online={tempCurMassPoint?.monitor.onlineStatus}
      />
    </Container>
  );
};

export default IntercomEntityCall;
