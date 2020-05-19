/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 临时组组件
 * @Date: 2020-01-14 14:24:28
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-19 周二 10:17:01
 */

import Container from '@/components/UI/containerComp';
import Modal from '@/components/UI/modal';
import Trigger, { ETriggerType } from '@/components/UI/triggerComp';
import { CreateTemporaryGroup } from '@/containers/home/temporaryGroup';
import { CurActiveGroupType } from '@/models/home/intercom/group';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.scss';

interface ITemporaryGroupProps {
  data: ITemporaryGroupState['data']
  intercomGroupState: IIntercomGroupState
  fetchData: ITemporaryGroupModel['effects']['fetchData']
  setIntercomGroupState: IIntercomGroupModel['effects']['setState']
  unbindTemporaryGroup: ITemporaryGroupModel['effects']['unbindTemporaryGroup']
}

/**
 * 临时组组件
 */
const TemporaryGroup = (props: Partial<ITemporaryGroupProps>) => {
  const {
    data, fetchData, intercomGroupState,
    setIntercomGroupState, unbindTemporaryGroup
  } = props;
  const {id, curActiveGroupType, name} = intercomGroupState!;
  // 解除临时组绑定时，传递给询问对话框的状态
  const [tempGroup, setShowTempGroup] = useState({visible: false, current: null as ITemporaryGroup | null});
  // 解除绑定loading状态
  const [loading, setLoading] = useState(false);

  /**
   * 临时组对讲
   * @param {ITemporaryGroup} tempGroup
   */
  const onClick = (tempGroup: ITemporaryGroup) => {
    if (curActiveGroupType === CurActiveGroupType.Null) {
      setIntercomGroupState!({
        name: tempGroup.name,
        intercomId: tempGroup.intercomGroupId,
        id: tempGroup.id,
        curActiveGroupType: CurActiveGroupType.Temporary
      });
    } else if (curActiveGroupType === CurActiveGroupType.Task) {
      message.destroy();
      message.warning((
        <span>任务组（<span className="highlight"> {name} </span>）正在进行对讲，暂不能进行此操作！</span>
      ));
    } else if (curActiveGroupType === CurActiveGroupType.Temporary) {
      message.destroy();

      if (id !== tempGroup.id) {
        message.destroy();
        message.warning((
          <span>其他临时组（<span className="highlight"> {name} </span>）正在进行对讲，暂不能进行此操作！</span>
        ));
      } else {
        message.destroy();
        message.info((
          <span>当前临时组（<span className="highlight"> {name} </span>）已激活对讲功能，请勿重复操作！</span>
        ));
      }
    } else {
      message.destroy();
      message.warning((
        <span>监控对象（<span className="highlight"> {name} </span>）正在进行对讲，暂不能进行此操作！</span>
      ));
    }
  };

  /**
   * 解散临时组
   * @param {ITemporaryGroup} tempGroup
   * @returns {Promise<void>}
   */
  const unbindTempGroup = async (tempGroup: ITemporaryGroup) => {
    setLoading(true);
    const response = await unbindTemporaryGroup!(tempGroup.intercomGroupId);
    setLoading(false);

    message.destroy();
    if (Number(response.retCode) === 0) {
      message.success(`临时组（${tempGroup.name}）已解散。`);

      // 如果解散临时组时，该临时组的对讲面板处于激活状态，则清空该临时组的对讲面板的所有状态
      if (id === tempGroup.intercomGroupId) {
        setIntercomGroupState!({name: '', id: '', curActiveGroupType: CurActiveGroupType.Null});
      }
    } else {
      message.success(`未能解散临时组（${tempGroup.name}），请稍后再试。`);
    }

    setShowTempGroup({visible: false, current: null});
  };

  useEffect(() => {
    fetchData!();
  }, []);

  return (
    <Container className="inter-plat-temp-group-container" conTheme="style3">
      <CreateTemporaryGroup />
      <Container className="inter-plat-temp-group-item-container">
        {
          data?.length ? data.map((tempGroup, index) => {
            return (
              <Trigger
                key={`inter-plat-temp-group-item-${index}`}
                name={tempGroup.name}
                type={ETriggerType.CLOSE}
                active={tempGroup.intercomGroupId === id}
                triggerTitle="解散临时组"
                onClick={onClick.bind(null, tempGroup)}
                onTriggerClick={() => setShowTempGroup({visible: true, current: tempGroup})}
              />
            );
          }) : <div className="no-data-warn">暂无临时组数据</div>
        }
      </Container>
      <Modal
        visible={tempGroup.visible}
        confirmLoading={loading}
        onCancel={() => setShowTempGroup({visible: false, current: null})}
        onOk={unbindTempGroup.bind(null, tempGroup.current!)}
      >
        确定要解散该临时组吗？
      </Modal>
    </Container>
  );
};

export default TemporaryGroup;
