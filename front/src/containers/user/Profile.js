import React, { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';

import Profile from '../../components/Profile';

import UserRequests from '../../hooks/userCrud';
import useAuth from '../../hooks/useAuth';

function ProfileContainer() {
  const history = useHistory();
  const queryClient = useQueryClient();

  const {
    user: { id },
  } = useAuth();

  const { getUserByIdRequest, updateUserRequest, updateAvatarRequest } = UserRequests();

  const { data } = useQuery(['users', id], () => getUserByIdRequest(id), {
    enabled: Boolean(id),
  });

  const user = data?.data.user || { name: '', email: '', phone: '', university: '' };

  const { mutate: updateUser } = useMutation(updateUserRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      history.push('/profile');
    },
  });

  const { mutate: updateAvatar } = useMutation(updateAvatarRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      history.push('/profile');
    },
  });

  const onSubmitUpdateUser = useCallback(
    async (formData) => {
      try {
        await updateUser({ id, formData });
      } catch (e) {
        console.log(e);
      }
    },
    [updateUser, id]
  );

  const onSubmitUpdateAvatar = useCallback(
    async (file) => {
      try {
        await updateAvatar({ id, file });
      } catch (e) {
        console.log(e);
      }
    },
    [updateAvatar, id]
  );

  return (
    <Profile
      user={user}
      onSubmitUpdateUser={onSubmitUpdateUser}
      onSubmitUpdateAvatar={onSubmitUpdateAvatar}
    />
  );
}

export default ProfileContainer;
