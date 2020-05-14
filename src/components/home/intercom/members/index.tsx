/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲成员组件
 * @Date: 2020-04-21 周二 15:45:40
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-14 周四 17:09:19
 */

import Container from '@/components/UI/containerComp';
import Icon, { IconSource } from '@/components/UI/iconComp';
import Member from '@/components/UI/member';
import Modal from '@/components/UI/modal';
import { TemporaryGroupCreationWay } from '@/containers/home/temporaryGroup';
import { CurActiveGroupType } from '@/models/home/intercom/group';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.scss';

interface IIntercomMembersProps {
  curTempGroupState: IIntercomGroupState
  state: IIntercomMembersState
  dispatches: IIntercomMembersModel['effects']
  isActiveIntercom: IIntercomState['active']
}

const IntercomMembers = (props: Partial<IIntercomMembersProps>) => {
  const {state, isActiveIntercom, dispatches, curTempGroupState} = props;
  const {data, loading} = state!;
  const {fetchData, setState, removeMember} = dispatches!;
  const {curActiveGroupType} = curTempGroupState!;

  // 触发新增/删除成员时，传递给询问对话框的状态
  const [member, setMember] = useState({
    visible: false,
    type: undefined as 'add' | 'remove' | undefined,
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

    setMember({visible: false, type: undefined, current: null});
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
              name={member.userName}
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
        onCancel={() => setMember({visible: false, type: undefined, current: null})}
        onOk={onRemoveMember}
      >
        确定从{curActiveGroupType === CurActiveGroupType.Task ? '任务' : '临时'}组中删除成员（{member.current?.userName}）吗？
      </Modal>
      <TemporaryGroupCreationWay
        visible={member.visible && member.type === 'add'}
        setState={setMember}
        title="添加临时组成员"
      />
    </Container>
  );
};

export default IntercomMembers;
