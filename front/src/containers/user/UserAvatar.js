import React from 'react';
import { useQuery } from 'react-query';

import UserAvatar from '../../components/UserAvatar/UserAvatar';

import useUserCrud from '../../hooks/useUserCrud';
import useAuth from '../../hooks/useAuth';

function UserAvatarContainer() {
  const {
    user: { id },
    logout,
  } = useAuth();

  const { getUserByIdRequest } = useUserCrud();

  const { data } = useQuery(['users', id], () => getUserByIdRequest(id), {
    enabled: Boolean(id),
  });

  const user = data?.data.user || { id: '', name: '' };

  return <UserAvatar user={user} logout={logout} />;
}

export default UserAvatarContainer;
