/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲成员组件
 * @Date: 2020-04-21 周二 15:45:40
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-21 周二 15:57:26
 */

import Container from '@/components/UI/containerComp';
import Icon, { IconSource } from '@/components/UI/iconComp';
import Member from '@/components/UI/member';
import Modal from '@/components/UI/modal';
import Trigger from '@/components/UI/triggerComp';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.scss';

interface IIntercomMembersProps {
  data: IIntercomMembersState['data']
  isActiveIntercom: IIntercomState['active']
  fetchData: IIntercomMembersModel['effects']['fetchData']
  removeMember: IIntercomMembersModel['effects']['removeMember']
  addMember: IIntercomMembersModel['effects']['addMember']
}

const IntercomMembers = (props: Partial<IIntercomMembersProps>) => {
  const {data, isActiveIntercom, fetchData, removeMember, addMember} = props;
  // 解除临时组绑定时，传递给询问对话框的状态
  const [member, setMember] = useState({
    visible: false,
    type: null as 'add' | 'remove' | null,
    current: null as IIntercomMember | null
  });
  // loading状态
  const [loading, setLoading] = useState(false);

  /**
   * 处理删除成员事件
   * @param {IIntercomMember} member
   */
  const handleRemove = (member: IIntercomMember) => {
    setMember({visible: true, type: 'remove', current: member});
  };

  /**
   * 处理新增成员事件
   */
  const handleAdd = () => {
    setMember({visible: true, type: 'add', current: null});
  };

  /**
   * 新增/剔除成员
   * @returns {Promise<void>}
   */
  const onChangeMember = async () => {
    if (member.type === 'remove') {
      setLoading(true);
      const response = await removeMember!();
      setLoading(false);

      message.destroy();
      if (response.retCode === 0) {
        message.success(`已成功剔除成员：（${member.current?.userName}）`);
      } else {
        message.success('剔除成员失败， 请稍后再试！');
      }
    } else if (member.type === 'add') {
      // TODO 调用高德地图框选范围API

      setLoading(true);
      const response = await addMember!();
      setLoading(false);

      message.destroy();
      if (response.retCode === 0) {
        message.success(`已成功剔除成员：（${member.current?.userName}）`);
      } else {
        message.success('剔除成员失败， 请稍后再试！');
      }
    }

    setMember({visible: false, type: null, current: null});
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
              online={member.audioOnlineStatus}
              onClick={handleRemove.bind(null, member)}
            />
          );
        }) ?? null
      }
      <Icon icon={IconSource.ADD} title="新增成员" onClick={handleAdd} />
      <Modal
        width={member.type === 'add' ? 200 : 300}
        footer={member.type === 'add' ? null : undefined}
        visible={member.visible}
        confirmLoading={loading}
        onCancel={() => setMember({visible: false, type: null, current: null})}
        onOk={onChangeMember}
      >
        {
          member.type === 'remove' ?
            <>确定从临时组中剔除成员（{member.current?.userName}）吗？</>
            : (
              <>
                <Trigger
                  name="圆形"
                  className="hover inter-plat-temp-group-create-modal-item"
                  width="100%"
                  // onClick={createTempGroup.bind(null, tempGroup.current!)}
                />
                <Trigger
                  name="矩形"
                  className="hover inter-plat-temp-group-create-modal-item"
                  width="100%"
                  // onClick={createTempGroup.bind(null, tempGroup.current!)}
                />
              </>
            )
        }

      </Modal>
    </Container>
  );
};

export default IntercomMembers;
