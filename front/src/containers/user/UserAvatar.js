import React from 'react';
import { useQuery } from 'react-query';

import UserAvatar from '../../components/UserAvatar';
import { getUserById } from './hooks/crud';

function UserAvatarContainer() {
  const id = 28;

  const { data } = useQuery(['users', id], () => getUserById(id), {
    enabled: Boolean(id),
  });

  const user = data?.data.data.user || { id: '', name: '' };

  return <UserAvatar user={user} />;
}

export default UserAvatarContainer;
