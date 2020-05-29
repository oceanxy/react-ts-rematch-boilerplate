/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 临时组/任务组对讲成员组件
 * @Date: 2020-04-21 周二 15:45:40
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-28 周四 13:54:27
 */

import Container from '@/components/UI/containerComp';
import Icon, { IconSource } from '@/components/UI/iconComp';
import Member from '@/components/UI/member';
import Modal from '@/components/UI/modal';
import { TemporaryGroupCreationWay } from '@/containers/home/temporaryGroup';
import { CurActiveGroupType } from '@/models/home/intercom/groupName';
import { message, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.scss';

interface IIntercomMembersProps {
  curTempGroupState: IIntercomGroupNameState
  state: IIntercomMembersState
  timing: IIntercomOperationState['timing']
  dispatches: IIntercomMembersModel['effects']
  isActiveIntercom: IIntercomState['active']
  setTemporaryGroupState: ITemporaryGroupModel['effects']['setState']
}

const IntercomMembers = (props: Partial<IIntercomMembersProps>) => {
  const {state, isActiveIntercom, dispatches, curTempGroupState, setTemporaryGroupState, timing} = props;
  const {data, loading} = state!;
  const {fetchData, setState, removeMember} = dispatches!;
  const {curActiveGroupType, name} = curTempGroupState!;

  // 触发新增/删除成员时，传递给询问对话框的状态
  const [member, setMember] = useState({
    visible: false,
    type: undefined,
    current: undefined
  } as {visible: boolean, type?: 'add' | 'remove', current?: IEntity});

  /**
   * 处理删除成员事件
   * @param {IEntity} member
   */
  const handleRemoveMember = (member: IEntity) => {
    // 只有临时组能踢人
    if (curTempGroupState?.curActiveGroupType === CurActiveGroupType.Temporary && !timing) {
      setMember({visible: true, type: 'remove', current: member});
    }
  };

  /**
   * 处理新增成员事件
   */
  const handleAddMembers = () => {
    setMember({visible: true, type: 'add', current: undefined});
    // 设置编辑临时组回填信息。编辑临时组时回填到临时组名称字段
    setTemporaryGroupState!({backFillInfo: {name}, title: '添加临时组成员'});
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
    if (+response.retCode === 0) {
      message.success(`已成功删除成员：（${member.current?.monitorName}）`);
    } else {
      message.success('删除成员失败， 请稍后再试！');
    }

    setMember({visible: false, type: undefined, current: undefined});
  };

  useEffect(() => {
    if (isActiveIntercom) {
      fetchData!();
    }
  }, [isActiveIntercom]);

  return (
    <Container className="inter-plat-intercom-member">
      <Spin delay={100} spinning={loading}>
        {
          data?.map((member, index) => {
            return (
              <Member
                key={`inter-plat-intercom-member-${index}`}
                title={member.monitorName}
                name={member.monitorName}
                online={member.onlineStatus}
                onClick={handleRemoveMember.bind(null, member)}
              />
            );
          })
        }
        {
          // 只有临时组能加人
          !loading ?
            curTempGroupState?.curActiveGroupType === CurActiveGroupType.Temporary ?
              <Icon icon={IconSource.ADD} title="新增成员" onClick={handleAddMembers} disabled={timing} /> :
              !data?.length ?
                <div className="no-data-warn">暂无成员</div> :
                null :
            null
        }
      </Spin>
      <Modal
        width={350}
        visible={member.visible && member.type === 'remove'}
        confirmLoading={loading}
        onCancel={() => setMember({visible: false, type: undefined, current: undefined})}
        onOk={onRemoveMember}
      >
        确定从{curActiveGroupType === CurActiveGroupType.Task ? '任务' : '临时'}组中删除成员（{member.current?.monitorName}）吗？
      </Modal>
      <TemporaryGroupCreationWay
        visible={member.visible && member.type === 'add'}
        setState={setMember}
      />
    </Container>
  );
};

export default IntercomMembers;
