import React, { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import Profile from '../../components/Profile';

import useUserCrud from '../../hooks/useUserCrud';
import useAuth from '../../hooks/useAuth';

function ProfileContainer() {
  const queryClient = useQueryClient();

  const { user } = useAuth();

  const { updateUserRequest, updateAvatarRequest } = useUserCrud();

  const { mutate: updateUser } = useMutation(updateUserRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });

  const { mutate: updateAvatar } = useMutation(updateAvatarRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });

  const onSubmitUpdateUser = useCallback(
    async (formData) => {
      try {
        await updateUser({ userId: user.id, formData });
      } catch (e) {
        console.log(e);
      }
    },
    [updateUser, user.id]
  );

  const onSubmitUpdateAvatar = useCallback(
    async (file) => {
      try {
        await updateAvatar({ userId: user.id, file });
      } catch (e) {
        console.log(e);
      }
    },
    [updateAvatar, user.id]
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
