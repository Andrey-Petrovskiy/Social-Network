import React, { useCallback } from 'react';
import { useQuery, useMutation } from 'react-query';

import Profile from '../../components/Profile';
import { getUserById, updateUserRequest, updateAvatarRequest } from './hooks/crud';

function ProfileContainer({ handleUsername }) {
  const id = 28;

  const { data } = useQuery(['users', id], () => getUserById(id), {
    enabled: Boolean(id),
  });

  const user = data?.data.data.user || { name: '', email: '', phone: '', university: '' };

  const { mutate: updateUser } = useMutation(updateUserRequest);
  const { mutate: updateAvatar } = useMutation(updateAvatarRequest);

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
