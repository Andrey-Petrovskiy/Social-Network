import useApi from './useApi';

export default function useUserCrud() {
  const { callApi } = useApi();

  const getUserByIdRequest = (userId) => {
    return callApi(`/users/${userId}`);
  };

  const updateUserRequest = ({ userId, formData }) => {
    return callApi(`/users/${userId}`, 'put', formData);
  };

  const updateAvatarRequest = ({ userId, file }) => {
    return callApi(`/users/${userId}/avatar`, 'put', file);
  };

  const getUserAvatarRequest = (userId) => {
    return callApi(`/users/${userId}/avatar`);
  };

  return {
    getUserByIdRequest,
    updateUserRequest,
    updateAvatarRequest,
    getUserAvatarRequest,
  };
}
