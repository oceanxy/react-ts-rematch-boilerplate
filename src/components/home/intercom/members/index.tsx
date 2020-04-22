/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 对讲成员组件
 * @Date: 2020-04-21 周二 15:45:40
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-21 周二 15:57:26
 */

import Container from '@/components/UI/containerComp';
import Member from '@/components/UI/member';
import React, { useEffect } from 'react';
import './index.scss';

interface IIntercomMembersProps {
  data: IIntercomMembersState['data']
  isActiveIntercom: IIntercomState['active']
  fetchData: IIntercomMembersModel['effects']['fetchData']
}

const IntercomMembers = (props: Partial<IIntercomMembersProps>) => {
  const {data, isActiveIntercom, fetchData} = props;

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
            />
          );
        }) ?? null
      }
    </Container>
  );
};

export default IntercomMembers;
