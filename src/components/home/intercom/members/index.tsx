/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲成员组件
 * @Date: 2020-04-21 周二 15:45:40
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-13 周三 13:48:22
 */

import Container from '@/components/UI/containerComp';
import Icon, { IconSource } from '@/components/UI/iconComp';
import Member from '@/components/UI/member';
import Modal from '@/components/UI/modal';
import Trigger from '@/components/UI/triggerComp';
import { CurActiveGroupType } from '@/models/home/intercom/group';
import { MouseToolType } from '@/models/UI/amap';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.scss';

interface IIntercomMembersProps {
  curTempGroupState: IIntercomGroupState
  state: IIntercomMembersState
  dispatches: IIntercomMembersModel['effects']
  isActiveIntercom: IIntercomState['active']
  setAMapState: IAMapModel['effects']['setState']
  setTempGroupState: ITemporaryGroupModel['effects']['setState']
  setEntityState: IEntityModel['effects']['setState']
}

const IntercomMembers = (props: Partial<IIntercomMembersProps>) => {
  const {
    state, isActiveIntercom, dispatches, setEntityState,
    setAMapState, setTempGroupState, curTempGroupState
  } = props;
  const {data, loading} = state!;
  const {fetchData, setState, removeMember} = dispatches!;
  const {name, curActiveGroupType} = curTempGroupState!;
  // 触发新增/删除成员时，传递给询问对话框的状态
  const [member, setMember] = useState({
    visible: false,
    type: null as 'add' | 'remove' | null,
    current: null as IEntity | null
  });

  /**
   * 处理删除成员事件
   * @param {IEntity} member
   */
  const handleRemoveMember = (member: IEntity) => {
    // 只有临时组能踢人
    if (curTempGroupState?.curActiveGroupType === CurActiveGroupType.Temporary) {
      setMember({visible: true, type: 'remove', current: member});
    }
  };

  /**
   * 处理新增成员事件
   */
  const handleAddMembers = () => {
    setMember({visible: true, type: 'add', current: null});
  };

  /**
   * 激活高德地图鼠标工具
   */
  const loadAMapMouseTool = (byCondition: IEntityState['byCondition']) => {
    // 初始化本组件所有状态
    setMember({visible: false, type: null, current: null});
    // 设置实体model的状态
    setEntityState!({byCondition});
    // 设置地图鼠标工具组件状态，进行地图圈选
    setAMapState!({
      mouseToolType: MouseToolType.Circle,
      callback: handleCircleMouseTool
    });
  };

  /**
   * 处理地图鼠标事件绘制覆盖物后的回调事件
   * @param type
   * @param {AMap.Overlay} overlay 绘制的覆盖物对象
   * @returns {Promise<void>}
   */
  const handleCircleMouseTool = async (type: any, overlay: AMap.Circle | any) => {
    // 圈选地图范围后，获取高德地图鼠标工具返回的信息
    const radius = overlay.getRadius();
    const center = overlay.getCenter();
    const backFillInfo: ITemporaryGroupState['backFillInfo'] = {radius, center, name};

    // 设置编辑临时组对话框组件状态
    setTempGroupState!({isShowEditModal: true, title: '添加临时组成员', backFillInfo});
  };

  /**
   * 删除成员
   * @returns {Promise<void>}
   */
  const onRemoveMember = async () => {
    setState({loading: true});
    const response = await removeMember!(member.current!);
    setState({loading: false});

    message.destroy();
    if (response.retCode === 0) {
      message.success(`已成功删除成员：（${member.current?.userName}）`);
    } else {
      message.success('删除成员失败， 请稍后再试！');
    }

    setMember({visible: false, type: null, current: null});
  };

  /**
   * 处理固定对象选择事件
   * @returns {Promise<void>}
   */
  const handleFixedEntity = async () => {
    setMember({visible: false, type: null, current: null});
    setTempGroupState!({isShowEditModal: true, title: '添加临时组成员', backFillInfo: {name}});
  };

  useEffect(() => {
    if (isActiveIntercom) {
      fetchData!();
    }
  }, [isActiveIntercom]);

  return (
    <Container className="inter-plat-intercom-member">
      {
        data?.map((member, index) => {
          return (
            <Member
              key={`inter-plat-intercom-member-${index}`}
              title={member.userName}
              name={member.userName!}
              online={member.onlineStatus}
              onClick={handleRemoveMember.bind(null, member)}
            />
          );
        }) ?? null
      }
      {
        // 只有临时组能加人
        curTempGroupState?.curActiveGroupType === CurActiveGroupType.Temporary ? (
          <Icon icon={IconSource.ADD} title="新增成员" onClick={handleAddMembers} />
        ) : null
      }
      <Modal
        width={350}
        visible={member.visible && member.type === 'remove'}
        confirmLoading={loading}
        onCancel={() => setMember({visible: false, type: null, current: null})}
        onOk={onRemoveMember}
      >
        确定从{curActiveGroupType === CurActiveGroupType.Task ? '任务' : '临时'}组中删除成员（{member.current?.userName}）吗？
      </Modal>
      <Modal
        title="选择添加临时组成员方式"
        width={300}
        footer={null}
        visible={member.visible && member.type === 'add'}
        onCancel={() => setMember({visible: false, type: null, current: null})}
      >
        <Trigger
          name="地图圆形圈选"
          className="hover inter-plat-temp-group-create-modal-item"
          width="100%"
          onClick={() => loadAMapMouseTool(false)}
        />
        <Trigger
          name="固定对象选择"
          className="hover inter-plat-temp-group-create-modal-item"
          width="100%"
          onClick={handleFixedEntity}
        />
        <Trigger
          name="固定条件选择"
          className="hover inter-plat-temp-group-create-modal-item"
          width="100%"
          onClick={() => loadAMapMouseTool(true)}
        />
      </Modal>
    </Container>
  );
};

export default IntercomMembers;
